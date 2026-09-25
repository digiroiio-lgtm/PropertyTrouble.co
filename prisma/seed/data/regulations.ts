import type { LocationType, RegulationStatus, SourceType } from "@prisma/client";

/**
 * Seed regulations. Facts were cross-checked on 2026-09-25 against web-search
 * summaries of the official sources listed below; the primary text itself
 * could not be opened from the build environment. Regulations are therefore
 * seeded NEEDS_REVIEW (see verification-events.ts) until a person reads the
 * primary sources and records a VERIFIED event.
 */
export const VERIFICATION_NOTE =
  "URL and key facts cross-checked via search summaries on 2026-09-25; primary text not yet read by a person.";

export interface SourceSeed {
  url: string;
  title: string;
  publisher: string;
  sourceType: SourceType;
  isPrimary: boolean;
}

export interface RegulationSeed {
  slug: string;
  name: string;
  summary: string;
  jurisdictionLevel: LocationType;
  issuingAuthority: string;
  status: RegulationStatus;
  recurrence?: string;
  mandatory: boolean;
  inspectionRequired: boolean;
  repairRequired: boolean;
  permitRequired: boolean;
  penaltyPossible: boolean;
  transactionRelevant: boolean;
  applicabilitySummary?: string;
  requirementsSummary?: string;
  exemptionsSummary?: string;
  penaltySummary?: string;
  transactionImpactSummary?: string;
  locations: { key: string; scopeNotes?: string }[];
  propertyTypes: { slug: string; applicabilityNotes?: string }[];
  sources: (SourceSeed & { claimScope?: string })[];
}

