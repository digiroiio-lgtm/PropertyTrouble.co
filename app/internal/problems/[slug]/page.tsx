import { notFound } from "next/navigation";
import { Badge, DatabaseNotice, Empty, EntityLink, PageTitle, Section, Table, Td } from "@/components/internal/ui";
import { isDatabaseConfigured } from "@/lib/db";
import { getProblemGraph } from "@/lib/services/problems";

export const dynamic = "force-dynamic";

export default async function ProblemPage({ params }: { params: Promise<{ slug: string }> }) {
  if (!isDatabaseConfigured()) return <DatabaseNotice />;
  const { slug } = await params;
  const problem = await getProblemGraph(slug);
  if (!problem) notFound();

  return (
    <>
      <PageTitle eyebrow={`Problem · ${problem.category.name}`} title={problem.name}>
        {problem.summary}
      </PageTitle>
      <div className="flex flex-wrap gap-2">
        {problem.defaultSeverity ? <Badge tone="warn">Severity {problem.defaultSeverity}/5</Badge> : null}
        <Badge>Category intent {problem.category.commercialIntentLevel}/5</Badge>
      </div>

      <div className="grid gap-x-6 lg:grid-cols-2">
        <Section title="Professionals" count={problem.problemProfessionals.length}>
          <Table head={["#", "Professional", "Role"]}>
            {problem.problemProfessionals.map((link) => (
              <tr key={link.id}>
                <Td>{link.priority}</Td>
                <Td>{link.professionalType.name}</Td>
                <Td>
                  <Badge>{link.relationshipType}</Badge>
                </Td>
              </tr>
            ))}
          </Table>
        </Section>

        <Section title="Property types" count={problem.problemPropertyTypes.length}>
          <Table head={["Property type", "Relevance"]}>
            {problem.problemPropertyTypes.map((link) => (
              <tr key={link.id}>
                <Td>{link.propertyType.name}</Td>
                <Td>{"●".repeat(link.relevance)}</Td>
              </tr>
            ))}
          </Table>
        </Section>
      </div>

      <Section title="Related regulations" count={problem.relatedRegulations.length}>
        {problem.relatedRegulations.length === 0 ? (
          <Empty>No regulation linked through costs, content or opportunities.</Empty>
        ) : (
          <ul className="flex flex-wrap gap-3 text-sm">
            {problem.relatedRegulations.map((regulation) => (
              <li key={regulation.id}>
                <EntityLink href={`/internal/regulations/${regulation.slug}`}>{regulation.name}</EntityLink>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section title="Cost models" count={problem.costModels.length}>
        {problem.costModels.length === 0 ? (
          <Empty>No cost models.</Empty>
        ) : (
          <Table head={["Where / type", "Unit", "Confidence", "Methodology"]}>
            {problem.costModels.map((cost) => (
              <tr key={cost.id}>
                <Td className="text-xs">
                  {[cost.location?.name, cost.propertyType?.name].filter(Boolean).join(" · ") || "National"}
                </Td>
                <Td>{cost.unit}</Td>
                <Td>
                  <Badge tone={cost.confidence === "INSUFFICIENT_DATA" ? "warn" : "good"}>{cost.confidence}</Badge>
                </Td>
                <Td className="text-xs">{cost.methodology}</Td>
              </tr>
            ))}
          </Table>
        )}
      </Section>
    </>
  );
}
