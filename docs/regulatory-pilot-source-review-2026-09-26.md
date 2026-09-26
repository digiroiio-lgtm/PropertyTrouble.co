# Phase 2 pilot: primary-source review (in progress)

Reviewed on 2026-09-26. This is a claim-level research note, **not** a legal
opinion, a parcel determination, a VERIFIED graph event or authorization to
publish an address result. The three research windows remain RESEARCH_ONLY.
The current statute/agency materials and local implementation must be checked
again before release. No scores, deadlines, public pages or lead flows change
in this PR.

## Illinois lead service lines

**Directly inspected:** [Illinois EPA lead service line information](https://epa.illinois.gov/topics/drinking-water/public-water-users/lead-service-line-information.html).
It states the Lead Service Line Replacement and Notification Act has applied
since January 1, 2022 and places inventory and replacement-planning duties on
community water supplies. Its 667,275 lead and 819,586 unknown counts refer to
the **2020 reporting year**, with an update posted January 14, 2022. They are
not a current count of affected addresses or an address-level lead list.

**Other primary sources to resolve before publication:** [415 ILCS 5/17.12](https://www.ilga.gov/legislation/ilcs/fulltext?DocName=041500050K17.12)
and [Illinois EPA inventory grant terms](https://epa.illinois.gov/topics/drinking-water/public-water-users/lsli-grant-opportunity.html).
The grant program calls for proof of public access to inventories on water
suppliers' or IEPA's websites. That does not establish a single statewide,
complete, redistributable, address-level dataset. Verify water-system coverage,
record format, material status, ownership, updates and permitted reuse.

**Commercial caveat:** The statutory replacement program is a utility-side
obligation. Do not infer that every lead/unknown line is an owner-paid plumbing
job or a qualified homeowner lead. Funding and private-side payment depend on
the water system and circumstances. Confirm the live statute, utility program,
property-owner cost and contractor procurement path in a specific pilot city.
An UNKNOWN material is not a confirmed lead pipe.

**Decision:** HOLD for owner-spend and data diligence. Lead inventory can
support a discovery product, but the user-facing cost/contractor funnel
requires proof of who pays and who procures.

## Florida Indian River Lagoon ENR septic

**Directly inspected:** [2026 Florida Statutes §373.469](https://www.flsenate.gov/Laws/Statutes/2026/373.469),
especially subsection (3)(d), and [Florida DEP's ENR overview](https://floridadep.gov/water/onsite-sewage/content/permitting-enhanced-nutrient-reducing-onsite-sewage-treatment-and).
For existing systems in the three named BMAPs and Mosquito Lagoon RAP, the
statute gives a July 1, 2030 deadline to connect to central sewer if available,
or use ENR-OSTDS/another qualifying wastewater system. The 2026 statute says
**any commercial property or residential property of 10 acres or less**.
The DEP overview, last modified September 8, 2026, still says any residential
property. The statute's history notes a 2026 amendment. Do not silently copy
the broader agency summary into the applicability rule. Obtain current legal
review of the exact effective amendment and any further exceptions before
a property-level decision.

**Data:** [DEP's onsite sewage data page](https://floridadep.gov/water/onsite-sewage/content/onsite-sewage-data)
links to Florida Water Management Inventory, a map and county downloads that
identify estimated wastewater treatment methods for developed properties.
[DEP BMAP resources](https://floridadep.gov/dear/water-quality-restoration/content/indian-river-lagoon-basin-management-action-plans)
provide basin boundaries. A GIS intersection is a candidate, not a
determination: verify septic record currency, parcel size, sewer availability,
boundary version, permitting exceptions and data reuse terms. Do not present
$20K+ as a verified local price; obtain contractor quotes/methodology.

**Decision:** strongest first calculator candidate, but HOLD address-level
"must upgrade" output pending data and legal gating. A branching explanation
may say "sewer available / not yet determined", never auto-select the branch
from ZIP alone.

## Cape Cod Title 5 / nitrogen-sensitive areas

**Primary-source discovery:** [MassDEP Title 5](https://www.mass.gov/regulations/310-CMR-15000-septic-systems-title-5)
and [watershed permit regulations](https://www.mass.gov/regulations/314-CMR-2100-watershed-permit-regulations)
identify NRNSA geography and municipal Notice of Intent, watershed permit and
de minimis application pathways. MassDEP publishes an
[address lookup](https://www.arcgis.com/home/item.html?id=96035fe034044e2596b49168b0e35d8e)
and a [watershed application status table](https://www.mass.gov/doc/watershed-permit-application-table/download).
The official Mass.gov documents and current table returned 403 to this review
environment, so the underlying legal text and town-by-town table were **not
fully inspected** here. Do not record VERIFIED status on that basis.

**Deadline caveat:** The existing seed's July 7, 2028 deadline is not a blanket
deadline for every Cape Cod property. Designation date, municipality's filing
and permit status can suspend or change the individual path. Verify the exact
clock in 310 CMR 15.215 and the latest table before publishing a countdown.
Address-in-NSA alone does not settle upgrade necessity. Identify wastewater
connection plans and the correct responsible party. Costs and public data
reuse are unverified.

**Decision:** HOLD on deadline and parcel-level answer until primary documents
and current municipal statuses are inspected. CapeCodSeptic.com remains a
research positioning hypothesis, not an address compliance determination.

## Release gates

1. Review current primary law and implementing agency material, citing each
   assertion separately. Resolve Florida agency/statute conflict and Cape Cod
   timing from authoritative current text. Record reviewer and source date.
2. Validate address/parcel data coverage, update time, license and match
   confidence. Avoid false certainty for unknown, missing or stale records.
3. Establish who pays, typical contract size and contractor procurement channel
   with local program/contractor evidence. Then separately validate keyword
   demand and domain availability.
4. Only after these gates, propose graph Regulation/Deadline/Source updates and
   public pages in a separate reviewed PR. No automatic VERIFIED event is
   produced by a research note.