export const regulations: RegulationSeed[] = [
  {
    slug: "florida-condo-milestone-inspections",
    name: "Florida condominium milestone inspections",
    summary:
      "Florida requires milestone structural inspections for condominium and cooperative buildings three stories or taller, with follow-up inspections on a recurring cycle.",
    jurisdictionLevel: "STATE",
    issuingAuthority: "Florida Legislature (s. 553.899, Florida Statutes)",
    status: "ACTIVE",
    recurrence: "Initial milestone inspection, then every 10 years",
    mandatory: true,
    inspectionRequired: true,
    repairRequired: true,
    permitRequired: true,
    penaltyPossible: true,
    transactionRelevant: true,
    applicabilitySummary:
      "Condominium and cooperative buildings three stories or more in height. The initial milestone inspection is due by December 31 of the year the building reaches 30 years from its certificate of occupancy; the local enforcement agency may require it at 25 years where local circumstances, such as proximity to salt water, justify it.",
    requirementsSummary:
      "Phase one visual inspection by a licensed architect or engineer; a phase two inspection is required when substantial structural deterioration is found. Associations must distribute the inspection summary to unit owners.",
    exemptionsSummary: "Single-family homes, duplexes and buildings under three stories are outside the statute.",
    penaltySummary: "Enforcement is handled by the local building official; consequences vary by jurisdiction.",
    transactionImpactSummary:
      "Inspection reports and related structural reserve studies affect condo sales disclosures, lending and special assessments.",
    locations: [{ key: "fl" }],
    propertyTypes: [
      { slug: "condo", applicabilityNotes: "Unit owners bear costs through association assessments." },
      { slug: "hoa", applicabilityNotes: "The association is responsible for arranging the inspection." },
    ],
    sources: [
      {
        url: "https://www.flsenate.gov/Laws/Statutes/2024/553.899",
        title: "Section 553.899, Florida Statutes — Mandatory structural inspections for condominium and cooperative buildings",
        publisher: "The Florida Senate",
        sourceType: "STATE",
        isPrimary: true,
        claimScope: "Applicability, inspection phases, recurrence",
      },
      {
        url: "https://www.flsenate.gov/Laws/Statutes/2024/718.112",
        title: "Section 718.112, Florida Statutes — Bylaws (structural integrity reserve studies)",
        publisher: "The Florida Senate",
        sourceType: "STATE",
        isPrimary: false,
        claimScope: "Related structural integrity reserve study requirement",
      },
    ],
  },
  {
    slug: "nyc-local-law-97",
    name: "NYC Local Law 97",
    summary:
      "New York City sets annual greenhouse-gas emissions limits for most large buildings, with limits tightening in later compliance periods.",
    jurisdictionLevel: "CITY",
    issuingAuthority: "New York City Council / NYC Department of Buildings",
    status: "ACTIVE",
    recurrence: "Annual emissions report",
    mandatory: true,
    inspectionRequired: false,
    repairRequired: false,
    permitRequired: false,
    penaltyPossible: true,
    transactionRelevant: true,
    applicabilitySummary:
      "Most buildings over 25,000 gross square feet, and multiple buildings on one tax lot that together exceed 50,000 square feet. Limits are set by compliance period (2024–2029, 2030–2034, 2035–2039, 2040–2049) and tighten over time.",
    requirementsSummary:
      "Owners file an annual emissions report by May 1, certified by a registered design professional, and keep emissions under the limit for the building's size and occupancy group. The first report (2024 emissions) was due May 1, 2025.",
    exemptionsSummary:
      "Certain rent-regulated and affordable housing, and some other listed building types, follow alternative or prescriptive requirements instead of the standard emissions limits.",
    penaltySummary: "Civil penalties apply per ton of emissions over the limit and for late or missing reports.",
    transactionImpactSummary: "Projected penalties and retrofit capital needs affect valuation and due diligence.",
    locations: [{ key: "nyc" }],
    propertyTypes: [
      { slug: "multifamily" },
      { slug: "condo", applicabilityNotes: "Applies at the building level; costs flow to owners through the board." },
      { slug: "office" },
      { slug: "hotel" },
      { slug: "retail" },
      { slug: "mixed-use" },
      { slug: "commercial" },
    ],
    sources: [
      {
        url: "https://home.nyc.gov/site/sustainablebuildings/requirements/compliance.page",
        title: "Compliance — NYC Sustainable Buildings",
        publisher: "NYC Department of Buildings",
        sourceType: "CITY",
        isPrimary: true,
        claimScope: "Coverage, annual May 1 reporting",
      },
      {
        url: "https://www.nyc.gov/assets/buildings/pdf/ll97_emissions.pdf",
        title: "Local Law 97: Calculating building emissions & emission limits",
        publisher: "NYC Department of Buildings",
        sourceType: "CITY",
        isPrimary: false,
        claimScope: "Emission limits by occupancy group and compliance period",
      },
    ],
  },
  {
    slug: "washington-clean-buildings",
    name: "Washington Clean Buildings Performance Standard",
    summary:
      "Washington requires large buildings to meet energy use intensity targets, with compliance deadlines phased by building size.",
    jurisdictionLevel: "STATE",
    issuingAuthority: "Washington State Department of Commerce (RCW 19.27A.210)",
    status: "ACTIVE",
    recurrence: "Compliance every five years after the initial deadline",
    mandatory: true,
    inspectionRequired: false,
    repairRequired: false,
    permitRequired: false,
    penaltyPossible: true,
    transactionRelevant: true,
    applicabilitySummary:
      "Tier 1: commercial buildings over 50,000 square feet, with compliance phased by size (June 1, 2026 / 2027 / 2028). Tier 2: smaller commercial and multifamily buildings follow a separate benchmarking and management pathway.",
    requirementsSummary:
      "Benchmark energy use, meet the energy use intensity target for the building type or follow an approved conditional compliance path, and maintain an energy management plan.",
    exemptionsSummary: "Exemptions exist for specific hardship and building-use cases defined by Commerce.",
    penaltySummary: "Administrative penalties apply for non-compliance, scaled by building area.",
    transactionImpactSummary: "Compliance status and required upgrades matter in commercial acquisitions.",
    locations: [{ key: "wa" }],
    propertyTypes: [
      { slug: "office" },
      { slug: "retail" },
      { slug: "hotel" },
      { slug: "warehouse" },
      { slug: "commercial" },
      { slug: "multifamily", applicabilityNotes: "Tier 2 only." },
    ],
    sources: [
      {
        url: "https://app.leg.wa.gov/RCW/default.aspx?cite=19.27A.210",
        title: "RCW 19.27A.210 — State energy performance standard for covered commercial buildings",
        publisher: "Washington State Legislature",
        sourceType: "STATE",
        isPrimary: true,
        claimScope: "Statutory basis, energy use intensity targets, conditional compliance",
      },
      {
        url: "https://www.commerce.wa.gov/cbps/tier-1-compliance/",
        title: "CBPS Tier 1 compliance",
        publisher: "Washington State Department of Commerce",
        sourceType: "AGENCY",
        isPrimary: false,
        claimScope: "Tier 1 compliance dates by building size",
      },
    ],
  },
  {
    slug: "massachusetts-title-5-septic",
    name: "Massachusetts Title 5 septic requirements",
    summary:
      "Massachusetts' State Environmental Code (Title 5) governs on-site septic systems, including inspection at property transfer and upgrade of failed systems.",
    jurisdictionLevel: "STATE",
    issuingAuthority: "Massachusetts Department of Environmental Protection (310 CMR 15.000)",
    status: "ACTIVE",
    mandatory: true,
    inspectionRequired: true,
    repairRequired: true,
    permitRequired: true,
    penaltyPossible: true,
    transactionRelevant: true,
    applicabilitySummary: "Properties served by an on-site subsurface sewage disposal system.",
    requirementsSummary:
      "A system must be inspected at or within two years before a transfer of title (three years if the system was pumped at least annually), or up to six months after transfer when weather prevents inspection and the buyer is notified in writing. Failed systems must be upgraded or replaced under a permit from the local board of health. On Cape Cod, systems in designated nitrogen-sensitive areas must be upgraded to best-available nitrogen-reducing technology unless the town pursues a watershed permit.",
    exemptionsSummary: "Certain intra-family transfers and other listed cases are exempt from the transfer inspection.",
    penaltySummary: "Enforced by the local board of health and MassDEP.",
    transactionImpactSummary: "A failed inspection can delay closing or shift upgrade costs in negotiations.",
    locations: [
      { key: "ma" },
      { key: "cape-cod", scopeNotes: "Additional nitrogen-sensitive-area rules apply on Cape Cod." },
    ],
    propertyTypes: [
      { slug: "single-family-home" },
      { slug: "rental" },
      { slug: "condo", applicabilityNotes: "Where the association owns a shared on-site system." },
      { slug: "commercial" },
    ],
    sources: [
      {
        url: "https://www.mass.gov/doc/310-cmr-15-state-environmental-code-title-5-standard-requirements-for-the-siting-construction-inspection-upgrade-and-expansion-of-on-site-sewage-treatment-and-disposal-systems-and-for-the-transport-and-disposal-of-septage/download",
        title: "310 CMR 15.000: The State Environmental Code, Title 5",
        publisher: "Massachusetts Department of Environmental Protection",
        sourceType: "STATE",
        isPrimary: true,
        claimScope: "Inspection at transfer, upgrade requirements, nitrogen-sensitive areas",
      },
      {
        url: "https://www.mass.gov/guides/buying-or-selling-property-with-a-septic-system",
        title: "Buying or selling property with a septic system",
        publisher: "Massachusetts Department of Environmental Protection",
        sourceType: "AGENCY",
        isPrimary: false,
        claimScope: "Transfer inspection guidance",
      },
      {
        url: "https://www.capecod.gov/departments/masstc/learn/homeowner-resources/2023-title-5-regulation-changes/",
        title: "2023 Title 5 regulation changes",
        publisher: "Barnstable County",
        sourceType: "COUNTY",
        isPrimary: false,
        claimScope: "Cape Cod nitrogen-sensitive areas, watershed permits, upgrade timeline",
      },
    ],
  },
];
