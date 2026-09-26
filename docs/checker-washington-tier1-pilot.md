# Property Trouble Checker: first live pilot

Reviewed 2026-09-26 against the Washington Department of Commerce
[Tier 1 compliance page](https://www.commerce.wa.gov/cbps/tier-1-compliance/).
The pilot uses a versioned, source-backed rule module, not the seeded
Regulation graph, whose existing entries remain NEEDS_REVIEW. It does not
change those statuses or treat the 25 research windows as published facts.

The public homepage collects state (Washington / elsewhere), self-reported
qualifying nonresidential/hotel/motel/dormitory floor area excluding parking
garages, and ownership (private/other non-federal, federal, federally recognized
tribal, unknown). A GET request to /checker produces a server-rendered result
without an API key, database, cookie or collected address. Values in the URL
are not personal addresses.

This is **a preliminary screen**, not address-level verification. A potential
match means the self-reported answers meet the basic Tier 1 criteria. Federal
and tribal ownership are handled using the agency's explicit exclusion. The
result does not verify legal ownership, actual location, occupancy categories,
Commerce building inventory, mixed-use measurement, exemptions, extensions,
energy targets, filing status, costs or required repairs. It never says the
building is compliant, noncompliant, or that a quote is needed. An outside-pilot
result never claims the property has no other obligations.

Tier 1: qualifying area >50,000 sq ft. Size-band initial reporting dates are
June 1, 2028 for >50,000 to 90,000; June 1, 2027 for >90,000 to 220,000;
June 1, 2026 for >220,000. Date labels deliberately say "initial reporting"
because the first band has already passed at the time of this review and an
extension or exemption can change an individual building's next action.
Rules are covered by boundary and negative-path unit tests.

Before expanding this to address-level applicability: reconcile the state
inventory with the parcel/address, verify license and refresh interval,
document exemptions and reviewer sign-off, and add explicit stale-data and
no-match handling. Re-review the official guidance after any legal change.
