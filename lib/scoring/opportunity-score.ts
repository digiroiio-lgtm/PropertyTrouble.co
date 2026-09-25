/**
 * Opportunity scoring. The total is always derived here — never trust a
 * caller-supplied totalScore. The same limits are enforced in Postgres by
 * CHECK constraints (see the property_graph migration).
 */

export const OPPORTUNITY_SCORE_LIMITS = {
  regulatoryForceScore: 20,
  spendScore: 20,
  urgencyScore: 15,
  searchIntentScore: 15,
  monetizationScore: 15,
  seoDefensibilityScore: 10,
  goldenWindowScore: 5,
} as const;

export type OpportunityScoreDimension = keyof typeof OPPORTUNITY_SCORE_LIMITS;

export type OpportunityScoreInput = Record<OpportunityScoreDimension, number>;

export const OPPORTUNITY_SCORE_MAX = Object.values(OPPORTUNITY_SCORE_LIMITS).reduce(
  (sum, max) => sum + max,
  0,
);

export const OPPORTUNITY_SCORE_DIMENSIONS = Object.keys(
  OPPORTUNITY_SCORE_LIMITS,
) as OpportunityScoreDimension[];

export class OpportunityScoreError extends Error {
  constructor(public readonly issues: { field: string; message: string }[]) {
    super(`Invalid opportunity score: ${issues.map((i) => `${i.field} ${i.message}`).join("; ")}`);
    this.name = "OpportunityScoreError";
  }
}

export interface OpportunityScoreResult {
  totalScore: number;
  breakdown: OpportunityScoreInput;
}

export function calculateOpportunityScore(input: OpportunityScoreInput): OpportunityScoreResult {
  const issues: { field: string; message: string }[] = [];
  const breakdown = {} as OpportunityScoreInput;
  const source = (input ?? {}) as Record<string, unknown>;

  for (const field of OPPORTUNITY_SCORE_DIMENSIONS) {
    const max = OPPORTUNITY_SCORE_LIMITS[field];
    const value = source[field];

    if (typeof value !== "number" || Number.isNaN(value)) {
      issues.push({ field, message: "is required and must be a number" });
      continue;
    }
    if (!Number.isInteger(value)) {
      issues.push({ field, message: "must be an integer" });
      continue;
    }
    if (value < 0 || value > max) {
      issues.push({ field, message: `must be between 0 and ${max}` });
      continue;
    }
    breakdown[field] = value;
  }

  if (issues.length > 0) throw new OpportunityScoreError(issues);

  const totalScore = OPPORTUNITY_SCORE_DIMENSIONS.reduce((sum, field) => sum + breakdown[field], 0);
  return { totalScore, breakdown };
}
