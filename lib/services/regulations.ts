import type { Prisma, RegulationStatus } from "@prisma/client";
import { getDb } from "@/lib/db";
import { resolveAncestorIds } from "@/lib/graph/location-path";
import { verificationEventInputSchema, type VerificationEventInput } from "@/lib/validation/schemas";

export interface RegulationFilter {
  status?: RegulationStatus;
  locationId?: string;
  propertyTypeId?: string;
}

export async function listRegulations(filter: RegulationFilter = {}) {
  const where: Prisma.RegulationWhereInput = { active: true };
  if (filter.status) where.status = filter.status;
  if (filter.locationId) where.locations = { some: { locationId: filter.locationId } };
  if (filter.propertyTypeId) where.propertyTypes = { some: { propertyTypeId: filter.propertyTypeId } };

  return getDb().regulation.findMany({
    where,
    orderBy: [{ nextDeadline: { sort: "asc", nulls: "last" } }, { name: "asc" }],
    include: {
      locations: { include: { location: true } },
      _count: { select: { deadlines: true, sources: true, propertyTypes: true } },
    },
  });
}

export async function getRegulationGraph(slug: string) {
  return getDb().regulation.findUnique({
    where: { slug },
    include: {
      locations: { include: { location: true } },
      propertyTypes: { include: { propertyType: true } },
      deadlines: {
        include: { location: true },
        orderBy: { deadlineDate: { sort: "asc", nulls: "last" } },
      },
      sources: { include: { source: true }, orderBy: { isPrimaryForRegulation: "desc" } },
      verificationEvents: { orderBy: { verifiedAt: "desc" } },
      costModels: { include: { problem: true, location: true, propertyType: true } },
      contentPages: true,
      opportunityScores: { orderBy: { totalScore: "desc" } },
    },
  });
}

export type RegulationGraph = NonNullable<Awaited<ReturnType<typeof getRegulationGraph>>>;

/**
 * Regulations that apply at a location, including those attached to any
 * ancestor (a Massachusetts rule applies on Cape Cod). When propertyTypeId is
 * given, regulations with no property-type scope are kept as "unscoped".
 */
export async function getApplicableRegulations({
  locationId,
  propertyTypeId,
}: {
  locationId: string;
  propertyTypeId?: string;
}) {
  const db = getDb();
  const locations = await db.location.findMany({ select: { id: true, parentId: true } });
  const locationIds = resolveAncestorIds(locations, locationId);
  if (locationIds.length === 0) return [];

  return db.regulation.findMany({
    where: {
      active: true,
      locations: { some: { locationId: { in: locationIds } } },
      ...(propertyTypeId
        ? {
            OR: [
              { propertyTypes: { some: { propertyTypeId } } },
              { propertyTypes: { none: {} } },
            ],
          }
        : {}),
    },
    include: {
      locations: { where: { locationId: { in: locationIds } }, include: { location: true } },
      deadlines: { orderBy: { deadlineDate: { sort: "asc", nulls: "last" } } },
    },
    orderBy: { name: "asc" },
  });
}

/** Records a verification event and mirrors its outcome onto the regulation. */
export async function recordVerificationEvent(input: VerificationEventInput) {
  const data = verificationEventInputSchema.parse(input);
  const db = getDb();
  return db.$transaction(async (tx) => {
    const event = await tx.verificationEvent.create({ data });
    await tx.regulation.update({
      where: { id: data.regulationId },
      data: {
        sourceConfidence: data.status,
        ...(data.status === "VERIFIED" ? { lastVerifiedAt: data.verifiedAt } : {}),
      },
    });
    return event;
  });
}
