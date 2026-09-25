import { PrismaClient } from "@prisma/client";

/**
 * Lazy Prisma access. Nothing connects, and no client is constructed, at
 * import time — so `next build` works without DATABASE_URL.
 */

export class DatabaseNotConfiguredError extends Error {
  constructor() {
    super("DATABASE_URL is not set. Copy .env.example to .env and point it at PostgreSQL.");
    this.name = "DatabaseNotConfiguredError";
  }
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export function isDatabaseConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

export function getDb(): PrismaClient {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;
  if (!isDatabaseConfigured()) throw new DatabaseNotConfiguredError();

  const client = new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
  // Reuse one client across hot reloads in development; in production the
  // module cache already keeps a single instance per server process.
  globalForPrisma.prisma = client;
  return client;
}
