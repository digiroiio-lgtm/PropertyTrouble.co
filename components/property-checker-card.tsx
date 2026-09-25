const propertyTypes = ["Home", "Condo", "Rental", "Multifamily", "Commercial"];

export function PropertyCheckerCard() {
  return (
    <form
      id="checker"
      className="rounded-[2rem] border border-black/10 bg-[var(--card)] p-5 shadow-[0_24px_80px_rgba(20,30,24,0.08)] md:p-7"
    >
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-black/45">
            Property Trouble Checker
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-[-0.04em]">Start with your property</h2>
        </div>
        <span className="rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-bold">MVP</span>
      </div>

      <label className="block text-sm font-bold" htmlFor="zip">
        ZIP code
      </label>
      <input
        id="zip"
        name="zip"
        inputMode="numeric"
        placeholder="e.g. 33139"
        className="mt-2 w-full rounded-2xl border border-black/15 bg-white px-4 py-3.5 outline-none ring-0 transition focus:border-black"
      />

      <fieldset className="mt-5">
        <legend className="text-sm font-bold">Property type</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {propertyTypes.map((type) => (
            <label key={type} className="cursor-pointer">
              <input className="peer sr-only" type="radio" name="propertyType" value={type} />
              <span className="block rounded-full border border-black/15 px-3 py-2 text-sm peer-checked:border-black peer-checked:bg-black peer-checked:text-white">
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
        placeholder="e.g. 1972"
        className="mt-2 w-full rounded-2xl border border-black/15 bg-white px-4 py-3.5 outline-none transition focus:border-black"
      />

      <button
        type="button"
        className="mt-6 w-full rounded-2xl bg-[#17211c] px-5 py-4 font-black text-white transition hover:translate-y-[-1px]"
      >
        Check My Property
      </button>
      <p className="mt-3 text-xs leading-5 text-black/45">
        Phase 1 establishes the interface. Deterministic ZIP, age and property matching arrives in the checker packet.
      </p>
    </form>
  );
}
