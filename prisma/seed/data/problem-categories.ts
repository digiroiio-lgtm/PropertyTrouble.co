export const problemCategories: {
  slug: string;
  name: string;
  description: string;
  /** 1 (low) – 5 (high) commercial intent. */
  commercialIntentLevel: number;
}[] = [
  { slug: "septic", name: "Septic", description: "On-site wastewater systems: inspection, failure, upgrade and replacement.", commercialIntentLevel: 5 },
  { slug: "sewer", name: "Sewer", description: "Sewer laterals, main connections, backups and line replacement.", commercialIntentLevel: 4 },
  { slug: "foundation", name: "Foundation", description: "Settlement, cracking, heave and foundation repair.", commercialIntentLevel: 5 },
  { slug: "structural", name: "Structural", description: "Structural condition, inspections and repair of buildings.", commercialIntentLevel: 5 },
  { slug: "balcony-deck", name: "Balcony & deck", description: "Exterior elevated elements, balconies and decks.", commercialIntentLevel: 4 },
  { slug: "seismic", name: "Seismic", description: "Earthquake vulnerability and seismic retrofit.", commercialIntentLevel: 4 },
  { slug: "flood", name: "Flood", description: "Flood risk, elevation, floodproofing and coastal protection.", commercialIntentLevel: 4 },
  { slug: "hurricane-wind", name: "Hurricane & wind", description: "Wind mitigation, openings protection and roof-to-wall connections.", commercialIntentLevel: 4 },
  { slug: "wildfire", name: "Wildfire", description: "Defensible space and home hardening in wildfire-prone areas.", commercialIntentLevel: 3 },
  { slug: "roofing", name: "Roofing", description: "Roof condition, leaks, replacement and roof code requirements.", commercialIntentLevel: 5 },
  { slug: "lead", name: "Lead", description: "Lead paint and lead service lines: testing, disclosure and abatement.", commercialIntentLevel: 3 },
  { slug: "asbestos", name: "Asbestos", description: "Asbestos surveys, abatement and renovation rules.", commercialIntentLevel: 4 },
  { slug: "mold", name: "Mold", description: "Mold assessment and remediation.", commercialIntentLevel: 3 },
  { slug: "water-damage", name: "Water damage", description: "Leaks, water intrusion and restoration.", commercialIntentLevel: 4 },
  { slug: "electrical", name: "Electrical", description: "Wiring, panels, service upgrades and electrical hazards.", commercialIntentLevel: 4 },
  { slug: "plumbing", name: "Plumbing", description: "Supply and drain piping, fixtures and pipe failures.", commercialIntentLevel: 4 },
  { slug: "hvac", name: "HVAC", description: "Heating, cooling and ventilation systems.", commercialIntentLevel: 4 },
  { slug: "electrification", name: "Electrification", description: "Fossil-fuel to electric conversions: heat pumps, induction, EV charging.", commercialIntentLevel: 3 },
  { slug: "energy-performance", name: "Energy performance", description: "Benchmarking, building performance standards and emissions limits.", commercialIntentLevel: 4 },
  { slug: "building-envelope", name: "Building envelope", description: "Facades, windows, air sealing and exterior wall systems.", commercialIntentLevel: 3 },
  { slug: "fire-safety", name: "Fire safety", description: "Sprinklers, alarms, egress and fire code compliance.", commercialIntentLevel: 3 },
  { slug: "accessibility", name: "Accessibility", description: "ADA and accessibility compliance.", commercialIntentLevel: 3 },
  { slug: "elevator", name: "Elevator", description: "Elevator inspection, modernization and code compliance.", commercialIntentLevel: 3 },
  { slug: "parking-structure", name: "Parking structure", description: "Parking garage inspection and concrete restoration.", commercialIntentLevel: 4 },
  { slug: "rental-compliance", name: "Rental compliance", description: "Rental registration, inspection and habitability requirements.", commercialIntentLevel: 3 },
  { slug: "unpermitted-work", name: "Unpermitted work", description: "Unpermitted additions and legalizing past work.", commercialIntentLevel: 3 },
  { slug: "building-permits", name: "Building permits", description: "When permits are required and how the process works.", commercialIntentLevel: 2 },
  { slug: "insurance-mitigation", name: "Insurance mitigation", description: "Inspections and upgrades that affect insurability and premiums.", commercialIntentLevel: 3 },
  { slug: "environmental", name: "Environmental", description: "Radon, underground tanks, contamination and environmental assessments.", commercialIntentLevel: 3 },
  { slug: "demolition", name: "Demolition", description: "Demolition permits, surveys and requirements.", commercialIntentLevel: 2 },
];
