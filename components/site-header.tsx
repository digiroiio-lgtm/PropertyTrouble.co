const links = [
  ["Problems", "#problems"],
  ["Rules & Deadlines", "#rules"],
  ["Costs", "#costs"],
  ["States", "#states"],
  ["Tools", "#tools"],
] as const;

export function SiteHeader() {
  return (
    <header className="border-b border-black/10 bg-[#f6f4ee]/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <a href="/" className="text-lg font-black tracking-[-0.03em]">
          PropertyTrouble<span className="text-black/45">.com</span>
        </a>
        <nav className="hidden items-center gap-6 text-sm text-black/65 lg:flex">
          {links.map(([label, href]) => (
            <a key={label} href={href} className="transition hover:text-black">
              {label}
            </a>
          ))}
        </nav>
        <a
          href="#checker"
          className="rounded-full bg-[#17211c] px-4 py-2 text-sm font-bold text-white transition hover:opacity-90"
        >
          Check Your Property
        </a>
      </div>
    </header>
  );
}
