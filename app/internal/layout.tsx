import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Internal",
  robots: { index: false, follow: false },
};

const links = [
  ["Overview", "/internal"],
  ["Locations", "/internal/locations"],
  ["Regulations", "/internal/regulations"],
  ["Opportunities", "/internal/opportunities"],
  ["Research windows", "/internal/research"],
] as const;

/** Debug views for the property graph. Development only; 404 everywhere else. */
export default function InternalLayout({ children }: { children: React.ReactNode }) {
  if (process.env.NODE_ENV !== "development") notFound();

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
      <nav aria-label="Internal" className="mb-8 flex flex-wrap items-center gap-2 text-sm">
        <span className="mr-2 rounded-full bg-ink px-3 py-1 text-xs font-bold text-white">Internal · dev only</span>
        {links.map(([label, href]) => (
          <Link key={href} href={href} className="rounded-full border border-line px-3 py-1 hover:border-ink">
            {label}
          </Link>
        ))}
      </nav>
      {children}
    </div>
  );
}
