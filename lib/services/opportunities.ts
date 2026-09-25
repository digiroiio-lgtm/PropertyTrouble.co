import type { OpportunityStatus } from "@prisma/client";
import { getDb } from "@/lib/db";
import { calculateOpportunityScore } from "@/lib/scoring/opportunity-score";
import {
  opportunityScoreInputSchema,
  type OpportunityScoreInputData,
} from "@/lib/validation/schemas";

/** Upserts by slug. totalScore is always recomputed; callers cannot set it. */
export async function upsertOpportunityScore(input: OpportunityScoreInputData) {
  const data = opportunityScoreInputSchema.parse(input);
  const { totalScore } = calculateOpportunityScore(data);
  const record = { ...data, totalScore };
  return getDb().opportunityScore.upsert({
    where: { slug: data.slug },
    create: record,
    update: record,
  });
}

export async function listOpportunities(filter: { status?: OpportunityStatus; minScore?: number } = {}) {
  return getDb().opportunityScore.findMany({
    where: {
      ...(filter.status ? { status: filter.status } : {}),
      ...(filter.minScore != null ? { totalScore: { gte: filter.minScore } } : {}),
    },
    orderBy: [{ totalScore: "desc" }, { name: "asc" }],
    include: { location: true, problem: true, regulation: true, propertyType: true },
  });
}
