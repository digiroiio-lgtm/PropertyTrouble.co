import { describe, expect, it } from "vitest";
import { buildTree, resolveAncestorIds } from "./location-path";

const rows = [
  { id: "us", parentId: null },
  { id: "ma", parentId: "us" },
  { id: "cape-cod", parentId: "ma" },
  { id: "fl", parentId: "us" },
];

describe("resolveAncestorIds", () => {
  it("walks to the root, nearest first", () => {
    expect(resolveAncestorIds(rows, "cape-cod")).toEqual(["cape-cod", "ma", "us"]);
  });

  it("returns an empty path for unknown ids", () => {
    expect(resolveAncestorIds(rows, "nope")).toEqual([]);
  });

  it("stops on cycles", () => {
    const cyclic = [
      { id: "a", parentId: "b" },
      { id: "b", parentId: "a" },
    ];
    expect(resolveAncestorIds(cyclic, "a")).toEqual(["a", "b"]);
  });

  it("stops at a missing parent", () => {
    expect(resolveAncestorIds([{ id: "x", parentId: "gone" }], "x")).toEqual(["x"]);
  });
});

describe("buildTree", () => {
  it("nests children under parents", () => {
    const [root] = buildTree(rows);
    expect(root.node.id).toBe("us");
    expect(root.children.map((c) => c.node.id).sort()).toEqual(["fl", "ma"]);
    expect(root.children.find((c) => c.node.id === "ma")?.children[0].node.id).toBe("cape-cod");
  });
});
