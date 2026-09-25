/**
 * Runs `prisma migrate deploy` during Vercel production builds, and only when a
 * database is configured. Preview and local builds skip it, so a preview
 * deployment can never migrate the production database.
 *
 * Neon (via the Vercel Marketplace) exposes a pooled DATABASE_URL and a direct
 * DATABASE_URL_UNPOOLED; migrations need the direct connection.
 */
import { spawnSync } from "node:child_process";

const env = process.env.VERCEL_ENV;
const url = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;

if (env !== "production") {
  console.log(`[vercel-migrate] VERCEL_ENV=${env ?? "unset"}: skipping migrations.`);
  process.exit(0);
}
if (!url) {
  console.log("[vercel-migrate] No DATABASE_URL configured: skipping migrations.");
  process.exit(0);
}

console.log("[vercel-migrate] Applying migrations to the production database…");
const result = spawnSync("npx", ["prisma", "migrate", "deploy"], {
  stdio: "inherit",
  env: { ...process.env, DATABASE_URL: url },
});
process.exit(result.status ?? 1);
