import Link from "next/link";
import { navLinks } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
        <Link href="/" className="font-display text-lg font-black tracking-[-0.03em]">
          PropertyTrouble<span className="text-muted">.com</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-6 text-sm text-ink/70 lg:flex">
          {navLinks.map(({ label, href }) => (
            <Link key={label} href={href} className="transition hover:text-ink">
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/#checker"
            className="hidden rounded-full bg-ink px-4 py-2 text-sm font-bold text-white transition hover:opacity-90 sm:inline-block"
          >
            Check Your Property
          </Link>

          <details className="group relative lg:hidden">
            <summary
              aria-label="Open menu"
              className="flex size-10 cursor-pointer list-none items-center justify-center rounded-full border border-ink/15 [&::-webkit-details-marker]:hidden"
            >
              <svg viewBox="0 0 24 24" className="size-5 group-open:hidden" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <svg viewBox="0 0 24 24" className="hidden size-5 group-open:block" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </summary>
            <nav
              aria-label="Mobile"
              className="absolute right-0 mt-2 w-56 rounded-2xl border border-line bg-card p-2 shadow-[0_24px_60px_rgba(20,30,24,0.12)]"
            >
              {navLinks.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="block rounded-xl px-3 py-2.5 text-sm font-semibold hover:bg-background"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
