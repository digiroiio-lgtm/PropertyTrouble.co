import {
  ContentPageType,
  ContentStatus,
  CostConfidence,
  CostUnit,
  LocationType,
  OpportunityStatus,
  SearchIntent,
  VerificationStatus,
} from "@prisma/client";
import { z } from "zod";
import { OPPORTUNITY_SCORE_LIMITS } from "@/lib/scoring/opportunity-score";

export const slugSchema = z
  .string()
  .min(1)
  .max(120)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "must be lowercase kebab-case");

export const pathSchema = z
  .string()
  .max(300)
  .regex(/^\/(?:[a-z0-9]+(?:-[a-z0-9]+)*\/?)*$/, "must be an absolute lowercase path like /florida/condo-inspections");

const optionalId = z.string().min(1).nullish();

export const locationInputSchema = z.object({
  name: z.string().min(1),
  slug: slugSchema,
  type: z.enum(LocationType),
  stateCode: z.string().length(2).toUpperCase().nullish(),
  parentId: optionalId,
  latitude: z.number().min(-90).max(90).nullish(),
  longitude: z.number().min(-180).max(180).nullish(),
  fips: z.string().regex(/^\d{2,5}$/).nullish(),
  active: z.boolean().default(true),
});
export type LocationInput = z.input<typeof locationInputSchema>;

const estimate = z.number().nonnegative().nullish();

export const costModelInputSchema = z.object({
  problemId: optionalId,
  regulationId: optionalId,
  locationId: optionalId,
  propertyTypeId: optionalId,
  lowEstimate: estimate,
  midEstimate: estimate,
  highEstimate: estimate,
  currency: z.string().length(3).toUpperCase().default("USD"),
  unit: z.enum(CostUnit),
  confidence: z.enum(CostConfidence),
  methodology: z.string().min(1),
  sourceNotes: z.string().nullish(),
  lastUpdatedAt: z.coerce.date().default(() => new Date()),
});
export type CostModelInput = z.input<typeof costModelInputSchema>;

const dimension = (max: number) => z.number().int().min(0).max(max);

export const opportunityScoreInputSchema = z
  .object({
    name: z.string().min(1),
    slug: slugSchema,
    locationId: optionalId,
    problemId: optionalId,
    regulationId: optionalId,
    propertyTypeId: optionalId,
    regulatoryForceScore: dimension(OPPORTUNITY_SCORE_LIMITS.regulatoryForceScore),
    spendScore: dimension(OPPORTUNITY_SCORE_LIMITS.spendScore),
    urgencyScore: dimension(OPPORTUNITY_SCORE_LIMITS.urgencyScore),
    searchIntentScore: dimension(OPPORTUNITY_SCORE_LIMITS.searchIntentScore),
    monetizationScore: dimension(OPPORTUNITY_SCORE_LIMITS.monetizationScore),
    seoDefensibilityScore: dimension(OPPORTUNITY_SCORE_LIMITS.seoDefensibilityScore),
    goldenWindowScore: dimension(OPPORTUNITY_SCORE_LIMITS.goldenWindowScore),
    status: z.enum(OpportunityStatus).default("WATCH"),
    notes: z.string().nullish(),
  })
  // A caller-supplied total is rejected outright rather than silently ignored.
  .strict();
export type OpportunityScoreInputData = z.input<typeof opportunityScoreInputSchema>;

export const contentPageInputSchema = z.object({
  title: z.string().min(1),
  slug: slugSchema,
  fullPath: pathSchema,
  pageType: z.enum(ContentPageType),
  status: z.enum(ContentStatus).default("DRAFT"),
  primaryIntent: z.enum(SearchIntent),
  primaryKeyword: z.string().nullish(),
  secondaryKeywords: z.array(z.string().min(1)).default([]),
  quickAnswer: z.string().nullish(),
  problemId: optionalId,
  regulationId: optionalId,
  locationId: optionalId,
  propertyTypeId: optionalId,
  lastVerifiedAt: z.coerce.date().nullish(),
  indexable: z.boolean().default(false),
  canonicalPath: pathSchema.nullish(),
  publishedAt: z.coerce.date().nullish(),
});
export type ContentPageInput = z.input<typeof contentPageInputSchema>;

export const verificationEventInputSchema = z.object({
  regulationId: z.string().min(1),
  verifiedAt: z.coerce.date().default(() => new Date()),
  verifiedBy: z.string().min(1),
  status: z.enum(VerificationStatus),
  notes: z.string().nullish(),
  sourceChanged: z.boolean().default(false),
  deadlineChanged: z.boolean().default(false),
  requirementsChanged: z.boolean().default(false),
});
export type VerificationEventInput = z.input<typeof verificationEventInputSchema>;
