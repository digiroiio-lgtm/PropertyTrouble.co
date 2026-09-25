import type { PropertyClass } from "@prisma/client";

export const propertyTypes: { slug: string; name: string; class: PropertyClass; description: string }[] = [
  { slug: "single-family-home", name: "Single-family home", class: "RESIDENTIAL", description: "Detached owner-occupied or rented house." },
  { slug: "condo", name: "Condo", class: "RESIDENTIAL", description: "Individually owned unit in a condominium association." },
  { slug: "hoa", name: "HOA / association", class: "RESIDENTIAL", description: "Homeowners, condominium or cooperative association responsible for common elements." },
  { slug: "rental", name: "Rental", class: "RESIDENTIAL", description: "Residential property leased to tenants." },
  { slug: "multifamily", name: "Multifamily", class: "MULTIFAMILY", description: "Building with multiple dwelling units." },
  { slug: "commercial", name: "Commercial", class: "COMMERCIAL", description: "General non-residential property." },
  { slug: "retail", name: "Retail", class: "COMMERCIAL", description: "Store, shopping center or other retail space." },
  { slug: "office", name: "Office", class: "COMMERCIAL", description: "Office building or office space." },
  { slug: "industrial", name: "Industrial", class: "COMMERCIAL", description: "Manufacturing or industrial facility." },
  { slug: "hotel", name: "Hotel", class: "COMMERCIAL", description: "Hotel, motel or other lodging." },
  { slug: "warehouse", name: "Warehouse", class: "COMMERCIAL", description: "Storage, distribution or logistics building." },
  { slug: "mixed-use", name: "Mixed-use", class: "MIXED", description: "Building combining residential and commercial uses." },
];
