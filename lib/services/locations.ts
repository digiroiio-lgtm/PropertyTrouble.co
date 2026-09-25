import type { Location } from "@prisma/client";
import { getDb } from "@/lib/db";
import { buildTree, resolveAncestorIds } from "@/lib/graph/location-path";
import { locationInputSchema, type LocationInput } from "@/lib/validation/schemas";

export class DuplicateLocationError extends Error {
  constructor(slug: string) {
    super(`A location with slug "${slug}" and the same type already exists under this parent.`);
    this.name = "DuplicateLocationError";
  }
}

export async function getLocationTree() {
  const rows = await getDb().location.findMany({ orderBy: [{ type: "asc" }, { name: "asc" }] });
  return buildTree(rows);
}

/** Resolves a slug path such as ["united-states", "massachusetts", "cape-cod"]. */
export async function getLocationBySlugPath(slugs: string[]): Promise<Location | null> {
  const db = getDb();
  let parentId: string | null = null;
  let current: Location | null = null;
  for (const slug of slugs) {
    current = await db.location.findFirst({ where: { slug, parentId } });
    if (!current) return null;
    parentId = current.id;
  }
  return current;
}

/** Returns the location plus its ancestors, nearest first. */
export async function getLocationWithAncestors(id: string): Promise<Location[]> {
  const rows = await getDb().location.findMany();
  const byId = new Map(rows.map((row) => [row.id, row]));
  return resolveAncestorIds(rows, id).map((ancestorId) => byId.get(ancestorId)!);
}

export async function createLocation(input: LocationInput): Promise<Location> {
  const data = locationInputSchema.parse(input);
  const db = getDb();
  const existing = await db.location.findFirst({
    where: { parentId: data.parentId ?? null, slug: data.slug, type: data.type },
  });
  if (existing) throw new DuplicateLocationError(data.slug);
  return db.location.create({ data: { ...data, parentId: data.parentId ?? null } });
}
