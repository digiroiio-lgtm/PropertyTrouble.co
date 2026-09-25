import type { LocationType } from "@prisma/client";

export interface LocationSeed {
  /** Stable seed key; parentKey refers to another seed's key. */
  key: string;
  parentKey: string | null;
  name: string;
  slug: string;
  type: LocationType;
  stateCode?: string;
  fips?: string;
}

export const locations: LocationSeed[] = [
  { key: "us", parentKey: null, name: "United States", slug: "united-states", type: "COUNTRY" },

  { key: "fl", parentKey: "us", name: "Florida", slug: "florida", type: "STATE", stateCode: "FL", fips: "12" },
  { key: "ny", parentKey: "us", name: "New York", slug: "new-york", type: "STATE", stateCode: "NY", fips: "36" },
  { key: "wa", parentKey: "us", name: "Washington", slug: "washington", type: "STATE", stateCode: "WA", fips: "53" },
  { key: "ma", parentKey: "us", name: "Massachusetts", slug: "massachusetts", type: "STATE", stateCode: "MA", fips: "25" },
  { key: "ca", parentKey: "us", name: "California", slug: "california", type: "STATE", stateCode: "CA", fips: "06" },
  { key: "tx", parentKey: "us", name: "Texas", slug: "texas", type: "STATE", stateCode: "TX", fips: "48" },
  { key: "nj", parentKey: "us", name: "New Jersey", slug: "new-jersey", type: "STATE", stateCode: "NJ", fips: "34" },
  { key: "il", parentKey: "us", name: "Illinois", slug: "illinois", type: "STATE", stateCode: "IL", fips: "17" },
  { key: "co", parentKey: "us", name: "Colorado", slug: "colorado", type: "STATE", stateCode: "CO", fips: "08" },
  { key: "nc", parentKey: "us", name: "North Carolina", slug: "north-carolina", type: "STATE", stateCode: "NC", fips: "37" },

  { key: "miami-dade", parentKey: "fl", name: "Miami-Dade County", slug: "miami-dade-county", type: "COUNTY", stateCode: "FL", fips: "12086" },
  { key: "miami", parentKey: "miami-dade", name: "Miami", slug: "miami", type: "CITY", stateCode: "FL" },

  { key: "king", parentKey: "wa", name: "King County", slug: "king-county", type: "COUNTY", stateCode: "WA", fips: "53033" },
  { key: "seattle", parentKey: "king", name: "Seattle", slug: "seattle", type: "CITY", stateCode: "WA" },

  // NYC spans five counties, so it hangs directly off the state.
  { key: "nyc", parentKey: "ny", name: "New York City", slug: "new-york-city", type: "CITY", stateCode: "NY" },

  { key: "barnstable", parentKey: "ma", name: "Barnstable County", slug: "barnstable-county", type: "COUNTY", stateCode: "MA", fips: "25001" },
  // Cape Cod is a market, not a legal jurisdiction; it overlaps Barnstable County.
  { key: "cape-cod", parentKey: "ma", name: "Cape Cod", slug: "cape-cod", type: "MARKET", stateCode: "MA" },
];
