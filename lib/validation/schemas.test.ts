import { describe, expect, it } from "vitest";
import {
  contentPageInputSchema,
  locationInputSchema,
  opportunityScoreInputSchema,
  slugSchema,
} from "./schemas";

describe("slugSchema", () => {
  it.each(["cape-cod", "single-family-home", "ll97"])("accepts %s", (slug) => {
    expect(slugSchema.safeParse(slug).success).toBe(true);
  });
  it.each(["Cape-Cod", "cape_cod", "-cape", "cape--cod", ""])("rejects %s", (slug) => {
    expect(slugSchema.safeParse(slug).success).toBe(false);
  });
});

describe("locationInputSchema", () => {
  it("normalizes stateCode and rejects unknown types", () => {
    const parsed = locationInputSchema.parse({ name: "Cape Cod", slug: "cape-cod", type: "MARKET", stateCode: "ma" });
    expect(parsed.stateCode).toBe("MA");
    expect(locationInputSchema.safeParse({ name: "X", slug: "x", type: "PLANET" }).success).toBe(false);
  });
});

describe("opportunityScoreInputSchema", () => {
  const scores = {
    name: "Test",
    slug: "test",
    regulatoryForceScore: 1,
    spendScore: 1,
    urgencyScore: 1,
    searchIntentScore: 1,
    monetizationScore: 1,
    seoDefensibilityScore: 1,
    goldenWindowScore: 1,
  };
  it("accepts valid scores", () => {
    expect(opportunityScoreInputSchema.safeParse(scores).success).toBe(true);
  });
  it("rejects a caller-supplied totalScore", () => {
    expect(opportunityScoreInputSchema.safeParse({ ...scores, totalScore: 7 }).success).toBe(false);
  });
  it("rejects out-of-range dimensions", () => {
    expect(opportunityScoreInputSchema.safeParse({ ...scores, goldenWindowScore: 6 }).success).toBe(false);
  });
});

describe("contentPageInputSchema", () => {
  const page = { title: "T", slug: "t", pageType: "GUIDE", primaryIntent: "INFORMATIONAL" };
  it("requires an absolute lowercase path", () => {
    expect(contentPageInputSchema.safeParse({ ...page, fullPath: "/florida/condo-inspections" }).success).toBe(true);
    expect(contentPageInputSchema.safeParse({ ...page, fullPath: "florida/condo" }).success).toBe(false);
    expect(contentPageInputSchema.safeParse({ ...page, fullPath: "/Florida" }).success).toBe(false);
  });
});
