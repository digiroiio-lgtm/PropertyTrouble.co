export const problems: {
  slug: string;
  categorySlug: string;
  name: string;
  summary: string;
  /** 1 (minor) – 5 (critical). */
  defaultSeverity?: number;
}[] = [
  { slug: "failed-septic-system", categorySlug: "septic", name: "Failed septic system", summary: "A septic system that fails inspection or no longer treats wastewater and must be repaired or replaced.", defaultSeverity: 5 },
  { slug: "nitrogen-reducing-septic-upgrade", categorySlug: "septic", name: "Nitrogen-reducing septic upgrade", summary: "Upgrading a conventional septic system to nitrogen-reducing technology where local rules require it.", defaultSeverity: 4 },
  { slug: "condo-structural-inspection", categorySlug: "structural", name: "Condo structural inspection", summary: "Mandatory structural or milestone inspection of a condominium building.", defaultSeverity: 4 },
  { slug: "condo-structural-repair", categorySlug: "structural", name: "Condo structural repair", summary: "Repairs required after a structural inspection finds substantial deterioration.", defaultSeverity: 5 },
  { slug: "building-energy-compliance", categorySlug: "energy-performance", name: "Building energy compliance", summary: "Meeting a building performance standard or emissions limit for a large building.", defaultSeverity: 3 },
  { slug: "wildfire-home-hardening", categorySlug: "wildfire", name: "Wildfire home hardening", summary: "Ember-resistant vents, roofing and defensible space to reduce wildfire risk.", defaultSeverity: 3 },
  { slug: "cast-iron-pipe-failure", categorySlug: "plumbing", name: "Cast iron pipe failure", summary: "Corroded or cracked cast iron drain lines, common in older buildings.", defaultSeverity: 4 },
  { slug: "seawall-deterioration", categorySlug: "flood", name: "Seawall deterioration", summary: "Cracked, leaning or failing seawalls on waterfront property.", defaultSeverity: 4 },
  { slug: "slab-foundation-movement", categorySlug: "foundation", name: "Slab foundation movement", summary: "Settlement or heave of a slab-on-grade foundation.", defaultSeverity: 4 },
  { slug: "soft-story-building", categorySlug: "seismic", name: "Soft-story building", summary: "Wood-frame building with a weak ground floor that is vulnerable in earthquakes.", defaultSeverity: 5 },
  { slug: "commercial-asbestos-renovation", categorySlug: "asbestos", name: "Commercial asbestos renovation", summary: "Asbestos survey and abatement before renovating or demolishing a commercial building.", defaultSeverity: 4 },
];
