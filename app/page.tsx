import Link from "next/link";
import { ProblemIcon } from "@/components/icons";
import { PropertyCheckerCard } from "@/components/property-checker-card";

const problems = [
  "Foundation",
  "Septic",
  "Roof",
  "Electrical",
  "Sewer",
  "Flooding",
  "Lead",
  "Asbestos",
  "Structural",
  "Wildfire",
];

const rules = [
  ["Florida", "Condo milestone inspections", "Structural"],
  ["New York City", "Local Law 97", "Energy"],
  ["Washington", "Clean Buildings", "Performance"],
  ["Cape Cod", "Septic requirements", "Wastewater"],
];

// Illustrative national ranges only; structured, sourced cost data replaces these later.
const costs = [
  ["Foundation repair", "$2,000 – $15,000+"],
  ["Roof replacement", "$8,000 – $25,000"],
  ["Septic system replacement", "$6,000 – $30,000"],
  ["Sewer line repair", "$3,000 – $12,000"],
];

const states = [
  "Florida",
  "California",
  "Texas",
  "New York",
  "Massachusetts",
  "Washington",
  "New Jersey",
  "Illinois",
];

const eyebrow = "text-xs font-bold uppercase tracking-[0.16em] text-muted";
const sectionTitle = "mt-2 text-3xl font-black tracking-[-0.03em] sm:text-4xl";

export default function Home() {
  return (
    <main>
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1.15fr_.85fr] lg:px-8 lg:py-24">
        <div className="flex flex-col justify-center">
          <p className="mb-5 text-sm font-black uppercase tracking-[0.18em] text-muted">
            U.S. property intelligence
          </p>
          <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.045em] sm:text-6xl lg:text-8xl">
            What does your property need next?
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-ink/70 sm:text-xl">
            Explore property rules, repairs, inspections, deadlines and costs. Our first live screening covers Washington Clean Buildings Tier 1 only.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#checker" className="rounded-full bg-ink px-5 py-3 font-bold text-white transition hover:opacity-90">
              Check Washington Tier 1
            </Link>
            <Link
              href="#problems"
              className="rounded-full border border-ink/15 px-5 py-3 font-bold transition hover:border-ink/40"
            >
              Browse Property Problems
            </Link>
          </div>
        </div>
        <PropertyCheckerCard />
      </section>

      <section id="problems" className="border-y border-line bg-white/45">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <p className={eyebrow}>Popular problems</p>
          <h2 className={sectionTitle}>Start with what you&apos;re dealing with.</h2>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {problems.map((problem) => (
              <div key={problem} className="rounded-2xl border border-line bg-card p-4 font-bold">
                <span className="flex size-10 items-center justify-center rounded-xl bg-background text-ink">
                  <ProblemIcon name={problem} className="size-5" />
                </span>
                <span className="mt-6 block">{problem}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="rules" className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <p className={eyebrow}>Rules &amp; deadlines</p>
        <h2 className={`${sectionTitle} max-w-3xl`}>
          Property obligations are local. The answer should be too.
        </h2>
        <div className="mt-8 divide-y divide-line border-y border-line">
          {rules.map(([place, title, tag]) => (
            <div key={title} className="grid gap-2 py-5 sm:grid-cols-[180px_1fr_auto] sm:items-center">
              <span className="text-sm text-muted">{place}</span>
              <strong>{title}</strong>
              <span className="w-fit rounded-full border border-line px-3 py-1 text-xs">{tag}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="costs" className="border-y border-line bg-white/45">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <p className={eyebrow}>Costs</p>
          <h2 className={`${sectionTitle} max-w-3xl`}>Know the range before you get the quote.</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {costs.map(([item, range]) => (
              <div key={item} className="rounded-2xl border border-line bg-card p-5">
                <p className="text-sm text-muted">{item}</p>
                <p className="mt-3 font-display text-2xl font-black tracking-[-0.03em]">{range}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted">
            Illustrative national ranges. Local labor, permits and property condition change the
            final number.
          </p>
        </div>
      </section>

      <section id="states" className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <p className={eyebrow}>States</p>
        <h2 className={`${sectionTitle} max-w-3xl`}>Rules change at the state line.</h2>
        <ul className="mt-8 flex flex-wrap gap-2">
          {states.map((state) => (
            <li key={state}>
              <span className="block rounded-full border border-ink/15 bg-card px-4 py-2 text-sm font-semibold">
                {state}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section id="tools" className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-ink p-7 text-white sm:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-accent/20 blur-3xl"
          />
          <p className="text-sm font-bold text-accent">Property tools</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-[-0.035em] sm:text-5xl">
            Understand the issue. Check the rule. Know the next step.
          </h2>
          <p className="mt-5 max-w-2xl leading-7 text-white/70">
            Our first live checker screens Washington Clean Buildings Tier 1 from self-reported building details. Other rules and address-level results are still in research.
          </p>
          <Link
            href="#checker"
            className="mt-7 inline-block rounded-full bg-accent px-5 py-3 font-bold text-accent-ink transition hover:opacity-90"
          >
            Check Washington Tier 1
          </Link>
        </div>
      </section>
    </main>
  );
}
