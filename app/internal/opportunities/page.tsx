import { Badge, DatabaseNotice, EntityLink, PageTitle, Table, Td } from "@/components/internal/ui";
import { isDatabaseConfigured } from "@/lib/db";
import {
  OPPORTUNITY_SCORE_DIMENSIONS,
  OPPORTUNITY_SCORE_LIMITS,
  OPPORTUNITY_SCORE_MAX,
} from "@/lib/scoring/opportunity-score";
import { listOpportunities } from "@/lib/services/opportunities";

export const dynamic = "force-dynamic";

const labels: Record<(typeof OPPORTUNITY_SCORE_DIMENSIONS)[number], string> = {
  regulatoryForceScore: "Reg",
  spendScore: "Spend",
  urgencyScore: "Urgency",
  searchIntentScore: "Search",
  monetizationScore: "Money",
  seoDefensibilityScore: "SEO",
  goldenWindowScore: "Window",
};

export default async function OpportunitiesPage() {
  if (!isDatabaseConfigured()) return <DatabaseNotice />;
  const opportunities = await listOpportunities();

  return (
    <>
      <PageTitle eyebrow="Property graph" title="Opportunities">
        Totals are computed by <code>calculateOpportunityScore()</code> and capped at {OPPORTUNITY_SCORE_MAX}.
      </PageTitle>
      <Table
        head={[
          "Opportunity",
          "Total",
          ...OPPORTUNITY_SCORE_DIMENSIONS.map((d) => `${labels[d]} /${OPPORTUNITY_SCORE_LIMITS[d]}`),
          "Status",
        ]}
      >
        {opportunities.map((opportunity) => (
          <tr key={opportunity.id}>
            <Td>
              <strong>{opportunity.name}</strong>
              <p className="text-xs text-muted">
                {[opportunity.location?.name, opportunity.propertyType?.name].filter(Boolean).join(" · ")}
              </p>
              {opportunity.regulation ? (
                <p className="text-xs">
                  <EntityLink href={`/internal/regulations/${opportunity.regulation.slug}`}>
                    {opportunity.regulation.name}
                  </EntityLink>
                </p>
              ) : null}
            </Td>
            <Td>
              <span className="font-display text-xl font-black">{opportunity.totalScore}</span>
            </Td>
            {OPPORTUNITY_SCORE_DIMENSIONS.map((dimension) => (
              <Td key={dimension} className="tabular-nums">
                {opportunity[dimension]}
              </Td>
            ))}
            <Td>
              <Badge>{opportunity.status}</Badge>
            </Td>
          </tr>
        ))}
      </Table>
    </>
  );
}
