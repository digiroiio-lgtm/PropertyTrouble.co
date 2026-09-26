# Regulatory Golden Window research inventory

Phase 1 records the 25 windows supplied in the user's 2026-09-26 research brief in
`lib/research/regulatory-windows.ts`. It does **not** assert that 50 × 10 surfaces
were independently checked in this repository. All claims, dates, costs, public
inventory availability and scores remain unverified research hypotheses.

## Separation of concerns

- `researchScore` is the score from the user brief for an acquisition-channel
  hypothesis. It is **not** the calculated `OpportunityScore.totalScore`.
- `existingRegulationSlug` references one of four existing graph seed records
  (Cape Cod Title 5, Florida condo milestone, NYC LL97, Washington Clean
  Buildings). It does not validate the window or alter the existing seed.
- Windows are not synonymous with distinct laws. Florida condo milestone and
  SIRS may be related; statewide cesspool conversion and Hawaii trigger events
  may overlap. Resolve overlap before inserting graph regulations.
- All 25 entries are `UNVERIFIED`, `RESEARCH_ONLY`, and have no recorded
  primary-source verification date. No public route, sitemap entry, metadata,
  schema markup, checker answer or lead claim is created in this phase.
- The original brief provided some source names but not a source-to-claim audit
  for every row. Do not turn unvisited URLs or search snippets into VERIFIED
  sources. Keep evidence status separate from commercial priority.

## Verification gate for the next phase

For each Tier A candidate, review the **current primary authority** and record:
exact jurisdiction and property universe; effective date and applicable
deadlines (including past dates); exemptions, municipal alternatives and
enforcement; whether physical work is mandated or merely a plausible outcome;
source URL, exact claim supported, reviewer and review date; public dataset
coverage, update cadence, address resolution, licensing and match confidence.
Check cost estimates and search demand independently. Mark unsupported claims
as rejected or revised. Only then decide whether to create or update a
`Regulation`, `Deadline`, `Source`, `VerificationEvent` and public
`ContentPage`.

Initial review pilots: Illinois lead service lines, Florida ENR septic and
Cape Cod Title 5. The Washington 2026 tier date has already passed as of the
brief date, so it cannot be presented as an upcoming deadline. A ZIP code alone
cannot establish address-level applicability.
