import { describe, expect, it } from "vitest";
import {
  OPPORTUNITY_SCORE_LIMITS,
  OPPORTUNITY_SCORE_MAX,
  OpportunityScoreError,
  calculateOpportunityScore,
  type OpportunityScoreInput,
} from "./opportunity-score";

const valid: OpportunityScoreInput = {
  regulatoryForceScore: 18,
  spendScore: 18,
  urgencyScore: 12,
  searchIntentScore: 13,
  monetizationScore: 13,
  seoDefensibilityScore: 7,
  goldenWindowScore: 3,
};

describe("calculateOpportunityScore", () => {
  it("sums the dimensions", () => {
    expect(calculateOpportunityScore(valid).totalScore).toBe(84);
  });

  it("caps at 100 when every dimension is at its maximum", () => {
    expect(OPPORTUNITY_SCORE_MAX).toBe(100);
    expect(calculateOpportunityScore({ ...OPPORTUNITY_SCORE_LIMITS }).totalScore).toBe(100);
  });

  it("accepts all zeros", () => {
    const zeros = Object.fromEntries(Object.keys(valid).map((k) => [k, 0])) as OpportunityScoreInput;
    expect(calculateOpportunityScore(zeros).totalScore).toBe(0);
  });

  it.each([
    ["regulatoryForceScore", 21],
    ["spendScore", -1],
    ["urgencyScore", 16],
    ["searchIntentScore", 16],
    ["monetizationScore", 16],
    ["seoDefensibilityScore", 11],
    ["goldenWindowScore", 6],
  ])("rejects %s = %d", (field, value) => {
    expect(() => calculateOpportunityScore({ ...valid, [field]: value })).toThrow(OpportunityScoreError);
  });

  it("rejects non-integers, NaN and missing values, reporting every issue", () => {
    const input = { ...valid, spendScore: 1.5, urgencyScore: Number.NaN } as Partial<OpportunityScoreInput>;
    delete input.goldenWindowScore;
    try {
      calculateOpportunityScore(input as OpportunityScoreInput);
      expect.unreachable();
    } catch (error) {
      expect(error).toBeInstanceOf(OpportunityScoreError);
      const fields = (error as OpportunityScoreError).issues.map((i) => i.field);
      expect(fields).toEqual(["spendScore", "urgencyScore", "goldenWindowScore"]);
    }
  });

  it("ignores a caller-supplied totalScore", () => {
    const input = { ...valid, totalScore: 100 } as OpportunityScoreInput;
    expect(calculateOpportunityScore(input).totalScore).toBe(84);
  });
});
