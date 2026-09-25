/**
 * Idempotent seed for the property graph. Every step upserts by a natural key
 * (slug, url, composite unique), so running it twice leaves counts unchanged.
 *
 *   npm run db:seed
 */
import { PrismaClient, type Prisma } from "@prisma/client";
import { calculateOpportunityScore } from "../../lib/scoring/opportunity-score";
import { validateCostRange } from "../../lib/validation/cost";
import { contentPages } from "./data/content-pages";
import { COST_METHODOLOGY, costModels } from "./data/cost-models";
import { deadlines } from "./data/deadlines";
import { locations } from "./data/locations";
import { OPPORTUNITY_NOTE, opportunities } from "./data/opportunities";
import { problemCategories } from "./data/problem-categories";
import { problemProfessionals, problemPropertyTypes } from "./data/problem-links";
import { problems } from "./data/problems";
import { professionalTypes } from "./data/professional-types";
import { propertyTypes } from "./data/property-types";
import { regulations, VERIFICATION_NOTE } from "./data/regulations";

type Tx = Prisma.TransactionClient;
type IdMap = Map<string, string>;

const SEED_ACCESSED_AT = new Date("2026-09-25T00:00:00Z");

function need(map: IdMap, key: string, kind: string): string {
  const id = map.get(key);
  if (!id) throw new Error(`Seed references unknown ${kind} "${key}"`);
  return id;
}

async function seedLocations(tx: Tx): Promise<IdMap> {
  const ids: IdMap = new Map();
  // Data is ordered parents-first.
  for (const { key, parentKey, ...location } of locations) {
    const parentId = parentKey ? need(ids, parentKey, "location") : null;
    const data = { ...location, stateCode: location.stateCode ?? null, fips: location.fips ?? null, parentId };
    // Compound upsert cannot match NULL parentId, so look up explicitly.
    const existing = await tx.location.findFirst({
      where: { parentId, slug: location.slug, type: location.type },
      select: { id: true },
    });
    const row = existing
      ? await tx.location.update({ where: { id: existing.id }, data })
      : await tx.location.create({ data });
    ids.set(key, row.id);
  }
  return ids;
}

async function seedBySlug<T extends { slug: string }>(
  items: T[],
  upsert: (item: T) => Promise<{ id: string }>,
): Promise<IdMap> {
  const ids: IdMap = new Map();
  for (const item of items) ids.set(item.slug, (await upsert(item)).id);
  return ids;
}

