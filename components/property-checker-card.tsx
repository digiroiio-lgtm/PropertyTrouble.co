const propertyTypes = ["Home", "Condo", "Rental", "Multifamily", "Commercial"];

const inputClass =
  "mt-2 w-full rounded-2xl border border-ink/15 bg-white px-4 py-3.5 transition placeholder:text-ink/40 focus:border-ink";

export function PropertyCheckerCard() {
  return (
    <form
      id="checker"
      action="/#checker"
      aria-labelledby="checker-title"
      className="rounded-[2rem] border border-line bg-card p-5 shadow-[0_24px_80px_rgba(20,30,24,0.08)] md:p-7"
    >
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
            Property Trouble Checker
          </p>
          <h2 id="checker-title" className="mt-2 text-2xl font-black tracking-[-0.03em]">
            Start with your property
          </h2>
        </div>
        <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-ink">
          Beta
        </span>
      </div>

      <label className="block text-sm font-bold" htmlFor="zip">
        ZIP code
      </label>
      <input
        id="zip"
        name="zip"
        inputMode="numeric"
        autoComplete="postal-code"
        maxLength={5}
        pattern="\d{5}"
        title="5-digit U.S. ZIP code"
        placeholder="e.g. 33139"
        className={inputClass}
      />

      <fieldset className="mt-5">
        <legend className="text-sm font-bold">Property type</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {propertyTypes.map((type) => (
            <label key={type} className="cursor-pointer">
              <input className="peer sr-only" type="radio" name="propertyType" value={type} />
              <span className="block rounded-full border border-ink/15 px-3 py-2 text-sm transition hover:border-ink/40 peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink">
                {type}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="mt-5 block text-sm font-bold" htmlFor="year">
        Approximate year built
      </label>
      <input
        id="year"
        name="year"
        inputMode="numeric"
        maxLength={4}
        pattern="\d{4}"
        title="4-digit year, e.g. 1972"
        placeholder="e.g. 1972"
        className={inputClass}
      />

      <button
        type="submit"
        className="mt-6 w-full rounded-2xl bg-ink px-5 py-4 font-black text-white transition hover:-translate-y-px hover:opacity-95"
      >
        Check My Property
      </button>
      <p className="mt-3 text-xs leading-5 text-muted">
        Your ZIP, building age and property type are used to surface local rules, common failure
        points and typical repair costs. Results are informational.
      </p>
    </form>
  );
}
