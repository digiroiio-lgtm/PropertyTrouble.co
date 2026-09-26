import { describe, expect, it } from "vitest";
import { screenWashingtonTierOne } from "./washington-tier-one";

const check = (area: string, ownership = "private", state = "WA") =>
  screenWashingtonTierOne({ state, qualifyingArea: area, ownership });

describe("Washington Tier 1 screening", () => {
  it("does not claim a result for other states", () => {
    expect(check("221000", "private", "OTHER").kind).toBe("outside-pilot");
  });
  it("handles exact floor area boundaries", () => {
    expect(check("50000").kind).toBe("outside-pilot");
    expect(check("50001")).toMatchObject({ kind: "potentially-covered", deadline: "June 1, 2028" });
    expect(check("90000")).toMatchObject({ deadline: "June 1, 2028" });
    expect(check("90001")).toMatchObject({ deadline: "June 1, 2027" });
    expect(check("220000")).toMatchObject({ deadline: "June 1, 2027" });
    expect(check("220001")).toMatchObject({ deadline: "June 1, 2026" });
  });
  it("does not treat federal or tribal buildings as privately covered", () => {
    expect(check("250000", "federal").kind).toBe("outside-pilot");
    expect(check("250000", "tribal").kind).toBe("outside-pilot");
  });
  it("returns uncertainty for unknown ownership", () => {
    expect(check("250000", "unsure").kind).toBe("undetermined");
  });
  it("rejects missing, fractional, negative, malformed or excessive input", () => {
    for (const area of ["", "50000.5", "-3", "1e5", "9999999999"]) {
      expect(check(area).kind).toBe("invalid");
    }
    expect(check("0").kind).toBe("invalid");
    expect(check("50001", "not-a-choice").kind).toBe("invalid");
    expect(check("50001", "private", "CA").kind).toBe("invalid");
  });
});
