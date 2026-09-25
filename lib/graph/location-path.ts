export interface LocationNode {
  id: string;
  parentId: string | null;
}

/**
 * Returns [id, parentId, grandparentId, …] up to the root. A regulation
 * attached to any of these locations applies to the starting location
 * (e.g. Massachusetts Title 5 applies on Cape Cod).
 * Stops on cycles or missing parents instead of looping forever.
 */
export function resolveAncestorIds(locations: Iterable<LocationNode>, id: string): string[] {
  const byId = new Map<string, LocationNode>();
  for (const location of locations) byId.set(location.id, location);

  const path: string[] = [];
  const seen = new Set<string>();
  let current = byId.get(id);

  while (current && !seen.has(current.id)) {
    path.push(current.id);
    seen.add(current.id);
    current = current.parentId ? byId.get(current.parentId) : undefined;
  }
  return path;
}

export interface TreeNode<T> {
  node: T;
  children: TreeNode<T>[];
}

/** Builds a forest from flat rows; orphans (missing parent) become roots. */
export function buildTree<T extends LocationNode>(rows: T[]): TreeNode<T>[] {
  const nodes = new Map<string, TreeNode<T>>();
  for (const row of rows) nodes.set(row.id, { node: row, children: [] });

  const roots: TreeNode<T>[] = [];
  for (const entry of nodes.values()) {
    const parent = entry.node.parentId ? nodes.get(entry.node.parentId) : undefined;
    if (parent && parent !== entry) parent.children.push(entry);
    else roots.push(entry);
  }
  return roots;
}
