import type { CostUnit } from "@prisma/client";

/**
 * Cost placeholders. No verified market data exists yet, so every model is
 * INSUFFICIENT_DATA with no numbers. Never fabricate price ranges.
 */
export const costModels: {
  key: string;
  problemSlug: string;
  regulationSlug?: string;
  locationKey?: string;
  propertyTypeSlug?: string;
  unit: CostUnit;
}[] = [
  { key: "failed-septic-ma", problemSlug: "failed-septic-system", regulationSlug: "massachusetts-title-5-septic", locationKey: "ma", propertyTypeSlug: "single-family-home", unit: "PER_SYSTEM" },
  { key: "nitrogen-septic-cape-cod", problemSlug: "nitrogen-reducing-septic-upgrade", regulationSlug: "massachusetts-title-5-septic", locationKey: "cape-cod", propertyTypeSlug: "single-family-home", unit: "PER_SYSTEM" },
  { key: "condo-inspection-fl", problemSlug: "condo-structural-inspection", regulationSlug: "florida-condo-milestone-inspections", locationKey: "fl", propertyTypeSlug: "hoa", unit: "PROJECT" },
  { key: "condo-repair-fl", problemSlug: "condo-structural-repair", regulationSlug: "florida-condo-milestone-inspections", locationKey: "fl", propertyTypeSlug: "hoa", unit: "PROJECT" },
  { key: "energy-compliance-wa", problemSlug: "building-energy-compliance", regulationSlug: "washington-clean-buildings", locationKey: "wa", propertyTypeSlug: "office", unit: "PER_SQFT" },
  { key: "energy-compliance-nyc", problemSlug: "building-energy-compliance", regulationSlug: "nyc-local-law-97", locationKey: "nyc", propertyTypeSlug: "multifamily", unit: "PER_SQFT" },
  { key: "slab-foundation", problemSlug: "slab-foundation-movement", propertyTypeSlug: "single-family-home", unit: "PROJECT" },
  { key: "cast-iron-pipe", problemSlug: "cast-iron-pipe-failure", propertyTypeSlug: "single-family-home", unit: "PER_LINEAR_FOOT" },
];

export const COST_METHODOLOGY =
  "Placeholder. No verified market data has been collected yet; estimates stay empty until sourced.";
