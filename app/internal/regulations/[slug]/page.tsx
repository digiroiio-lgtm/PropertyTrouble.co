import { notFound } from "next/navigation";
import {
  Badge,
  DatabaseNotice,
  Empty,
  EntityLink,
  PageTitle,
  Section,
  Table,
  Td,
  formatDate,
  verificationTone,
} from "@/components/internal/ui";
import { isDatabaseConfigured } from "@/lib/db";
import { getRegulationGraph } from "@/lib/services/regulations";

export const dynamic = "force-dynamic";

const flags = [
  ["mandatory", "Mandatory"],
  ["inspectionRequired", "Inspection"],
  ["repairRequired", "Repair"],
  ["permitRequired", "Permit"],
  ["penaltyPossible", "Penalty"],
  ["transactionRelevant", "Transaction"],
] as const;

const summaries = [
  ["applicabilitySummary", "Applicability"],
  ["requirementsSummary", "Requirements"],
  ["exemptionsSummary", "Exemptions"],
  ["penaltySummary", "Penalties"],
  ["transactionImpactSummary", "Transaction impact"],
] as const;

export default async function RegulationPage({ params }: { params: Promise<{ slug: string }> }) {
  if (!isDatabaseConfigured()) return <DatabaseNotice />;
  const { slug } = await params;
  const regulation = await getRegulationGraph(slug);
  if (!regulation) notFound();

  return (
    <>
      <PageTitle eyebrow={`Regulation · ${regulation.jurisdictionLevel}`} title={regulation.name}>
        {regulation.summary}
      </PageTitle>

      <div className="flex flex-wrap gap-2">
        <Badge>{regulation.status}</Badge>
        <Badge tone={verificationTone(regulation.sourceConfidence)}>
          {regulation.sourceConfidence ?? "UNVERIFIED"} · last verified {formatDate(regulation.lastVerifiedAt)}
        </Badge>
        {flags.map(([key, label]) => (
          <Badge key={key} tone={regulation[key] ? "good" : "neutral"}>
            {regulation[key] ? "✓" : "×"} {label}
          </Badge>
        ))}
      </div>

      <dl className="mt-6 grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl border border-line bg-card p-4">
          <dt className="text-xs font-bold uppercase tracking-[0.08em] text-muted">Issuing authority</dt>
          <dd className="mt-1 text-sm">{regulation.issuingAuthority}</dd>
        </div>
        <div className="rounded-2xl border border-line bg-card p-4">
          <dt className="text-xs font-bold uppercase tracking-[0.08em] text-muted">Recurrence</dt>
          <dd className="mt-1 text-sm">{regulation.recurrence ?? "—"}</dd>
        </div>
        {summaries.map(([key, label]) =>
          regulation[key] ? (
            <div key={key} className="rounded-2xl border border-line bg-card p-4">
              <dt className="text-xs font-bold uppercase tracking-[0.08em] text-muted">{label}</dt>
              <dd className="mt-1 text-sm leading-6">{regulation[key]}</dd>
            </div>
          ) : null,
        )}
      </dl>

      <Section title="Deadlines" count={regulation.deadlines.length}>
        {regulation.deadlines.length === 0 ? (
          <Empty>No deadlines recorded.</Empty>
        ) : (
          <Table head={["Deadline", "Date", "Status", "Scope", "Recurrence"]}>
            {regulation.deadlines.map((deadline) => (
              <tr key={deadline.id}>
                <Td>
                  <strong>{deadline.name}</strong>
                  {deadline.description ? <p className="text-xs text-muted">{deadline.description}</p> : null}
                  {deadline.location ? <p className="text-xs text-muted">Location: {deadline.location.name}</p> : null}
                </Td>
                <Td className="whitespace-nowrap">{formatDate(deadline.deadlineDate)}</Td>
                <Td>
                  <Badge tone={deadline.status === "PASSED" ? "neutral" : "warn"}>{deadline.status}</Badge>
                </Td>
                <Td className="text-xs">{deadline.propertyScope ?? "—"}</Td>
                <Td className="text-xs">{deadline.recurrence ?? "—"}</Td>
              </tr>
            ))}
          </Table>
        )}
      </Section>

      <div className="grid gap-x-6 lg:grid-cols-2">
        <Section title="Locations" count={regulation.locations.length}>
          <Table head={["Location", "Scope notes"]}>
            {regulation.locations.map(({ location, scopeNotes }) => (
              <tr key={location.id}>
                <Td>
                  {location.name} <Badge>{location.type}</Badge>
                </Td>
                <Td className="text-xs">{scopeNotes ?? "—"}</Td>
              </tr>
            ))}
          </Table>
        </Section>

        <Section title="Property types" count={regulation.propertyTypes.length}>
          <Table head={["Property type", "Notes"]}>
            {regulation.propertyTypes.map(({ propertyType, applicabilityNotes }) => (
              <tr key={propertyType.id}>
                <Td>{propertyType.name}</Td>
                <Td className="text-xs">{applicabilityNotes ?? "—"}</Td>
              </tr>
            ))}
          </Table>
        </Section>
      </div>

      <Section title="Sources" count={regulation.sources.length}>
        <Table head={["Source", "Type", "Claim scope", "Verified"]}>
          {regulation.sources.map(({ source, isPrimaryForRegulation, claimScope }) => (
            <tr key={source.id}>
              <Td>
                <a href={source.url} className="font-semibold underline underline-offset-4" rel="noreferrer" target="_blank">
                  {source.title}
                </a>
                <p className="text-xs text-muted">
                  {source.publisher}
                  {isPrimaryForRegulation ? " · primary" : ""}
                </p>
                {source.notes ? <p className="mt-1 text-xs text-amber-800">{source.notes}</p> : null}
              </Td>
              <Td>
                <Badge>{source.sourceType}</Badge>
              </Td>
              <Td className="text-xs">{claimScope ?? "—"}</Td>
              <Td className="whitespace-nowrap">{formatDate(source.lastVerifiedAt)}</Td>
            </tr>
          ))}
        </Table>
      </Section>

      <Section title="Cost models" count={regulation.costModels.length}>
        {regulation.costModels.length === 0 ? (
          <Empty>No cost models.</Empty>
        ) : (
          <Table head={["Problem", "Where / type", "Range", "Unit", "Confidence"]}>
            {regulation.costModels.map((cost) => (
              <tr key={cost.id}>
                <Td>
                  {cost.problem ? (
                    <EntityLink href={`/internal/problems/${cost.problem.slug}`}>{cost.problem.name}</EntityLink>
                  ) : (
                    "—"
                  )}
                </Td>
                <Td className="text-xs">
                  {[cost.location?.name, cost.propertyType?.name].filter(Boolean).join(" · ") || "—"}
                </Td>
                <Td>
                  {cost.lowEstimate || cost.highEstimate
                    ? `${cost.lowEstimate?.toString() ?? "?"} – ${cost.highEstimate?.toString() ?? "?"} ${cost.currency}`
                    : "No data"}
                </Td>
                <Td>{cost.unit}</Td>
                <Td>
                  <Badge tone={cost.confidence === "INSUFFICIENT_DATA" ? "warn" : "good"}>{cost.confidence}</Badge>
                </Td>
              </tr>
            ))}
          </Table>
        )}
      </Section>

      <div className="grid gap-x-6 lg:grid-cols-2">
        <Section title="Content pages" count={regulation.contentPages.length}>
          {regulation.contentPages.length === 0 ? (
            <Empty>No content pages mapped.</Empty>
          ) : (
            <Table head={["Path", "Type", "Status"]}>
              {regulation.contentPages.map((page) => (
                <tr key={page.id}>
                  <Td>
                    <code className="text-xs">{page.fullPath}</code>
                  </Td>
                  <Td>{page.pageType}</Td>
                  <Td>
                    <Badge>{page.status}</Badge>
                  </Td>
                </tr>
              ))}
            </Table>
          )}
        </Section>

        <Section title="Verification history" count={regulation.verificationEvents.length}>
          {regulation.verificationEvents.length === 0 ? (
            <Empty>Never verified. Record a VerificationEvent before publishing pages that cite this regulation.</Empty>
          ) : (
            <Table head={["When", "By", "Status", "Changes"]}>
              {regulation.verificationEvents.map((event) => (
                <tr key={event.id}>
                  <Td>{formatDate(event.verifiedAt)}</Td>
                  <Td>{event.verifiedBy}</Td>
                  <Td>
                    <Badge tone={verificationTone(event.status)}>{event.status}</Badge>
                  </Td>
                  <Td className="text-xs">
                    {[
                      event.sourceChanged && "source",
                      event.deadlineChanged && "deadline",
                      event.requirementsChanged && "requirements",
                    ]
                      .filter(Boolean)
                      .join(", ") || "none"}
                  </Td>
                </tr>
              ))}
            </Table>
          )}
        </Section>
      </div>
    </>
  );
}
