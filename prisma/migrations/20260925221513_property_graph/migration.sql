-- CreateEnum
CREATE TYPE "LocationType" AS ENUM ('COUNTRY', 'STATE', 'COUNTY', 'CITY', 'ZIP', 'MARKET', 'DISTRICT', 'SPECIAL_JURISDICTION');

-- CreateEnum
CREATE TYPE "PropertyClass" AS ENUM ('RESIDENTIAL', 'MULTIFAMILY', 'COMMERCIAL', 'MIXED');

-- CreateEnum
CREATE TYPE "RegulationStatus" AS ENUM ('ACTIVE', 'UPCOMING', 'PROPOSED', 'SUPERSEDED', 'EXPIRED', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "SourceType" AS ENUM ('FEDERAL', 'STATE', 'COUNTY', 'CITY', 'AGENCY', 'UTILITY', 'STANDARD_BODY', 'INDUSTRY', 'OTHER');

-- CreateEnum
CREATE TYPE "ContentStatus" AS ENUM ('DRAFT', 'RESEARCH', 'SOURCE_VERIFIED', 'PUBLISHED', 'NEEDS_REVIEW', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "SearchIntent" AS ENUM ('INFORMATIONAL', 'APPLICABILITY', 'REGULATION', 'DEADLINE', 'COST', 'INSPECTION', 'REPAIR', 'CONTRACTOR', 'TRANSACTION', 'FINANCING');

-- CreateEnum
CREATE TYPE "CostConfidence" AS ENUM ('VERIFIED_MARKET_RANGE', 'MODELED_ESTIMATE', 'INSUFFICIENT_DATA');

-- CreateEnum
CREATE TYPE "CostUnit" AS ENUM ('PROJECT', 'PER_SQFT', 'PER_UNIT', 'PER_FIXTURE', 'PER_LINEAR_FOOT', 'PER_SYSTEM');

-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('VERIFIED', 'NEEDS_REVIEW', 'SOURCE_CHANGED', 'STALE', 'UNVERIFIED');

-- CreateEnum
CREATE TYPE "DeadlineStatus" AS ENUM ('ACTIVE', 'UPCOMING', 'PASSED', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "OpportunityStatus" AS ENUM ('WATCH', 'RESEARCH', 'VALIDATED', 'INCUBATION_CANDIDATE', 'PAUSED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "ContentPageType" AS ENUM ('REGULATION', 'PROBLEM', 'COST', 'DEADLINE', 'LOCATION', 'TOOL', 'GUIDE');

-- CreateEnum
CREATE TYPE "ProfessionalRelationshipType" AS ENUM ('INSPECTS', 'DESIGNS', 'REPAIRS', 'REPLACES', 'PERMITS', 'VERIFIES', 'CONSULTS');

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" "LocationType" NOT NULL,
    "stateCode" VARCHAR(2),
    "parentId" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "fips" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "class" "PropertyClass" NOT NULL,
    "description" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PropertyType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProblemCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "commercialIntentLevel" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProblemCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Problem" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "description" TEXT,
    "defaultSeverity" INTEGER,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Problem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Regulation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "jurisdictionLevel" "LocationType" NOT NULL,
    "issuingAuthority" TEXT NOT NULL,
    "status" "RegulationStatus" NOT NULL,
    "effectiveDate" TIMESTAMP(3),
    "nextDeadline" TIMESTAMP(3),
    "recurrence" TEXT,
    "mandatory" BOOLEAN NOT NULL DEFAULT false,
    "inspectionRequired" BOOLEAN NOT NULL DEFAULT false,
    "repairRequired" BOOLEAN NOT NULL DEFAULT false,
    "permitRequired" BOOLEAN NOT NULL DEFAULT false,
    "penaltyPossible" BOOLEAN NOT NULL DEFAULT false,
    "transactionRelevant" BOOLEAN NOT NULL DEFAULT false,
    "sourceConfidence" "VerificationStatus",
    "lastVerifiedAt" TIMESTAMP(3),
    "active" BOOLEAN NOT NULL DEFAULT true,
    "applicabilitySummary" TEXT,
    "requirementsSummary" TEXT,
    "exemptionsSummary" TEXT,
    "penaltySummary" TEXT,
    "transactionImpactSummary" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Regulation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegulationLocation" (
    "id" TEXT NOT NULL,
    "regulationId" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "scopeNotes" TEXT,

    CONSTRAINT "RegulationLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegulationPropertyType" (
    "id" TEXT NOT NULL,
    "regulationId" TEXT NOT NULL,
    "propertyTypeId" TEXT NOT NULL,
    "applicabilityNotes" TEXT,

    CONSTRAINT "RegulationPropertyType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Source" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "publisher" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "sourceType" "SourceType" NOT NULL,
    "publishedAt" TIMESTAMP(3),
    "accessedAt" TIMESTAMP(3) NOT NULL,
    "lastVerifiedAt" TIMESTAMP(3),
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Source_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegulationSource" (
    "id" TEXT NOT NULL,
    "regulationId" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,
    "isPrimaryForRegulation" BOOLEAN NOT NULL DEFAULT false,
    "claimScope" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RegulationSource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deadline" (
    "id" TEXT NOT NULL,
    "regulationId" TEXT NOT NULL,
    "locationId" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "deadlineDate" TIMESTAMP(3),
    "status" "DeadlineStatus" NOT NULL,
    "recurrence" TEXT,
    "propertyScope" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Deadline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CostModel" (
    "id" TEXT NOT NULL,
    "problemId" TEXT,
    "regulationId" TEXT,
    "locationId" TEXT,
    "propertyTypeId" TEXT,
    "lowEstimate" DECIMAL(12,2),
    "midEstimate" DECIMAL(12,2),
    "highEstimate" DECIMAL(12,2),
    "currency" VARCHAR(3) NOT NULL DEFAULT 'USD',
    "unit" "CostUnit" NOT NULL,
    "confidence" "CostConfidence" NOT NULL,
    "methodology" TEXT NOT NULL,
    "sourceNotes" TEXT,
    "lastUpdatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CostModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfessionalType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProfessionalType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProblemProfessional" (
    "id" TEXT NOT NULL,
    "problemId" TEXT NOT NULL,
    "professionalTypeId" TEXT NOT NULL,
    "relationshipType" "ProfessionalRelationshipType" NOT NULL,
    "priority" INTEGER NOT NULL,
    "notes" TEXT,

    CONSTRAINT "ProblemProfessional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProblemPropertyType" (
    "id" TEXT NOT NULL,
    "problemId" TEXT NOT NULL,
    "propertyTypeId" TEXT NOT NULL,
    "relevance" INTEGER NOT NULL,
    "notes" TEXT,

    CONSTRAINT "ProblemPropertyType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentPage" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "fullPath" TEXT NOT NULL,
    "pageType" "ContentPageType" NOT NULL,
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "primaryIntent" "SearchIntent" NOT NULL,
    "primaryKeyword" TEXT,
    "secondaryKeywords" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "quickAnswer" TEXT,
    "problemId" TEXT,
    "regulationId" TEXT,
    "locationId" TEXT,
    "propertyTypeId" TEXT,
    "lastVerifiedAt" TIMESTAMP(3),
    "indexable" BOOLEAN NOT NULL DEFAULT false,
    "canonicalPath" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "publishedAt" TIMESTAMP(3),

    CONSTRAINT "ContentPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationEvent" (
    "id" TEXT NOT NULL,
    "regulationId" TEXT NOT NULL,
    "verifiedAt" TIMESTAMP(3) NOT NULL,
    "verifiedBy" TEXT NOT NULL,
    "status" "VerificationStatus" NOT NULL,
    "notes" TEXT,
    "sourceChanged" BOOLEAN NOT NULL DEFAULT false,
    "deadlineChanged" BOOLEAN NOT NULL DEFAULT false,
    "requirementsChanged" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VerificationEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpportunityScore" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "locationId" TEXT,
    "problemId" TEXT,
    "regulationId" TEXT,
    "propertyTypeId" TEXT,
    "regulatoryForceScore" INTEGER NOT NULL,
    "spendScore" INTEGER NOT NULL,
    "urgencyScore" INTEGER NOT NULL,
    "searchIntentScore" INTEGER NOT NULL,
    "monetizationScore" INTEGER NOT NULL,
    "seoDefensibilityScore" INTEGER NOT NULL,
    "goldenWindowScore" INTEGER NOT NULL,
    "totalScore" INTEGER NOT NULL,
    "status" "OpportunityStatus" NOT NULL DEFAULT 'WATCH',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OpportunityScore_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Location_type_idx" ON "Location"("type");

-- CreateIndex
CREATE INDEX "Location_stateCode_idx" ON "Location"("stateCode");

-- CreateIndex
CREATE UNIQUE INDEX "Location_parentId_slug_type_key" ON "Location"("parentId", "slug", "type");

-- CreateIndex
CREATE UNIQUE INDEX "PropertyType_slug_key" ON "PropertyType"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ProblemCategory_slug_key" ON "ProblemCategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Problem_slug_key" ON "Problem"("slug");

-- CreateIndex
CREATE INDEX "Problem_categoryId_idx" ON "Problem"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Regulation_slug_key" ON "Regulation"("slug");

-- CreateIndex
CREATE INDEX "Regulation_status_idx" ON "Regulation"("status");

-- CreateIndex
CREATE INDEX "Regulation_jurisdictionLevel_idx" ON "Regulation"("jurisdictionLevel");

-- CreateIndex
CREATE INDEX "Regulation_nextDeadline_idx" ON "Regulation"("nextDeadline");

-- CreateIndex
CREATE INDEX "RegulationLocation_locationId_idx" ON "RegulationLocation"("locationId");

-- CreateIndex
CREATE UNIQUE INDEX "RegulationLocation_regulationId_locationId_key" ON "RegulationLocation"("regulationId", "locationId");

-- CreateIndex
CREATE INDEX "RegulationPropertyType_propertyTypeId_idx" ON "RegulationPropertyType"("propertyTypeId");

-- CreateIndex
CREATE UNIQUE INDEX "RegulationPropertyType_regulationId_propertyTypeId_key" ON "RegulationPropertyType"("regulationId", "propertyTypeId");

-- CreateIndex
CREATE UNIQUE INDEX "Source_url_key" ON "Source"("url");

-- CreateIndex
CREATE INDEX "RegulationSource_sourceId_idx" ON "RegulationSource"("sourceId");

-- CreateIndex
CREATE UNIQUE INDEX "RegulationSource_regulationId_sourceId_key" ON "RegulationSource"("regulationId", "sourceId");

-- CreateIndex
CREATE INDEX "Deadline_deadlineDate_idx" ON "Deadline"("deadlineDate");

-- CreateIndex
CREATE INDEX "Deadline_locationId_idx" ON "Deadline"("locationId");

-- CreateIndex
CREATE UNIQUE INDEX "Deadline_regulationId_name_key" ON "Deadline"("regulationId", "name");

-- CreateIndex
CREATE INDEX "CostModel_problemId_idx" ON "CostModel"("problemId");

-- CreateIndex
CREATE INDEX "CostModel_regulationId_idx" ON "CostModel"("regulationId");

-- CreateIndex
CREATE INDEX "CostModel_locationId_idx" ON "CostModel"("locationId");

-- CreateIndex
CREATE INDEX "CostModel_propertyTypeId_idx" ON "CostModel"("propertyTypeId");

-- CreateIndex
CREATE UNIQUE INDEX "ProfessionalType_slug_key" ON "ProfessionalType"("slug");

-- CreateIndex
CREATE INDEX "ProblemProfessional_professionalTypeId_idx" ON "ProblemProfessional"("professionalTypeId");

-- CreateIndex
CREATE UNIQUE INDEX "ProblemProfessional_problemId_professionalTypeId_relationsh_key" ON "ProblemProfessional"("problemId", "professionalTypeId", "relationshipType");

-- CreateIndex
CREATE INDEX "ProblemPropertyType_propertyTypeId_idx" ON "ProblemPropertyType"("propertyTypeId");

-- CreateIndex
CREATE UNIQUE INDEX "ProblemPropertyType_problemId_propertyTypeId_key" ON "ProblemPropertyType"("problemId", "propertyTypeId");

-- CreateIndex
CREATE UNIQUE INDEX "ContentPage_fullPath_key" ON "ContentPage"("fullPath");

-- CreateIndex
CREATE INDEX "ContentPage_status_idx" ON "ContentPage"("status");

-- CreateIndex
CREATE INDEX "ContentPage_problemId_idx" ON "ContentPage"("problemId");

-- CreateIndex
CREATE INDEX "ContentPage_regulationId_idx" ON "ContentPage"("regulationId");

-- CreateIndex
CREATE INDEX "ContentPage_locationId_idx" ON "ContentPage"("locationId");

-- CreateIndex
CREATE INDEX "ContentPage_propertyTypeId_idx" ON "ContentPage"("propertyTypeId");

-- CreateIndex
CREATE INDEX "VerificationEvent_regulationId_verifiedAt_idx" ON "VerificationEvent"("regulationId", "verifiedAt");

-- CreateIndex
CREATE UNIQUE INDEX "OpportunityScore_slug_key" ON "OpportunityScore"("slug");

-- CreateIndex
CREATE INDEX "OpportunityScore_totalScore_idx" ON "OpportunityScore"("totalScore");

-- CreateIndex
CREATE INDEX "OpportunityScore_status_idx" ON "OpportunityScore"("status");

-- CreateIndex
CREATE INDEX "OpportunityScore_locationId_idx" ON "OpportunityScore"("locationId");

-- CreateIndex
CREATE INDEX "OpportunityScore_problemId_idx" ON "OpportunityScore"("problemId");

-- CreateIndex
CREATE INDEX "OpportunityScore_regulationId_idx" ON "OpportunityScore"("regulationId");

-- CreateIndex
CREATE INDEX "OpportunityScore_propertyTypeId_idx" ON "OpportunityScore"("propertyTypeId");

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Problem" ADD CONSTRAINT "Problem_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ProblemCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegulationLocation" ADD CONSTRAINT "RegulationLocation_regulationId_fkey" FOREIGN KEY ("regulationId") REFERENCES "Regulation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegulationLocation" ADD CONSTRAINT "RegulationLocation_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegulationPropertyType" ADD CONSTRAINT "RegulationPropertyType_regulationId_fkey" FOREIGN KEY ("regulationId") REFERENCES "Regulation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegulationPropertyType" ADD CONSTRAINT "RegulationPropertyType_propertyTypeId_fkey" FOREIGN KEY ("propertyTypeId") REFERENCES "PropertyType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegulationSource" ADD CONSTRAINT "RegulationSource_regulationId_fkey" FOREIGN KEY ("regulationId") REFERENCES "Regulation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegulationSource" ADD CONSTRAINT "RegulationSource_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deadline" ADD CONSTRAINT "Deadline_regulationId_fkey" FOREIGN KEY ("regulationId") REFERENCES "Regulation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deadline" ADD CONSTRAINT "Deadline_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CostModel" ADD CONSTRAINT "CostModel_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CostModel" ADD CONSTRAINT "CostModel_regulationId_fkey" FOREIGN KEY ("regulationId") REFERENCES "Regulation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CostModel" ADD CONSTRAINT "CostModel_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CostModel" ADD CONSTRAINT "CostModel_propertyTypeId_fkey" FOREIGN KEY ("propertyTypeId") REFERENCES "PropertyType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProblemProfessional" ADD CONSTRAINT "ProblemProfessional_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProblemProfessional" ADD CONSTRAINT "ProblemProfessional_professionalTypeId_fkey" FOREIGN KEY ("professionalTypeId") REFERENCES "ProfessionalType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProblemPropertyType" ADD CONSTRAINT "ProblemPropertyType_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProblemPropertyType" ADD CONSTRAINT "ProblemPropertyType_propertyTypeId_fkey" FOREIGN KEY ("propertyTypeId") REFERENCES "PropertyType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentPage" ADD CONSTRAINT "ContentPage_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentPage" ADD CONSTRAINT "ContentPage_regulationId_fkey" FOREIGN KEY ("regulationId") REFERENCES "Regulation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentPage" ADD CONSTRAINT "ContentPage_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentPage" ADD CONSTRAINT "ContentPage_propertyTypeId_fkey" FOREIGN KEY ("propertyTypeId") REFERENCES "PropertyType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerificationEvent" ADD CONSTRAINT "VerificationEvent_regulationId_fkey" FOREIGN KEY ("regulationId") REFERENCES "Regulation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpportunityScore" ADD CONSTRAINT "OpportunityScore_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpportunityScore" ADD CONSTRAINT "OpportunityScore_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpportunityScore" ADD CONSTRAINT "OpportunityScore_regulationId_fkey" FOREIGN KEY ("regulationId") REFERENCES "Regulation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpportunityScore" ADD CONSTRAINT "OpportunityScore_propertyTypeId_fkey" FOREIGN KEY ("propertyTypeId") REFERENCES "PropertyType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- ─── Integrity checks (not modeled by Prisma) ───────────────────────────────

ALTER TABLE "ProblemCategory"
  ADD CONSTRAINT "ProblemCategory_commercialIntentLevel_range"
  CHECK ("commercialIntentLevel" BETWEEN 1 AND 5);

ALTER TABLE "Problem"
  ADD CONSTRAINT "Problem_defaultSeverity_range"
  CHECK ("defaultSeverity" IS NULL OR "defaultSeverity" BETWEEN 1 AND 5);

ALTER TABLE "ProblemPropertyType"
  ADD CONSTRAINT "ProblemPropertyType_relevance_range"
  CHECK ("relevance" BETWEEN 1 AND 5);

ALTER TABLE "ProblemProfessional"
  ADD CONSTRAINT "ProblemProfessional_priority_positive"
  CHECK ("priority" >= 1);

ALTER TABLE "CostModel"
  ADD CONSTRAINT "CostModel_estimates_non_negative"
  CHECK (
    ("lowEstimate" IS NULL OR "lowEstimate" >= 0) AND
    ("midEstimate" IS NULL OR "midEstimate" >= 0) AND
    ("highEstimate" IS NULL OR "highEstimate" >= 0)
  ),
  ADD CONSTRAINT "CostModel_estimates_ordered"
  CHECK (
    ("lowEstimate" IS NULL OR "midEstimate" IS NULL OR "lowEstimate" <= "midEstimate") AND
    ("midEstimate" IS NULL OR "highEstimate" IS NULL OR "midEstimate" <= "highEstimate") AND
    ("lowEstimate" IS NULL OR "highEstimate" IS NULL OR "lowEstimate" <= "highEstimate")
  ),
  ADD CONSTRAINT "CostModel_insufficient_data_has_no_estimates"
  CHECK (
    "confidence" <> 'INSUFFICIENT_DATA' OR
    ("lowEstimate" IS NULL AND "midEstimate" IS NULL AND "highEstimate" IS NULL)
  );

ALTER TABLE "OpportunityScore"
  ADD CONSTRAINT "OpportunityScore_dimension_ranges"
  CHECK (
    "regulatoryForceScore"  BETWEEN 0 AND 20 AND
    "spendScore"            BETWEEN 0 AND 20 AND
    "urgencyScore"          BETWEEN 0 AND 15 AND
    "searchIntentScore"     BETWEEN 0 AND 15 AND
    "monetizationScore"     BETWEEN 0 AND 15 AND
    "seoDefensibilityScore" BETWEEN 0 AND 10 AND
    "goldenWindowScore"     BETWEEN 0 AND 5
  ),
  ADD CONSTRAINT "OpportunityScore_total_matches_dimensions"
  CHECK (
    "totalScore" = "regulatoryForceScore" + "spendScore" + "urgencyScore" +
                   "searchIntentScore" + "monetizationScore" +
                   "seoDefensibilityScore" + "goldenWindowScore"
  );

-- Root locations (parentId IS NULL) are not covered by the composite unique
-- index because Postgres treats NULLs as distinct.
CREATE UNIQUE INDEX "Location_root_slug_type_key"
  ON "Location" ("slug", "type") WHERE "parentId" IS NULL;
