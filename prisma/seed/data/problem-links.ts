import type { ProfessionalRelationshipType } from "@prisma/client";

export const problemProfessionals: {
  problemSlug: string;
  professionalSlug: string;
  relationshipType: ProfessionalRelationshipType;
  priority: number;
}[] = [
  { problemSlug: "failed-septic-system", professionalSlug: "inspector", relationshipType: "INSPECTS", priority: 1 },
  { problemSlug: "failed-septic-system", professionalSlug: "septic-designer", relationshipType: "DESIGNS", priority: 2 },
  { problemSlug: "failed-septic-system", professionalSlug: "septic-installer", relationshipType: "REPLACES", priority: 3 },
  { problemSlug: "nitrogen-reducing-septic-upgrade", professionalSlug: "septic-designer", relationshipType: "DESIGNS", priority: 1 },
  { problemSlug: "nitrogen-reducing-septic-upgrade", professionalSlug: "septic-installer", relationshipType: "REPLACES", priority: 2 },
  { problemSlug: "condo-structural-inspection", professionalSlug: "structural-engineer", relationshipType: "INSPECTS", priority: 1 },
  { problemSlug: "condo-structural-inspection", professionalSlug: "architect", relationshipType: "INSPECTS", priority: 2 },
  { problemSlug: "condo-structural-repair", professionalSlug: "structural-engineer", relationshipType: "DESIGNS", priority: 1 },
  { problemSlug: "condo-structural-repair", professionalSlug: "concrete-restoration-contractor", relationshipType: "REPAIRS", priority: 2 },
  { problemSlug: "condo-structural-repair", professionalSlug: "waterproofing-contractor", relationshipType: "REPAIRS", priority: 3 },
  { problemSlug: "building-energy-compliance", professionalSlug: "hvac-contractor", relationshipType: "REPLACES", priority: 2 },
  { problemSlug: "building-energy-compliance", professionalSlug: "environmental-consultant", relationshipType: "CONSULTS", priority: 1 },
  { problemSlug: "wildfire-home-hardening", professionalSlug: "inspector", relationshipType: "INSPECTS", priority: 1 },
  { problemSlug: "wildfire-home-hardening", professionalSlug: "roofer", relationshipType: "REPLACES", priority: 2 },
  { problemSlug: "wildfire-home-hardening", professionalSlug: "general-contractor", relationshipType: "REPAIRS", priority: 3 },
  { problemSlug: "cast-iron-pipe-failure", professionalSlug: "plumber", relationshipType: "REPLACES", priority: 1 },
  { problemSlug: "seawall-deterioration", professionalSlug: "civil-engineer", relationshipType: "INSPECTS", priority: 1 },
  { problemSlug: "seawall-deterioration", professionalSlug: "seawall-contractor", relationshipType: "REPAIRS", priority: 2 },
  { problemSlug: "seawall-deterioration", professionalSlug: "permit-expeditor", relationshipType: "PERMITS", priority: 3 },
  { problemSlug: "slab-foundation-movement", professionalSlug: "structural-engineer", relationshipType: "INSPECTS", priority: 1 },
  { problemSlug: "slab-foundation-movement", professionalSlug: "foundation-contractor", relationshipType: "REPAIRS", priority: 2 },
  { problemSlug: "soft-story-building", professionalSlug: "structural-engineer", relationshipType: "DESIGNS", priority: 1 },
  { problemSlug: "soft-story-building", professionalSlug: "general-contractor", relationshipType: "REPAIRS", priority: 2 },
  { problemSlug: "commercial-asbestos-renovation", professionalSlug: "inspector", relationshipType: "INSPECTS", priority: 1 },
  { problemSlug: "commercial-asbestos-renovation", professionalSlug: "asbestos-contractor", relationshipType: "REPAIRS", priority: 2 },
  { problemSlug: "commercial-asbestos-renovation", professionalSlug: "environmental-consultant", relationshipType: "VERIFIES", priority: 3 },
];

export const problemPropertyTypes: { problemSlug: string; propertyTypeSlug: string; relevance: number }[] = [
  { problemSlug: "failed-septic-system", propertyTypeSlug: "single-family-home", relevance: 5 },
  { problemSlug: "failed-septic-system", propertyTypeSlug: "rental", relevance: 4 },
  { problemSlug: "nitrogen-reducing-septic-upgrade", propertyTypeSlug: "single-family-home", relevance: 5 },
  { problemSlug: "condo-structural-inspection", propertyTypeSlug: "condo", relevance: 5 },
  { problemSlug: "condo-structural-inspection", propertyTypeSlug: "hoa", relevance: 5 },
  { problemSlug: "condo-structural-repair", propertyTypeSlug: "hoa", relevance: 5 },
  { problemSlug: "condo-structural-repair", propertyTypeSlug: "condo", relevance: 4 },
  { problemSlug: "building-energy-compliance", propertyTypeSlug: "office", relevance: 5 },
  { problemSlug: "building-energy-compliance", propertyTypeSlug: "multifamily", relevance: 4 },
  { problemSlug: "building-energy-compliance", propertyTypeSlug: "hotel", relevance: 4 },
  { problemSlug: "wildfire-home-hardening", propertyTypeSlug: "single-family-home", relevance: 5 },
  { problemSlug: "cast-iron-pipe-failure", propertyTypeSlug: "single-family-home", relevance: 4 },
  { problemSlug: "cast-iron-pipe-failure", propertyTypeSlug: "multifamily", relevance: 4 },
  { problemSlug: "cast-iron-pipe-failure", propertyTypeSlug: "condo", relevance: 3 },
  { problemSlug: "seawall-deterioration", propertyTypeSlug: "single-family-home", relevance: 4 },
  { problemSlug: "seawall-deterioration", propertyTypeSlug: "hoa", relevance: 4 },
  { problemSlug: "slab-foundation-movement", propertyTypeSlug: "single-family-home", relevance: 5 },
  { problemSlug: "soft-story-building", propertyTypeSlug: "multifamily", relevance: 5 },
  { problemSlug: "soft-story-building", propertyTypeSlug: "mixed-use", relevance: 4 },
  { problemSlug: "commercial-asbestos-renovation", propertyTypeSlug: "commercial", relevance: 5 },
  { problemSlug: "commercial-asbestos-renovation", propertyTypeSlug: "office", relevance: 4 },
  { problemSlug: "commercial-asbestos-renovation", propertyTypeSlug: "industrial", relevance: 4 },
];
