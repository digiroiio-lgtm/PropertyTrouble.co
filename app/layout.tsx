import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://propertytrouble.com"),
  title: {
    default: "PropertyTrouble.com | Rules, repairs, inspections, deadlines and costs",
    template: "%s | PropertyTrouble.com",
  },
  description:
    "Rules, repairs, inspections, deadlines and costs for U.S. property owners.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
