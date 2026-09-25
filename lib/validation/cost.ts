import type { CostConfidence } from "@prisma/client";

export interface CostRangeInput {
  lowEstimate?: number | null;
  midEstimate?: number | null;
  highEstimate?: number | null;
  confidence: CostConfidence;
  methodology: string;
}

export class CostRangeError extends Error {
  constructor(public readonly issues: string[]) {
    super(`Invalid cost model: ${issues.join("; ")}`);
    this.name = "CostRangeError";
  }
}

/**
 * Cost ranges are optional — we never fabricate numbers. When numbers exist
 * they must be non-negative and ordered low <= mid <= high.
 */
export function validateCostRange(input: CostRangeInput): void {
  const issues: string[] = [];
  const { lowEstimate: low, midEstimate: mid, highEstimate: high, confidence } = input;
  const values = { lowEstimate: low, midEstimate: mid, highEstimate: high };

  for (const [field, value] of Object.entries(values)) {
    if (value == null) continue;
    if (typeof value !== "number" || !Number.isFinite(value)) issues.push(`${field} must be a finite number`);
    else if (value < 0) issues.push(`${field} must not be negative`);
  }

  if (low != null && mid != null && low > mid) issues.push("lowEstimate must be <= midEstimate");
  if (mid != null && high != null && mid > high) issues.push("midEstimate must be <= highEstimate");
  if (low != null && high != null && low > high) issues.push("lowEstimate must be <= highEstimate");

  if (!input.methodology?.trim()) issues.push("methodology is required");

  if (confidence === "INSUFFICIENT_DATA" && (low != null || mid != null || high != null)) {
    issues.push("INSUFFICIENT_DATA cost models must not carry estimates");
  }
  if (confidence === "VERIFIED_MARKET_RANGE" && (low == null || high == null)) {
    issues.push("VERIFIED_MARKET_RANGE requires lowEstimate and highEstimate");
  }

  if (issues.length > 0) throw new CostRangeError(issues);
}
