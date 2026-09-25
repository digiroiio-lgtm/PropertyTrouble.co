# PropertyTrouble.com

**What does your property need next?**

Rules, repairs, inspections, deadlines and costs for U.S. property owners.

## Phase 1

This repository contains the production foundation for PropertyTrouble.com:

- Next.js App Router + TypeScript
- Tailwind CSS
- Prisma/PostgreSQL foundation
- brand and layout system
- homepage skeleton
- Property Trouble Checker interface
- SEO metadata baseline

## Local development

```bash
npm install        # also runs `prisma generate` (postinstall)
cp .env.example .env
npm run dev
```

Checks (run in CI on every PR): `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, plus a Postgres job that migrates, seeds twice and checks the graph.

## Database and property graph

The ontology, modeling rules and code layout are in [`docs/property-graph.md`](docs/property-graph.md).

The public site builds and runs **without** a database. Migrations, seeding and the `/internal` debug views need PostgreSQL:

```bash
# point DATABASE_URL at PostgreSQL 15+ in .env, then:
npm run db:deploy   # apply migrations
npm run db:seed     # idempotent: safe to run repeatedly
npm run db:check    # assert the seeded graph shape
npm run dev         # then open http://localhost:3000/internal
```

- Use `npm run db:migrate` to create a new migration after editing `prisma/schema.prisma`.
- `/internal/*` is available only in development. Production returns 404.
- For production, create a Postgres database (for example Neon through the Vercel Marketplace) and set `DATABASE_URL` in the Vercel project. Then run `npm run db:deploy` against it before relying on data-backed features.
- Seeded regulations and sources are marked `UNVERIFIED`. Verify them against the primary sources before publishing pages that cite them.

## Design system

Tokens are defined once in `app/globals.css` under `@theme`, which makes Tailwind generate matching utilities. Use the utilities; avoid hardcoded hex values in components.

| Token | Value | Utility examples | Use |
|---|---|---|---|
| `background` | `#f6f4ee` | `bg-background` | Page background |
| `ink` / `foreground` | `#17211c` | `bg-ink`, `text-ink` | Text, primary buttons, dark panels |
| `muted` | `#59645c` | `text-muted` | Secondary text and eyebrows (AA contrast on background) |
| `line` | `#d9ded8` | `border-line`, `divide-line` | Borders and dividers |
| `card` | `#fffdf8` | `bg-card` | Cards and form surfaces |
| `accent` | `#d8ff63` | `bg-accent`, `text-accent` | Highlights and CTAs on dark panels. Never use it as a text color on light backgrounds |
| `accent-ink` | `#18200f` | `text-accent-ink` | Text placed on accent |

- Fonts: Inter for body text (`font-sans`) and Inter Tight for headings (`font-display`), loaded with `next/font`.
- Focus: a global `:focus-visible` ring (ink outline + accent halo). Do not remove outlines without replacing them.
- Base styles live in `@layer base` so utilities always win.

## Image usage

| Slot | Asset | Where |
|---|---|---|
| Favicon / app icon | House monogram SVG | `app/icon.svg` |
| Social share (OG / Twitter) | 1200×630, generated | `app/opengraph-image.tsx` |
| Problem category cards | 24px single-colour line icons | `components/icons.tsx` |
| Homepage hero | No photo. The checker card is the visual anchor on a radial accent background | — |
| Future: problem detail heroes | 16:9 photo, at least 1600px wide, served with `next/image` (AVIF/WebP) | `public/images/problems/` |
| Future: state pages | SVG state outline or map | `public/images/states/` |
| Future: partners / experts | Logos in SVG, headshots in 1:1 | `public/images/partners/` |

Use descriptive `alt` text for content images and `alt=""` / `aria-hidden` for decorative ones. Only use licensed or owned photography.

## Product principle

PropertyTrouble is a property-intelligence product, not a generic home-improvement blog. The long-term moat is structured property-problem data, regulatory data, local applicability, search behavior, property events, buyer demand and revenue attribution.
