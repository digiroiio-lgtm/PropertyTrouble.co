# Property graph

The property graph is the structured data backbone of PropertyTrouble.com. Every future module — the Property Trouble Checker, content pages, lead routing and niche provisioning — reads from it.

```
LOCATION
 └─ PROPERTY TYPE
     └─ PROBLEM CATEGORY
         └─ PROBLEM
             └─ REGULATION
                 └─ DEADLINE
                     └─ REQUIRED ACTION   (summaries on Regulation for now)
                         └─ COST
                             └─ PROFESSIONAL
                                 └─ CONTENT PAGE
                                     └─ OPPORTUNITY
```

Schema: `prisma/schema.prisma`. Migration: `prisma/migrations/*_property_graph`.

## Models

| Model | Purpose |
|---|---|
| `Location` | Hierarchy: United States → state → county → city, plus `MARKET` and `SPECIAL_JURISDICTION` nodes (Cape Cod is a `MARKET` under Massachusetts). |
| `PropertyType` | What kind of property (single-family home, condo, office…), grouped by `PropertyClass`. |
| `ProblemCategory` | The 30 master categories, with a 1–5 `commercialIntentLevel`. |
| `Problem` | A concrete issue within a category (for example `failed-septic-system`). |
| `Regulation` | A rule that creates an obligation. Flags cover the basics; nuance lives in summary text. |
| `RegulationLocation`, `RegulationPropertyType` | Where a regulation applies and to what property types. |
| `Source`, `RegulationSource` | Primary and supporting sources. A regulation can cite several. |
| `Deadline` | One regulation can have many deadlines (phases, tiers, recurring cycles). |
| `CostModel` | Cost range for a problem, optionally scoped by regulation, location and property type. |
| `ProfessionalType`, `ProblemProfessional` | Who inspects, designs, repairs or permits each problem, in priority order. |
| `ProblemPropertyType` | How relevant a problem is (1–5) for each property type. |
| `ContentPage` | Maps an SEO/GEO page path to the entities it covers. Article bodies live elsewhere. |
| `VerificationEvent` | Audit trail of source checks. Powers stale-regulation monitoring later. |
| `OpportunityScore` | Seven scored dimensions and a computed total (max 100). |

## Modeling rules

1. **Legal nuance is text, not booleans.** Applicability, requirements, exemptions, penalties and transaction impact are summary fields on `Regulation`.
2. **Deadlines are rows, not a column.** For example, Washington Clean Buildings has three Tier 1 deadlines (2026, 2027 and 2028, by building size). `Regulation.nextDeadline` is a denormalized convenience field only.
3. **Never fabricate costs.** Numbers are optional. `INSUFFICIENT_DATA` rows must carry no estimates, and every cost row requires a methodology. Postgres enforces `low <= mid <= high`.
4. **Totals are always computed.** `OpportunityScore.totalScore` comes from `calculateOpportunityScore()` in `lib/scoring/opportunity-score.ts`. Services reject caller-supplied totals, and a CHECK constraint requires the total to equal the sum of the dimensions.
5. **Applicability inherits up the hierarchy.** `getApplicableRegulations()` walks a location's ancestors, so a Massachusetts rule applies on Cape Cod.
6. **Verification is explicit.** New regulations start `UNVERIFIED`. The seed records a `NEEDS_REVIEW` event for each seeded regulation, from a 2026-09-25 cross-check against search summaries of the official sources. Only a person reading the primary source should record `VERIFIED` (via `recordVerificationEvent()`), which also sets `lastVerifiedAt`. Re-seeding never overwrites a verification recorded by a person.

## Integrity enforced in Postgres

The migration adds CHECK constraints that Prisma does not model:

- Opportunity dimension ranges: 0–20, 0–20, 0–15, 0–15, 0–15, 0–10 and 0–5.
- `totalScore` equals the sum of the dimensions.
- Cost estimates are non-negative and ordered. `INSUFFICIENT_DATA` rows have no estimates.
- `commercialIntentLevel`, `relevance` and `defaultSeverity` are between 1 and 5. `priority` is at least 1.
- A partial unique index prevents duplicate root locations. Postgres treats NULL `parentId` values as distinct, so the composite unique alone would not.

## Code layout

| Path | What |
|---|---|
| `lib/db.ts` | Lazy `getDb()`. Nothing connects at import time, so the build works without `DATABASE_URL`. |
| `lib/scoring/` | Opportunity scoring. |
| `lib/validation/` | Cost range rules and zod input schemas. |
| `lib/graph/` | Pure hierarchy helpers (ancestor walk, tree building). |
| `lib/services/` | Typed queries and writes used by pages and future modules. |
| `prisma/seed/` | Idempotent seed: data files in `data/`, orchestration in `index.ts`. |
| `app/internal/` | Debug views. Available only in development; production returns 404. |

## Future-compatible entities

These are planned and not modeled yet. The current graph leaves room for them:

- **PropertyEvent**: a sale, inspection, permit or insurance renewal that triggers obligations.
- **LeadObject**: a property owner's request, linked to location, property type and problem.
- **Buyer**: a professional or company that buys leads, linked to `ProfessionalType` and locations.
- **Revenue**: attribution from lead or page to revenue.
- **NicheCandidate**: an `OpportunityScore` promoted for a dedicated niche site.
- **NicheAsset**: domains, sites and content produced for a niche candidate.
