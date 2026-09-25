import type { LocationType, RegulationStatus, SourceType } from "@prisma/client";

/**
 * Seed regulations. Every fact here was written without access to the
 * primary sources, so all regulations and sources are seeded UNVERIFIED and
 * must be checked by a person before any page cites them.
 */
export const VERIFICATION_NOTE = "Seed data — requires human verification against the primary source.";

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
      "Condominium and cooperative buildings three stories or more in height. The initial inspection is tied to the building's age from its certificate of occupancy; local officials may set an earlier threshold based on environmental conditions.",
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
      "Most buildings over 25,000 gross square feet, and multiple buildings on one tax lot that together exceed 50,000 square feet. Some building types follow alternative compliance pathways.",
    requirementsSummary:
      "Owners file an annual emissions report certified by a registered design professional and keep emissions under the limit for the building's occupancy group.",
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
        url: "https://www.nyc.gov/site/sustainablebuildings/ll97/local-law-97.page",
        title: "Local Law 97",
        publisher: "NYC Mayor's Office of Climate and Environmental Justice / Department of Buildings",
        sourceType: "CITY",
        isPrimary: true,
        claimScope: "Coverage, limits, reporting",
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
      "Tier 1: nonresidential buildings over 50,000 square feet, phased by size. Tier 2: smaller commercial and multifamily buildings follow a separate benchmarking and management pathway.",
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
        claimScope: "Statutory basis and tiered deadlines",
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
      "A Title 5 inspection is generally required before a property is sold; systems that fail must be upgraded or replaced under a permit from the local board of health.",
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
        url: "https://www.mass.gov/regulations/310-CMR-1500-the-state-environmental-code-title-5",
        title: "310 CMR 15.000: The State Environmental Code, Title 5",
        publisher: "Massachusetts Department of Environmental Protection",
        sourceType: "STATE",
        isPrimary: true,
        claimScope: "Inspection and upgrade requirements",
      },
      {
        url: "https://www.mass.gov/guides/title-5-and-watershed-permit-regulations-for-cape-cod",
        title: "Title 5 and Watershed Permit regulations for Cape Cod",
        publisher: "Massachusetts Department of Environmental Protection",
        sourceType: "AGENCY",
        isPrimary: false,
        claimScope: "Cape Cod nitrogen-sensitive-area rules",
      },
    ],
  },
];