async function main() {
  const db = new PrismaClient();
  const options = { timeout: 60_000 };

  try {
    const locationIds = await db.$transaction(seedLocations, options);

    const propertyTypeIds = await db.$transaction(
      (tx) =>
        seedBySlug(propertyTypes, (item) =>
          tx.propertyType.upsert({ where: { slug: item.slug }, create: item, update: item }),
        ),
      options,
    );

    const categoryIds = await db.$transaction(
      (tx) =>
        seedBySlug(problemCategories, (item) =>
          tx.problemCategory.upsert({ where: { slug: item.slug }, create: item, update: item }),
        ),
      options,
    );

    const problemIds = await db.$transaction(
      (tx) =>
        seedBySlug(problems, ({ categorySlug, ...item }) => {
          const data = { ...item, categoryId: need(categoryIds, categorySlug, "category") };
          return tx.problem.upsert({ where: { slug: item.slug }, create: data, update: data });
        }),
      options,
    );

    const professionalIds = await db.$transaction(
      (tx) =>
        seedBySlug(professionalTypes, (item) =>
          tx.professionalType.upsert({ where: { slug: item.slug }, create: item, update: item }),
        ),
      options,
    );

    await db.$transaction(async (tx) => {
      for (const link of problemProfessionals) {
        const key = {
          problemId: need(problemIds, link.problemSlug, "problem"),
          professionalTypeId: need(professionalIds, link.professionalSlug, "professional type"),
          relationshipType: link.relationshipType,
        };
        await tx.problemProfessional.upsert({
          where: { problemId_professionalTypeId_relationshipType: key },
          create: { ...key, priority: link.priority },
          update: { priority: link.priority },
        });
      }
      for (const link of problemPropertyTypes) {
        const key = {
          problemId: need(problemIds, link.problemSlug, "problem"),
          propertyTypeId: need(propertyTypeIds, link.propertyTypeSlug, "property type"),
        };
        await tx.problemPropertyType.upsert({
          where: { problemId_propertyTypeId: key },
          create: { ...key, relevance: link.relevance },
          update: { relevance: link.relevance },
        });
      }
    }, options);

    const regulationIds = await db.$transaction(async (tx) => {
      const ids: IdMap = new Map();
      for (const { locations: regLocations, propertyTypes: regTypes, sources, ...item } of regulations) {
        const data = { ...item, sourceConfidence: "UNVERIFIED" as const, lastVerifiedAt: null };
        const regulation = await tx.regulation.upsert({ where: { slug: item.slug }, create: data, update: data });
        ids.set(item.slug, regulation.id);

        for (const { key, scopeNotes } of regLocations) {
          const link = { regulationId: regulation.id, locationId: need(locationIds, key, "location") };
          await tx.regulationLocation.upsert({
            where: { regulationId_locationId: link },
            create: { ...link, scopeNotes },
            update: { scopeNotes },
          });
        }
        for (const { slug, applicabilityNotes } of regTypes) {
          const link = { regulationId: regulation.id, propertyTypeId: need(propertyTypeIds, slug, "property type") };
          await tx.regulationPropertyType.upsert({
            where: { regulationId_propertyTypeId: link },
            create: { ...link, applicabilityNotes },
            update: { applicabilityNotes },
          });
        }
        for (const { claimScope, ...source } of sources) {
          const sourceData = { ...source, accessedAt: SEED_ACCESSED_AT, lastVerifiedAt: null, notes: VERIFICATION_NOTE };
          const row = await tx.source.upsert({ where: { url: source.url }, create: sourceData, update: sourceData });
          const link = { regulationId: regulation.id, sourceId: row.id };
          await tx.regulationSource.upsert({
            where: { regulationId_sourceId: link },
            create: { ...link, isPrimaryForRegulation: source.isPrimary, claimScope },
            update: { isPrimaryForRegulation: source.isPrimary, claimScope },
          });
        }
      }
      return ids;
    }, options);

    await db.$transaction(async (tx) => {
      for (const { regulationSlug, locationKey, deadlineDate, ...item } of deadlines) {
        const regulationId = need(regulationIds, regulationSlug, "regulation");
        const data = {
          ...item,
          regulationId,
          locationId: locationKey ? need(locationIds, locationKey, "location") : null,
          deadlineDate: deadlineDate ? new Date(`${deadlineDate}T00:00:00Z`) : null,
        };
        await tx.deadline.upsert({
          where: { regulationId_name: { regulationId, name: item.name } },
          create: data,
          update: data,
        });
      }
      // Denormalized nextDeadline = earliest upcoming dated deadline.
      for (const regulationId of regulationIds.values()) {
        const next = await tx.deadline.findFirst({
          where: { regulationId, deadlineDate: { gte: new Date() } },
          orderBy: { deadlineDate: "asc" },
        });
        await tx.regulation.update({ where: { id: regulationId }, data: { nextDeadline: next?.deadlineDate ?? null } });
      }
    }, options);

    await db.$transaction(async (tx) => {
      // Cost models have no natural unique key; the seed owns rows it tags in sourceNotes.
      await tx.costModel.deleteMany({ where: { sourceNotes: { startsWith: "seed:" } } });
      for (const model of costModels) {
        const data = {
          problemId: need(problemIds, model.problemSlug, "problem"),
          regulationId: model.regulationSlug ? need(regulationIds, model.regulationSlug, "regulation") : null,
          locationId: model.locationKey ? need(locationIds, model.locationKey, "location") : null,
          propertyTypeId: model.propertyTypeSlug ? need(propertyTypeIds, model.propertyTypeSlug, "property type") : null,
          unit: model.unit,
          confidence: "INSUFFICIENT_DATA" as const,
          methodology: COST_METHODOLOGY,
          sourceNotes: `seed:${model.key}`,
          lastUpdatedAt: SEED_ACCESSED_AT,
        };
        validateCostRange(data);
        await tx.costModel.create({ data });
      }
    }, options);

    await db.$transaction(async (tx) => {
      for (const { locationKey, problemSlug, regulationSlug, propertyTypeSlug, ...item } of contentPages) {
        const data = {
          ...item,
          status: "DRAFT" as const,
          indexable: false,
          problemId: problemSlug ? need(problemIds, problemSlug, "problem") : null,
          regulationId: regulationSlug ? need(regulationIds, regulationSlug, "regulation") : null,
          locationId: locationKey ? need(locationIds, locationKey, "location") : null,
          propertyTypeId: propertyTypeSlug ? need(propertyTypeIds, propertyTypeSlug, "property type") : null,
        };
        await tx.contentPage.upsert({ where: { fullPath: item.fullPath }, create: data, update: data });
      }
    }, options);

    await db.$transaction(async (tx) => {
      for (const { slug, name, locationKey, problemSlug, regulationSlug, propertyTypeSlug, ...scores } of opportunities) {
        const { totalScore, breakdown } = calculateOpportunityScore(scores);
        const data = {
          slug,
          name,
          ...breakdown,
          totalScore,
          status: "WATCH" as const,
          notes: OPPORTUNITY_NOTE,
          locationId: locationKey ? need(locationIds, locationKey, "location") : null,
          problemId: problemSlug ? need(problemIds, problemSlug, "problem") : null,
          regulationId: regulationSlug ? need(regulationIds, regulationSlug, "regulation") : null,
          propertyTypeId: propertyTypeSlug ? need(propertyTypeIds, propertyTypeSlug, "property type") : null,
        };
        await tx.opportunityScore.upsert({ where: { slug }, create: data, update: data });
      }
    }, options);

    const counts = {
      locations: await db.location.count(),
      propertyTypes: await db.propertyType.count(),
      problemCategories: await db.problemCategory.count(),
      problems: await db.problem.count(),
      professionalTypes: await db.professionalType.count(),
      regulations: await db.regulation.count(),
      sources: await db.source.count(),
      deadlines: await db.deadline.count(),
      costModels: await db.costModel.count(),
      contentPages: await db.contentPage.count(),
      opportunityScores: await db.opportunityScore.count(),
    };
    console.log("Seed complete:", counts);
  } finally {
    await db.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
