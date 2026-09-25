import type { ContentPageType, SearchIntent } from "@prisma/client";

/** Draft, non-indexable page mappings. Bodies are written in a later phase. */
export const contentPages: {
  fullPath: string;
  slug: string;
  title: string;
  pageType: ContentPageType;
  primaryIntent: SearchIntent;
  primaryKeyword: string;
  secondaryKeywords: string[];
  problemSlug?: string;
  regulationSlug?: string;
  locationKey?: string;
  propertyTypeSlug?: string;
}[] = [
  {
    fullPath: "/florida/condo-milestone-inspections",
    slug: "condo-milestone-inspections",
    title: "Florida condo milestone inspections",
    pageType: "REGULATION",
    primaryIntent: "REGULATION",
    primaryKeyword: "florida condo milestone inspection",
    secondaryKeywords: ["sb 4-d inspection", "condo structural inspection florida"],
    problemSlug: "condo-structural-inspection",
    regulationSlug: "florida-condo-milestone-inspections",
    locationKey: "fl",
    propertyTypeSlug: "hoa",
  },
  {
    fullPath: "/new-york-city/local-law-97",
    slug: "local-law-97",
    title: "NYC Local Law 97",
    pageType: "REGULATION",
    primaryIntent: "REGULATION",
    primaryKeyword: "local law 97",
    secondaryKeywords: ["ll97 penalties", "nyc building emissions limits"],
    problemSlug: "building-energy-compliance",
    regulationSlug: "nyc-local-law-97",
    locationKey: "nyc",
  },
  {
    fullPath: "/washington/clean-buildings-deadlines",
    slug: "clean-buildings-deadlines",
    title: "Washington Clean Buildings deadlines",
    pageType: "DEADLINE",
    primaryIntent: "DEADLINE",
    primaryKeyword: "washington clean buildings deadline",
    secondaryKeywords: ["clean buildings performance standard", "wa building energy standard"],
    problemSlug: "building-energy-compliance",
    regulationSlug: "washington-clean-buildings",
    locationKey: "wa",
  },
  {
    fullPath: "/massachusetts/cape-cod/nitrogen-septic-upgrade",
    slug: "nitrogen-septic-upgrade",
    title: "Cape Cod nitrogen septic upgrade",
    pageType: "PROBLEM",
    primaryIntent: "APPLICABILITY",
    primaryKeyword: "cape cod septic nitrogen requirement",
    secondaryKeywords: ["title 5 cape cod", "nitrogen reducing septic system"],
    problemSlug: "nitrogen-reducing-septic-upgrade",
    regulationSlug: "massachusetts-title-5-septic",
    locationKey: "cape-cod",
    propertyTypeSlug: "single-family-home",
  },
];
