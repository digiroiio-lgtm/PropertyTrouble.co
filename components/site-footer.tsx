import Link from "next/link";
import { navLinks, siteName, tagline } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 lg:grid-cols-[1fr_auto] lg:px-8">
        <div>
          <Link href="/" className="font-display text-lg font-black tracking-[-0.03em]">
            PropertyTrouble<span className="text-muted">.com</span>
          </Link>
          <p className="mt-3 max-w-md text-sm leading-6 text-muted">{tagline}</p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
          {navLinks.map(({ label, href }) => (
            <Link key={label} href={href} className="hover:text-ink">
              {label}
            </Link>
          ))}
        </nav>
        <p className="border-t border-line pt-6 text-xs leading-5 text-muted lg:col-span-2">
          © {new Date().getFullYear()} {siteName}. Information on this site is general and
          educational. It is not legal, engineering or financial advice. Always confirm requirements
          with your local jurisdiction or a licensed professional.
        </p>
      </div>
    </footer>
  );
}
