import { DatabaseNotice, EntityLink, PageTitle, Section, Table, Td } from "@/components/internal/ui";
import { isDatabaseConfigured } from "@/lib/db";
import { getGraphStats } from "@/lib/services/graph-stats";
import { listCategories } from "@/lib/services/problems";

export const dynamic = "force-dynamic";

export default async function InternalOverview() {
  if (!isDatabaseConfigured()) return <DatabaseNotice />;
  const [stats, categories] = await Promise.all([getGraphStats(), listCategories()]);

  return (
    <>
      <PageTitle eyebrow="Property graph" title="Overview">
        Location → Property type → Problem category → Problem → Regulation → Deadline → Cost → Professional →
        Content page → Opportunity
      </PageTitle>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {Object.entries(stats).map(([model, count]) => (
          <div key={model} className="rounded-2xl border border-line bg-card p-4">
            <p className="text-xs text-muted">{model}</p>
            <p className="mt-2 font-display text-2xl font-black">{count}</p>
          </div>
        ))}
      </div>

      <Section title="Problem categories" count={categories.length}>
        <Table head={["Category", "Commercial intent", "Problems"]}>
          {categories.map((category) => (
            <tr key={category.id}>
              <Td>
                <strong>{category.name}</strong>
                <p className="text-xs text-muted">{category.description}</p>
              </Td>
              <Td>{"●".repeat(category.commercialIntentLevel)}</Td>
              <Td>{category._count.problems}</Td>
            </tr>
          ))}
        </Table>
      </Section>

      <p className="mt-8 text-sm text-muted">
        Start with <EntityLink href="/internal/regulations">regulations</EntityLink> or{" "}
        <EntityLink href="/internal/opportunities">opportunities</EntityLink>.
      </p>
    </>
  );
}
