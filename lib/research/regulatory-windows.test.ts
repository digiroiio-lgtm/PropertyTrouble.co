import { describe, expect, it } from "vitest";
import { regulatoryWindowResearch } from "./regulatory-windows";

describe("regulatory window research inventory", () => {
  it("preserves all 25 distinct, ranked candidate windows", () => {
    expect(regulatoryWindowResearch).toHaveLength(25);
    expect(regulatoryWindowResearch.map((item) => item.rank)).toEqual(
      Array.from({ length: 25 }, (_, index) => index + 1),
    );
    expect(new Set(regulatoryWindowResearch.map((item) => item.slug)).size).toBe(25);
  });

  it("keeps the user's scores separate from verified opportunity scores", () => {
    expect(regulatoryWindowResearch.filter((item) => item.tier === "A")).toHaveLength(15);
    expect(regulatoryWindowResearch.filter((item) => item.tier === "B")).toHaveLength(10);
    for (const item of regulatoryWindowResearch) {
      expect(item.researchScore).toBeGreaterThanOrEqual(0);
      expect(item.researchScore).toBeLessThanOrEqual(100);
      expect(item.evidenceStatus).toBe("UNVERIFIED");
      expect(item.publicationStatus).toBe("RESEARCH_ONLY");
      expect(item.lastPrimarySourceVerifiedAt).toBeNull();
      expect(item.provenance).toBe("USER_BRIEF_2026_09_26");
      expect(item.tier).toBe(item.rank <= 15 ? "A" : "B");
    }
  });

  it("links existing records without creating duplicate regulations", () => {
    expect(regulatoryWindowResearch.filter((item) => item.existingRegulationSlug)).toHaveLength(4);
    expect(new Set(regulatoryWindowResearch.filter((item) => item.existingRegulationSlug)
      .map((item) => item.existingRegulationSlug)).size).toBe(4);
  });
});
