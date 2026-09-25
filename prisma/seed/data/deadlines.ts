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
      "Due by December 31 of the year the building reaches 30 years from its certificate of occupancy (25 years if the local enforcement agency requires it).",
    status: "ACTIVE",
    recurrence: "Every 10 years after the initial milestone inspection",
    propertyScope: "Condominium and cooperative buildings three stories or taller",
  },
  {
    regulationSlug: "florida-condo-milestone-inspections",
    name: "Catch-up deadline for buildings already past the threshold",
    description: "Buildings that reached 30 years of age before July 1, 2022 had to complete the initial milestone inspection before this date.",
    deadlineDate: "2024-12-31",
    status: "PASSED",
    propertyScope: "Buildings that reached 30 years of age before July 1, 2022",
  },
  {
    regulationSlug: "florida-condo-milestone-inspections",
    name: "Deadline for buildings reaching 30 years between July 2022 and 2024",
    description: "Buildings that reached 30 years of age on or after July 1, 2022 and before December 31, 2024 had to complete the initial milestone inspection before this date.",
    deadlineDate: "2025-12-31",
    status: "PASSED",
    propertyScope: "Buildings that reached 30 years of age between July 1, 2022 and December 31, 2024",
  },
  {
    regulationSlug: "nyc-local-law-97",
    name: "Annual emissions report",
    description: "Annual report covering the previous calendar year's emissions, due May 1.",
    status: "ACTIVE",
    recurrence: "Annually by May 1",
    propertyScope: "Covered buildings over 25,000 gross sq ft",
  },
  {
    regulationSlug: "nyc-local-law-97",
    name: "First annual emissions report (2024 emissions)",
    deadlineDate: "2025-05-01",
    status: "PASSED",
    propertyScope: "Covered buildings over 25,000 gross sq ft",
  },
  {
    regulationSlug: "massachusetts-title-5-septic",
    name: "Inspection before property transfer",
    description:
      "Inspection at or within two years before transfer of title (three years with annual pumping records), or up to six months after when weather prevents it.",
    status: "ACTIVE",
    recurrence: "At each property transfer",
    propertyScope: "Properties served by on-site septic systems",
  },
  {
    regulationSlug: "massachusetts-title-5-septic",
    locationKey: "cape-cod",
    name: "Nitrogen-sensitive area upgrade",
    description:
      "Existing systems in the Cape Cod nitrogen-sensitive areas designated on July 7, 2023 must be upgraded to best-available nitrogen-reducing technology within five years of designation. The requirement is paused or waived where the town files a notice of intent for, or obtains, a watershed permit.",
    deadlineDate: "2028-07-07",
    status: "UPCOMING",
    propertyScope: "Cape Cod properties in designated nitrogen-sensitive areas",
  },
];
