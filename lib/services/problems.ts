import { getDb } from "@/lib/db";

export async function listCategories() {
  return getDb().problemCategory.findMany({
    where: { active: true },
    orderBy: [{ commercialIntentLevel: "desc" }, { name: "asc" }],
    include: { _count: { select: { problems: true } } },
  });
}

export async function getProblemGraph(slug: string) {
  const problem = await getDb().problem.findUnique({
    where: { slug },
    include: {
      category: true,
      problemPropertyTypes: { include: { propertyType: true }, orderBy: { relevance: "desc" } },
      problemProfessionals: { include: { professionalType: true }, orderBy: { priority: "asc" } },
      costModels: { include: { regulation: true, location: true, propertyType: true } },
      contentPages: { include: { regulation: true } },
      opportunityScores: { include: { regulation: true }, orderBy: { totalScore: "desc" } },
    },
  });
  if (!problem) return null;

  // Regulations are reached through the entities that link both sides.
  const regulations = new Map<string, { id: string; name: string; slug: string }>();
  for (const link of [...problem.costModels, ...problem.contentPages, ...problem.opportunityScores]) {
    if (link.regulation) regulations.set(link.regulation.id, link.regulation);
  }

  return { ...problem, relatedRegulations: [...regulations.values()] };
}

export type ProblemGraph = NonNullable<Awaited<ReturnType<typeof getProblemGraph>>>;
