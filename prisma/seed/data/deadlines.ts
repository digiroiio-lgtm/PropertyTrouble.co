import type { DeadlineStatus } from "@prisma/client";

/**
 * One regulation may have many deadlines. Dates are only set where the
 * phase date is well established; otherwise timing lives in the description
 * until verified.
 */
export const deadlines: {
  regulationSlug: string;
  locationKey?: string;
  name: string;
  description?: string;
  deadlineDate?: string;
  status: DeadlineStatus;
  recurrence?: string;
  propertyScope?: string;
}[] = [
  {
    regulationSlug: "washington-clean-buildings",
    name: "Tier 1 — buildings over 220,000 sq ft",
    deadlineDate: "2026-06-01",
    status: "UPCOMING",
    recurrence: "Every five years after the initial deadline",
    propertyScope: "Covered commercial buildings larger than 220,000 sq ft",
  },
  {
    regulationSlug: "washington-clean-buildings",
    name: "Tier 1 — buildings over 90,000 sq ft",
    deadlineDate: "2027-06-01",
    status: "UPCOMING",
    recurrence: "Every five years after the initial deadline",
    propertyScope: "Covered commercial buildings larger than 90,000 sq ft and up to 220,000 sq ft",
  },
  {
    regulationSlug: "washington-clean-buildings",
    name: "Tier 1 — buildings over 50,000 sq ft",
    deadlineDate: "2028-06-01",
    status: "UPCOMING",
    recurrence: "Every five years after the initial deadline",
    propertyScope: "Covered commercial buildings larger than 50,000 sq ft and up to 90,000 sq ft",
  },
  {
    regulationSlug: "florida-condo-milestone-inspections",
    name: "Initial milestone inspection",
    description:
      "Due by December 31 of the year the building reaches the age threshold after its certificate of occupancy.",
    status: "ACTIVE",
    recurrence: "Every 10 years after the initial milestone inspection",
    propertyScope: "Condominium and cooperative buildings three stories or taller",
  },
  {
    regulationSlug: "florida-condo-milestone-inspections",
    name: "Catch-up deadline for buildings already past the threshold",
    description: "Buildings that had already reached the age threshold had a statewide catch-up deadline.",
    deadlineDate: "2024-12-31",
    status: "PASSED",
    propertyScope: "Buildings whose certificate of occupancy was issued on or before July 1, 1992",
  },
  {
    regulationSlug: "nyc-local-law-97",
    name: "Annual emissions report",
    description: "Annual report covering the previous calendar year's emissions.",
    status: "ACTIVE",
    recurrence: "Annually",
    propertyScope: "Covered buildings over 25,000 gross sq ft",
  },
  {
    regulationSlug: "massachusetts-title-5-septic",
    name: "Inspection before property transfer",
    description: "A Title 5 inspection is generally required within a set window before the sale closes.",
    status: "ACTIVE",
    recurrence: "At each property transfer",
    propertyScope: "Properties served by on-site septic systems",
  },
  {
    regulationSlug: "massachusetts-title-5-septic",
    locationKey: "cape-cod",
    name: "Nitrogen-sensitive area upgrade",
    description:
      "In designated Cape Cod nitrogen-sensitive areas, systems must be upgraded to nitrogen-reducing technology within a fixed window unless the town obtains a watershed permit.",
    status: "UPCOMING",
    propertyScope: "Cape Cod properties in designated nitrogen-sensitive areas",
  },
];
