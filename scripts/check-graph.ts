/**
 * Asserts the seeded graph has the expected shape. Used in CI after seeding.
 *   npm run db:check
 */
import { PrismaClient } from "@prisma/client";
import { calculateOpportunityScore } from "../lib/scoring/opportunity-score";


async function main() {
  const db = new PrismaClient();
  const failures: string[] = [];
  const check = (ok: boolean, message: string) => {
    if (!ok) failures.push(message);
  };

  try {
    const expected: [string, number, () => Promise<number>][] = [
      ["propertyTypes", 12, () => db.propertyType.count()],
      ["problemCategories", 30, () => db.problemCategory.count()],
      ["professionalTypes", 23, () => db.professionalType.count()],
      ["problems", 11, () => db.problem.count()],
      ["regulations", 4, () => db.regulation.count()],
    ];
    for (const [model, count, countRows] of expected) {
      const actual = await countRows();
      check(actual === count, `${model}: expected ${count}, got ${actual}`);
    }

    const roots = await db.location.findMany({ where: { parentId: null } });
    check(roots.length === 1 && roots[0].slug === "united-states", "expected a single United States root");

    const capeCod = await db.location.findFirst({ where: { slug: "cape-cod" }, include: { parent: true } });
    check(capeCod?.type === "MARKET" && capeCod.parent?.slug === "massachusetts", "Cape Cod must be a MARKET under Massachusetts");

    const wa = await db.regulation.findUnique({
      where: { slug: "washington-clean-buildings" },
      include: { deadlines: { orderBy: { deadlineDate: "asc" } } },
    });
    const years = wa?.deadlines.map((d) => d.deadlineDate?.getUTCFullYear());
    check(JSON.stringify(years) === "[2026,2027,2028]", `Washington Clean Buildings deadlines: got ${JSON.stringify(years)}`);

    const fabricated = await db.costModel.count({
      where: { confidence: "INSUFFICIENT_DATA", OR: [{ lowEstimate: { not: null } }, { highEstimate: { not: null } }] },
    });
    check(fabricated === 0, "INSUFFICIENT_DATA cost models must not carry numbers");

    for (const score of await db.opportunityScore.findMany()) {
      const { totalScore } = calculateOpportunityScore(score);
      check(score.totalScore === totalScore, `${score.slug}: stored total ${score.totalScore} != computed ${totalScore}`);
    }
  } finally {
    await db.$disconnect();
  }

  if (failures.length > 0) {
    console.error("Graph check failed:\n- " + failures.join("\n- "));
    process.exit(1);
  }
  console.log("Graph check passed.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
