import { getDb } from "@/lib/db";

export async function getGraphStats() {
  const db = getDb();
  const [
    locations,
    propertyTypes,
    problemCategories,
    problems,
    regulations,
    deadlines,
    sources,
    costModels,
    professionalTypes,
    contentPages,
    verificationEvents,
    opportunityScores,
  ] = await db.$transaction([
    db.location.count(),
    db.propertyType.count(),
    db.problemCategory.count(),
    db.problem.count(),
    db.regulation.count(),
    db.deadline.count(),
    db.source.count(),
    db.costModel.count(),
    db.professionalType.count(),
    db.contentPage.count(),
    db.verificationEvent.count(),
    db.opportunityScore.count(),
  ]);
  return {
    locations,
    propertyTypes,
    problemCategories,
    problems,
    regulations,
    deadlines,
    sources,
    costModels,
    professionalTypes,
    contentPages,
    verificationEvents,
    opportunityScores,
  };
}

export type GraphStats = Awaited<ReturnType<typeof getGraphStats>>;
