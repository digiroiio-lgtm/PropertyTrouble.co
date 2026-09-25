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

export default function Home() {
  return (
    <main>
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1.15fr_.85fr] lg:px-8 lg:py-24">
        <div className="flex flex-col justify-center">
          <p className="mb-5 text-sm font-black uppercase tracking-[0.18em] text-black/45">
            U.S. property intelligence
          </p>
          <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.065em] sm:text-6xl lg:text-8xl">
            What does your property need next?
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-black/60 sm:text-xl">
            Rules, repairs, inspections, deadlines and costs for U.S. property owners.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#checker" className="rounded-full bg-[#17211c] px-5 py-3 font-bold text-white">
              Check Your Property
            </a>
            <a href="#problems" className="rounded-full border border-black/15 px-5 py-3 font-bold">
              Browse Property Problems
            </a>
          </div>
        </div>
        <PropertyCheckerCard />
      </section>

      <section id="problems" className="border-y border-black/10 bg-white/45">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-black/45">Popular problems</p>
              <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] sm:text-4xl">
                Start with what you&apos;re dealing with.
              </h2>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {problems.map((problem) => (
              <a
                key={problem}
                href="#checker"
                className="rounded-2xl border border-black/10 bg-[var(--card)] p-4 font-bold transition hover:-translate-y-0.5 hover:border-black/30"
              >
                {problem}
                <span className="mt-8 block text-black/35">→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="rules" className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-black/45">Rules & deadlines</p>
        <h2 className="mt-2 max-w-3xl text-3xl font-black tracking-[-0.04em] sm:text-4xl">
          Property obligations are local. The answer should be too.
        </h2>
        <div className="mt-8 divide-y divide-black/10 border-y border-black/10">
          {rules.map(([place, title, tag]) => (
            <div key={title} className="grid gap-2 py-5 sm:grid-cols-[180px_1fr_auto] sm:items-center">
              <span className="text-sm text-black/45">{place}</span>
              <strong>{title}</strong>
              <span className="w-fit rounded-full border border-black/10 px-3 py-1 text-xs">{tag}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="tools" className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        <div className="rounded-[2rem] bg-[#17211c] p-7 text-white sm:p-10">
          <p className="text-sm font-bold text-white/55">PropertyTrouble.com</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-[-0.04em] sm:text-5xl">
            Understand the issue. Check the rule. Know the next step.
          </h2>
          <p className="mt-5 max-w-2xl leading-7 text-white/65">
            Phase 1 establishes the national intelligence layer. Regulatory sources, structured costs, Golden Master clusters and property matching follow on this foundation.
          </p>
        </div>
      </section>
    </main>
  );
}
