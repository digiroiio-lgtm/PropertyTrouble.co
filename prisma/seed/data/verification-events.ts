import type { VerificationStatus } from "@prisma/client";

/** Identifies events owned by the seed so re-running replaces them. */
export const SEED_VERIFIER = "seed:web-search-crosscheck";

/**
 * 2026-09-25 cross-check. Key facts and source URLs were compared with web
 * search summaries of the official sources; the primary text could not be
 * opened from the build environment, so the outcome is NEEDS_REVIEW rather
 * than VERIFIED. A person should read each primary source and record a
 * VERIFIED event via recordVerificationEvent().
 */
export const verificationEvents: {
  regulationSlug: string;
  verifiedAt: string;
  status: VerificationStatus;
  notes: string;
  sourceChanged: boolean;
  deadlineChanged: boolean;
  requirementsChanged: boolean;
}[] = [
  {
    regulationSlug: "florida-condo-milestone-inspections",
    verifiedAt: "2026-09-25",
    status: "NEEDS_REVIEW",
    notes:
      "Confirmed: 3+ stories, initial inspection by Dec 31 of the year the building reaches 30 (25 if required locally), then every 10 years; Dec 31, 2024 catch-up deadline. Added the Dec 31, 2025 deadline for buildings reaching 30 between July 1, 2022 and Dec 31, 2024.",
    sourceChanged: false,
    deadlineChanged: true,
    requirementsChanged: true,
  },
  {
    regulationSlug: "nyc-local-law-97",
    verifiedAt: "2026-09-25",
    status: "NEEDS_REVIEW",
    notes:
      "Confirmed: buildings over 25,000 gross sq ft; annual report due May 1, first report May 1, 2025; compliance periods 2024–2029 onward. Replaced an unconfirmed source URL with the DOB compliance page and emissions-limit PDF.",
    sourceChanged: true,
    deadlineChanged: true,
    requirementsChanged: true,
  },
  {
    regulationSlug: "washington-clean-buildings",
    verifiedAt: "2026-09-25",
    status: "NEEDS_REVIEW",
    notes:
      "Confirmed Tier 1 compliance dates: June 1, 2026 (>220,000 sq ft), June 1, 2027 (>90,000), June 1, 2028 (>50,000). Added the Commerce Tier 1 compliance page as a source.",
    sourceChanged: true,
    deadlineChanged: false,
    requirementsChanged: false,
  },
  {
    regulationSlug: "massachusetts-title-5-septic",
    verifiedAt: "2026-09-25",
    status: "NEEDS_REVIEW",
    notes:
      "Confirmed: inspection within 2 years before transfer (3 with annual pumping; up to 6 months after for weather). Cape Cod NSAs designated July 7, 2023, with a 5-year upgrade window unless the town pursues a watershed permit. Replaced two unconfirmed source URLs.",
    sourceChanged: true,
    deadlineChanged: true,
    requirementsChanged: true,
  },
];
