import { describe, expect, it } from "vitest";
import { CostRangeError, validateCostRange } from "./cost";

const base = { methodology: "Contractor quotes, 2026", confidence: "MODELED_ESTIMATE" as const };

describe("validateCostRange", () => {
  it("accepts an ordered range", () => {
    expect(() => validateCostRange({ ...base, lowEstimate: 100, midEstimate: 200, highEstimate: 300 })).not.toThrow();
  });

  it("accepts partial ranges and equal values", () => {
    expect(() => validateCostRange({ ...base, lowEstimate: 100, highEstimate: 100 })).not.toThrow();
    expect(() => validateCostRange({ ...base, midEstimate: 50 })).not.toThrow();
  });

  it("accepts INSUFFICIENT_DATA with no numbers", () => {
    expect(() => validateCostRange({ ...base, confidence: "INSUFFICIENT_DATA" })).not.toThrow();
  });

  it.each([
    [{ lowEstimate: 300, midEstimate: 200 }],
    [{ midEstimate: 400, highEstimate: 300 }],
    [{ lowEstimate: 500, highEstimate: 300 }],
    [{ lowEstimate: -1 }],
    [{ lowEstimate: Number.POSITIVE_INFINITY }],
  ])("rejects %o", (values) => {
    expect(() => validateCostRange({ ...base, ...values })).toThrow(CostRangeError);
  });

  it("rejects INSUFFICIENT_DATA carrying numbers", () => {
    expect(() => validateCostRange({ ...base, confidence: "INSUFFICIENT_DATA", lowEstimate: 1 })).toThrow(CostRangeError);
  });

  it("requires low and high for VERIFIED_MARKET_RANGE", () => {
    expect(() => validateCostRange({ ...base, confidence: "VERIFIED_MARKET_RANGE", lowEstimate: 1 })).toThrow(
      CostRangeError,
    );
  });

  it("requires a methodology", () => {
    expect(() => validateCostRange({ ...base, methodology: "  " })).toThrow(CostRangeError);
  });
});
