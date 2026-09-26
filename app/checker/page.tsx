import type { Metadata } from "next";
import Link from "next/link";
import {
  screenWashingtonTierOne,
  WA_TIER_ONE_REVIEWED_AT,
  WA_TIER_ONE_SOURCE,
} from "@/lib/checker/washington-tier-one";

export const metadata: Metadata = {
  title: "Washington Clean Buildings Tier 1 screening",
  description: "A source-backed preliminary screen for Washington Clean Buildings Tier 1 buildings.",
  robots: { index: false, follow: true },
};

type Params = Record<string, string | string[] | undefined>;

const getSingle = (params: Params, key: string) => {
  const value = params[key];
  return typeof value === "string" ? value : "";
};

export default async function CheckerPage({
  searchParams,
}: {
  searchParams: Promise<Params>;
}) {
  const params = await searchParams;
  const result = screenWashingtonTierOne({
    state: getSingle(params, "state"),
    qualifyingArea: getSingle(params, "qualifyingArea"),
    ownership: getSingle(params, "ownership"),
  });

  return (
    <main className="mx-auto max-w-3xl px-5 py-16 lg:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">Property Trouble Checker · Pilot</p>
      <h1 className="mt-3 text-4xl font-black tracking-[-0.04em]">Washington Clean Buildings Tier 1</h1>
      <section aria-live="polite" className="mt-8 rounded-[2rem] border border-line bg-card p-6 sm:p-8">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-muted">
          {result.kind === "potentially-covered" ? "Potentially covered" :
            result.kind === "undetermined" ? "More information needed" :
            result.kind === "invalid" ? "Check your answers" : "Not assessed under this pilot"}
        </p>
        <p className="mt-4 text-lg leading-8">{result.message}</p>
        {result.kind === "potentially-covered" && (
          <p className="mt-5 rounded-xl bg-background p-4">
            <strong>Initial reporting date for this size band:</strong> {result.deadline}.
            This date is not proof that a filing is outstanding. An approved extension or exemption may change the path.
          </p>
        )}
        <p className="mt-5 text-sm leading-7 text-muted">
          This screening uses your self-reported Washington location, qualifying floor area and ownership.
          Qualifying area means nonresidential, hotel, motel and dormitory gross floor area, excluding parking garages.
          It does not look up the building address, verify its records, test exemptions or extensions, calculate energy performance,
          assess penalties, or determine whether physical repairs are required. Tier 2 and other rules are not assessed.
        </p>
        <p className="mt-4 text-sm text-muted">
          Official source: <a className="underline" href={WA_TIER_ONE_SOURCE} target="_blank" rel="noopener noreferrer">
            Washington Department of Commerce, Tier 1 compliance
          </a>. Source reviewed {WA_TIER_ONE_REVIEWED_AT}.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/#checker" className="rounded-full bg-ink px-5 py-3 font-bold text-white">Check another building</Link>
          <a href={WA_TIER_ONE_SOURCE} target="_blank" rel="noopener noreferrer"
            className="rounded-full border border-ink/20 px-5 py-3 font-bold">Verify with Commerce</a>
        </div>
      </section>
    </main>
  );
}
