import { getDb } from "@/lib/db";
import { validateCostRange } from "@/lib/validation/cost";
import { costModelInputSchema, type CostModelInput } from "@/lib/validation/schemas";

export async function createCostModel(input: CostModelInput) {
  const data = costModelInputSchema.parse(input);
  validateCostRange(data);
  return getDb().costModel.create({ data });
}

export async function updateCostModel(id: string, input: CostModelInput) {
  const data = costModelInputSchema.parse(input);
  validateCostRange(data);
  return getDb().costModel.update({ where: { id }, data });
}
