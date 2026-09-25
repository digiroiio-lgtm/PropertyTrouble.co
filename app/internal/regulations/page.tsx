import { RegulationStatus } from "@prisma/client";
import Link from "next/link";
import {
  Badge,
  DatabaseNotice,
  EntityLink,
  PageTitle,
  Table,
  Td,
  formatDate,
  verificationTone,
} from "@/components/internal/ui";
import { isDatabaseConfigured } from "@/lib/db";
import { listRegulations } from "@/lib/services/regulations";

export const dynamic = "force-dynamic";

const statuses = Object.values(RegulationStatus);

export default async function RegulationsPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  if (!isDatabaseConfigured()) return <DatabaseNotice />;
  const { status: rawStatus } = await searchParams;
  const status = statuses.find((s) => s === rawStatus);
  const regulations = await listRegulations({ status });

  return (
    <>
      <PageTitle eyebrow="Property graph" title="Regulations" />
      <div className="mb-4 flex flex-wrap gap-2 text-sm">
        {[undefined, ...statuses].map((s) => (
          <Link
            key={s ?? "all"}
            href={s ? `/internal/regulations?status=${s}` : "/internal/regulations"}
            className={`rounded-full border px-3 py-1 ${s === status ? "border-ink bg-ink text-white" : "border-line"}`}
          >
            {s ?? "All"}
          </Link>
        ))}
      </div>
      <Table head={["Regulation", "Where", "Status", "Next deadline", "Links", "Verification"]}>
        {regulations.map((regulation) => (
          <tr key={regulation.id}>
            <Td>
              <EntityLink href={`/internal/regulations/${regulation.slug}`}>{regulation.name}</EntityLink>
              <p className="text-xs text-muted">{regulation.issuingAuthority}</p>
            </Td>
            <Td>{regulation.locations.map((l) => l.location.name).join(", ")}</Td>
            <Td>
              <Badge>{regulation.status}</Badge>
            </Td>
            <Td>{formatDate(regulation.nextDeadline)}</Td>
            <Td className="whitespace-nowrap text-xs text-muted">
              {regulation._count.deadlines} deadlines · {regulation._count.sources} sources ·{" "}
              {regulation._count.propertyTypes} property types
            </Td>
            <Td>
              <Badge tone={verificationTone(regulation.sourceConfidence)}>{regulation.sourceConfidence ?? "—"}</Badge>
            </Td>
          </tr>
        ))}
      </Table>
    </>
  );
}
