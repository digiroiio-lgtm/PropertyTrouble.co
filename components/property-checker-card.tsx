const inputClass =
  "mt-2 w-full rounded-2xl border border-ink/15 bg-white px-4 py-3.5 transition focus:border-ink";

export function PropertyCheckerCard() {
  return (
    <form
      id="checker"
      action="/checker"
      method="get"
      aria-labelledby="checker-title"
      className="rounded-[2rem] border border-line bg-card p-5 shadow-[0_24px_80px_rgba(20,30,24,0.08)] md:p-7"
    >
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">
        Property Trouble Checker · Live pilot
      </p>
      <h2 id="checker-title" className="mt-2 text-2xl font-black tracking-[-0.03em]">
        Check Washington Clean Buildings Tier 1
      </h2>
      <p className="mt-3 text-sm leading-6 text-muted">
        Answer three questions for an initial, source-backed screening.
        Other states and property rules are not yet checked.
      </p>

      <label className="mt-5 block text-sm font-bold" htmlFor="state">Building location</label>
      <select id="state" name="state" required defaultValue="" className={inputClass}>
        <option value="" disabled>Select location</option>
        <option value="WA">Washington state</option>
        <option value="OTHER">Another state</option>
      </select>

      <label className="mt-5 block text-sm font-bold" htmlFor="qualifyingArea">
        Qualifying floor area (sq ft)
      </label>
      <input
        id="qualifyingArea"
        name="qualifyingArea"
        type="number"
        inputMode="numeric"
        min="1"
        max="999999999"
        step="1"
        required
        placeholder="e.g. 95000"
        className={inputClass}
      />
      <p className="mt-2 text-xs leading-5 text-muted">
        Add nonresidential, hotel, motel and dormitory gross floor area. Exclude parking garages.
        If you do not know the breakdown, obtain the building records before relying on a result.
      </p>

      <label className="mt-5 block text-sm font-bold" htmlFor="ownership">Building ownership</label>
      <select id="ownership" name="ownership" required defaultValue="" className={inputClass}>
        <option value="" disabled>Select ownership</option>
        <option value="private">Not federal or federally recognized tribal ownership</option>
        <option value="federal">Federal building</option>
        <option value="tribal">Owned by a federally recognized tribe</option>
        <option value="unsure">I am not sure</option>
      </select>

      <button
        type="submit"
        className="mt-6 w-full rounded-2xl bg-ink px-5 py-4 font-black text-white transition hover:-translate-y-px hover:opacity-95"
      >
        Check Tier 1 criteria
      </button>
      <p className="mt-3 text-xs leading-5 text-muted">
        Preliminary screening only. No address lookup, compliance determination, cost estimate or contractor match.
      </p>
    </form>
  );
}
