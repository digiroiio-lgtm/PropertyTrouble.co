import Link from "next/link";
import type { ReactNode } from "react";

export function PageTitle({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <header className="mb-8">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">{eyebrow}</p>
      <h1 className="mt-2 text-3xl font-black tracking-[-0.03em]">{title}</h1>
      {children ? <div className="mt-3 max-w-3xl text-sm leading-6 text-muted">{children}</div> : null}
    </header>
  );
}

export function Section({ title, count, children }: { title: string; count?: number; children: ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="mb-3 flex items-baseline gap-2 text-lg font-black tracking-[-0.02em]">
        {title}
        {count != null ? <span className="text-sm font-semibold text-muted">{count}</span> : null}
      </h2>
      {children}
    </section>
  );
}

export function Table({ head, children }: { head: string[]; children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-line bg-card">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-line text-xs uppercase tracking-[0.08em] text-muted">
          <tr>
            {head.map((h) => (
              <th key={h} className="px-4 py-3 font-bold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">{children}</tbody>
      </table>
    </div>
  );
}

export function Td({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <td className={`px-4 py-3 align-top ${className}`}>{children}</td>;
}

const badgeTones = {
  neutral: "border-line bg-background",
  good: "border-ink bg-accent text-accent-ink",
  warn: "border-amber-300 bg-amber-50 text-amber-900",
  bad: "border-red-300 bg-red-50 text-red-900",
} as const;

export function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: keyof typeof badgeTones }) {
  return (
    <span className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-semibold ${badgeTones[tone]}`}>
      {children}
    </span>
  );
}

export function verificationTone(status: string | null | undefined): keyof typeof badgeTones {
  if (status === "VERIFIED") return "good";
  if (status === "SOURCE_CHANGED" || status === "STALE") return "bad";
  return "warn";
}

export function Empty({ children }: { children: ReactNode }) {
  return <p className="rounded-2xl border border-dashed border-line p-4 text-sm text-muted">{children}</p>;
}

export function EntityLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="font-semibold underline decoration-line underline-offset-4 hover:decoration-ink">
      {children}
    </Link>
  );
}

export function DatabaseNotice() {
  return (
    <div className="rounded-2xl border border-amber-300 bg-amber-50 p-5 text-sm leading-6 text-amber-900">
      <p className="font-bold">Database not configured.</p>
      <p className="mt-1">
        Set <code>DATABASE_URL</code> in <code>.env</code>, then run{" "}
        <code>npm run db:deploy &amp;&amp; npm run db:seed</code>.
      </p>
    </div>
  );
}

export function formatDate(date: Date | null | undefined): string {
  return date ? date.toISOString().slice(0, 10) : "—";
}
