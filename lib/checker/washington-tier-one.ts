/**
 * Source-backed, self-reported SCREENING rule, not a parcel or compliance finding.
 * Washington Department of Commerce, Tier 1 compliance:
 * https://www.commerce.wa.gov/cbps/tier-1-compliance/
 * Reviewed 2026-09-26. Recheck agency guidance before changing thresholds.
 */
export const WA_TIER_ONE_SOURCE = "https://www.commerce.wa.gov/cbps/tier-1-compliance/";
export const WA_TIER_ONE_REVIEWED_AT = "2026-09-26";

export type CheckerInput = {
  state: string;
  qualifyingArea: string;
  ownership: string;
};

export type ScreeningResult =
  | { kind: "invalid"; message: string }
  | { kind: "outside-pilot"; message: string }
  | { kind: "undetermined"; message: string }
  | { kind: "potentially-covered"; message: string; deadline: string };

export function screenWashingtonTierOne(input: CheckerInput): ScreeningResult {
  if (input.state !== "WA" && input.state !== "OTHER") {
    return { kind: "invalid", message: "Select the building location." };
  }
  if (input.state === "OTHER") {
    return {
      kind: "outside-pilot",
      message: "This pilot only screens Washington Clean Buildings Tier 1. It does not check other jurisdictions or rules.",
    };
  }
  if (!["private", "federal", "tribal", "unsure"].includes(input.ownership)) {
    return { kind: "invalid", message: "Select the building ownership category." };
  }
  if (!/^[0-9]{1,9}$/.test(input.qualifyingArea)) {
    return { kind: "invalid", message: "Enter a whole-number qualifying floor area in square feet." };
  }

  const area = Number(input.qualifyingArea);
  if (!Number.isSafeInteger(area) || area === 0) {
    return { kind: "invalid", message: "Enter a floor area greater than zero." };
  }
  if (input.ownership === "federal" || input.ownership === "tribal") {
    return {
      kind: "outside-pilot",
      message: "The Commerce Tier 1 page says federal buildings and buildings owned by federally recognized tribes are not required to comply with this standard. Confirm ownership and any other applicable rules with Commerce.",
    };
  }
  if (area <= 50_000) {
    return {
      kind: "outside-pilot",
      message: "Based on the area entered, the building does not meet this Tier 1 size threshold. Tier 2 or other requirements may still apply.",
    };
  }
  if (input.ownership === "unsure") {
    return {
      kind: "undetermined",
      message: "The area meets the Tier 1 screening threshold, but ownership must be confirmed before a useful result can be shown.",
    };
  }

  const deadline = area > 220_000
    ? "June 1, 2026"
    : area > 90_000
      ? "June 1, 2027"
      : "June 1, 2028";
  return {
    kind: "potentially-covered",
    deadline,
    message: "Your answers match the basic location, ownership and floor-area criteria for Washington Clean Buildings Tier 1. This is not a determination that this specific building is covered or noncompliant.",
  };
}
