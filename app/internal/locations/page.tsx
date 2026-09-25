import type { Location } from "@prisma/client";
import { Badge, DatabaseNotice, PageTitle } from "@/components/internal/ui";
import { isDatabaseConfigured } from "@/lib/db";
import type { TreeNode } from "@/lib/graph/location-path";
import { getLocationTree } from "@/lib/services/locations";

export const dynamic = "force-dynamic";

function Branch({ nodes }: { nodes: TreeNode<Location>[] }) {
  return (
    <ul className="space-y-1 border-l border-line pl-4">
      {nodes.map(({ node, children }) => (
        <li key={node.id}>
          <div className="flex flex-wrap items-center gap-2 py-1 text-sm">
            <strong>{node.name}</strong>
            <Badge>{node.type}</Badge>
            {node.fips ? <span className="text-xs text-muted">FIPS {node.fips}</span> : null}
            <code className="text-xs text-muted">{node.slug}</code>
          </div>
          {children.length > 0 ? <Branch nodes={children} /> : null}
        </li>
      ))}
    </ul>
  );
}

export default async function LocationsPage() {
  if (!isDatabaseConfigured()) return <DatabaseNotice />;
  const tree = await getLocationTree();

  return (
    <>
      <PageTitle eyebrow="Property graph" title="Locations">
        Country → state → county → city, plus markets and special jurisdictions such as Cape Cod.
      </PageTitle>
      <div className="rounded-2xl border border-line bg-card p-5">
        <Branch nodes={tree} />
      </div>
    </>
  );
}
