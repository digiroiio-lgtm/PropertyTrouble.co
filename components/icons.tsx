import type { SVGProps } from "react";

/** Single-colour 24px line icons for property problem categories. */
const paths: Record<string, React.ReactNode> = {
  Foundation: (
    <>
      <path d="M3 20h18M5 20v-4h14v4M7 16v-3h10v3" />
      <path d="M11 13l1-3 1 3" />
    </>
  ),
  Septic: (
    <>
      <rect x="3" y="11" width="18" height="8" rx="3" />
      <path d="M8 11V6h3M16 11V8" />
    </>
  ),
  Roof: (
    <>
      <path d="M2 12l10-8 10 8" />
      <path d="M5 10v10h14V10" />
    </>
  ),
  Electrical: <path d="M13 2L5 14h6l-1 8 8-12h-6l1-8z" />,
  Sewer: (
    <>
      <path d="M3 7h8a3 3 0 013 3v4a3 3 0 003 3h4" />
      <path d="M3 11h6M15 21h6" />
    </>
  ),
  Flooding: (
    <>
      <path d="M2 16c2 0 2-1.5 4-1.5S8 16 10 16s2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5" />
      <path d="M2 20c2 0 2-1.5 4-1.5S8 20 10 20s2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5" />
      <path d="M12 3s-4 4.5-4 7a4 4 0 008 0c0-2.5-4-7-4-7z" />
    </>
  ),
  Lead: (
    <>
      <path d="M9 3h6M10 3v6l-5 9a2 2 0 002 3h10a2 2 0 002-3l-5-9V3" />
      <path d="M7.5 15h9" />
    </>
  ),
  Asbestos: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 9l8 6M8 15l8-6M12 7v10" />
    </>
  ),
  Structural: (
    <>
      <path d="M4 21V9l8-6 8 6v12" />
      <path d="M4 21h16M9 21v-6l3 2 3-4v8" />
    </>
  ),
  Wildfire: (
    <path d="M12 22a7 7 0 007-7c0-4-3-6-4-10-2 2-3 4-3 6-1-1-2-2-2-4-3 2-5 5-5 8a7 7 0 007 7z" />
  ),
};

export function ProblemIcon({ name, ...props }: { name: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
