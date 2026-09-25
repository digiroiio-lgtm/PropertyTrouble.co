export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://propertytrouble.com";

export const siteName = "PropertyTrouble.com";

export const tagline = "Rules, repairs, inspections, deadlines and costs for U.S. property owners.";

export const navLinks = [
  { label: "Problems", href: "/#problems" },
  { label: "Rules & Deadlines", href: "/#rules" },
  { label: "Costs", href: "/#costs" },
  { label: "States", href: "/#states" },
  { label: "Tools", href: "/#tools" },
] as const;
