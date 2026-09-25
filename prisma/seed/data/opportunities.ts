import type { OpportunityScoreInput } from "../../../lib/scoring/opportunity-score";

/** Initial hypotheses only — every score starts in WATCH and needs validation. */
export const opportunities: ({
  slug: string;
  name: string;
  locationKey?: string;
  problemSlug?: string;
  regulationSlug?: string;
  propertyTypeSlug?: string;
} & OpportunityScoreInput)[] = [
  {
    slug: "florida-condo-milestone",
    name: "Florida condo milestone inspections",
    locationKey: "fl",
    problemSlug: "condo-structural-inspection",
    regulationSlug: "florida-condo-milestone-inspections",
    propertyTypeSlug: "hoa",
    regulatoryForceScore: 18,
    spendScore: 18,
    urgencyScore: 12,
    searchIntentScore: 13,
    monetizationScore: 13,
    seoDefensibilityScore: 7,
    goldenWindowScore: 3,
  },
  {
    slug: "washington-clean-buildings",
    name: "Washington Clean Buildings compliance",
    locationKey: "wa",
    problemSlug: "building-energy-compliance",
    regulationSlug: "washington-clean-buildings",
    propertyTypeSlug: "office",
    regulatoryForceScore: 17,
    spendScore: 17,
    urgencyScore: 13,
    searchIntentScore: 11,
    monetizationScore: 12,
    seoDefensibilityScore: 8,
    goldenWindowScore: 4,
  },
  {
    slug: "nyc-local-law-97",
    name: "NYC Local Law 97 compliance",
    locationKey: "nyc",
    problemSlug: "building-energy-compliance",
    regulationSlug: "nyc-local-law-97",
    propertyTypeSlug: "multifamily",
    regulatoryForceScore: 18,
    spendScore: 19,
    urgencyScore: 11,
    searchIntentScore: 12,
    monetizationScore: 12,
    seoDefensibilityScore: 5,
    goldenWindowScore: 2,
  },
  {
    slug: "cape-cod-nitrogen-septic",
    name: "Cape Cod nitrogen-reducing septic upgrades",
    locationKey: "cape-cod",
    problemSlug: "nitrogen-reducing-septic-upgrade",
    regulationSlug: "massachusetts-title-5-septic",
    propertyTypeSlug: "single-family-home",
    regulatoryForceScore: 16,
    spendScore: 15,
    urgencyScore: 12,
    searchIntentScore: 11,
    monetizationScore: 12,
    seoDefensibilityScore: 8,
    goldenWindowScore: 4,
  },
];

export const OPPORTUNITY_NOTE = "Initial hypothesis from seed data — not yet validated with search or spend data.";
