import Link from "next/link";
import { Badge, PageTitle, Table, Td } from "@/components/internal/ui";
import { regulatoryWindowResearch } from "@/lib/research/regulatory-windows";

export default function ResearchInventoryPage() {
  return (
    <>
      <PageTitle eyebrow="Research only · user brief 2026-09-26" title="Regulatory Golden Windows">
        25 candidate acquisition windows. Scores are supplied research estimates, not the
        calculated OpportunityScore. No entry has a verified primary source or is approved
        for public publication.
      </PageTitle>
      <p className="mb-6 rounded-2xl border border-line bg-card p-4 text-sm leading-6">
        Tier A: ranks 1–15 for source review. Tier B: ranks 16–25 for further research.
        A linked graph regulation is an existing seed record, not evidence that this research
        candidate has been independently verified.
      </p>
      <Table head={["#", "Window", "Geography", "Trigger", "Window / caveat", "Services", "Research score", "Review"]}>
        {regulatoryWindowResearch.map((item) => (
          <tr key={item.slug}>
            <Td>{item.rank}</Td>
            <Td>
              <strong>{item.name}</strong>
              {item.existingRegulationSlug ? (
                <p className="text-xs">
                  Existing graph:{" "}
                  <Link className="underline" href={`/internal/regulations/${item.existingRegulationSlug}`}>
                    {item.existingRegulationSlug}
                  </Link>
                </p>
              ) : null}
            </Td>
            <Td>{item.geography}</Td>
            <Td className="text-xs">{item.triggerType.replaceAll("_", " ")}</Td>
            <Td className="text-xs">{item.triggerWindow}</Td>
            <Td className="text-xs">{item.serviceIntents}</Td>
            <Td>{item.researchScore}/100</Td>
            <Td><Badge>{item.tier} · UNVERIFIED</Badge></Td>
          </tr>
        ))}
      </Table>
    </>
  );
}
