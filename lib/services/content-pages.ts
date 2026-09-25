import { getDb } from "@/lib/db";
import { contentPageInputSchema, type ContentPageInput } from "@/lib/validation/schemas";

export class MissingEntityError extends Error {
  constructor(entity: string, id: string) {
    super(`${entity} ${id} does not exist.`);
    this.name = "MissingEntityError";
  }
}

/** Upserts a content page by fullPath after checking every linked entity exists. */
export async function upsertContentPage(input: ContentPageInput) {
  const data = contentPageInputSchema.parse(input);
  const db = getDb();

  const checks: [string, string | null | undefined, (id: string) => Promise<unknown>][] = [
    ["Problem", data.problemId, (id) => db.problem.findUnique({ where: { id }, select: { id: true } })],
    ["Regulation", data.regulationId, (id) => db.regulation.findUnique({ where: { id }, select: { id: true } })],
    ["Location", data.locationId, (id) => db.location.findUnique({ where: { id }, select: { id: true } })],
    ["PropertyType", data.propertyTypeId, (id) => db.propertyType.findUnique({ where: { id }, select: { id: true } })],
  ];
  for (const [entity, id, find] of checks) {
    if (id && !(await find(id))) throw new MissingEntityError(entity, id);
  }

  return db.contentPage.upsert({ where: { fullPath: data.fullPath }, create: data, update: data });
}
