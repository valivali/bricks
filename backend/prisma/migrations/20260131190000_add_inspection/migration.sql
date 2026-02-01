-- CreateTable
CREATE TABLE "inspections" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "lastUpdated" TIMESTAMP(3),
    "structureType" TEXT NOT NULL,
    "generalDescription" TEXT,
    "inspectionType" TEXT,
    "companyName" TEXT,
    "inspectorName" TEXT,
    "structureNumber" TEXT,
    "structureName" TEXT,
    "structureMarking" TEXT,
    "roadNumber" TEXT,
    "runningDistance" TEXT,
    "area" TEXT,
    "fullStructureIncluded" BOOLEAN NOT NULL DEFAULT true,
    "fullStructureNotes" TEXT,
    "spanCount" INTEGER,
    "spanCountNotes" TEXT,
    "adjacentStructures" INTEGER,
    "adjacentStructuresNotes" TEXT,
    "siteRestrictions" TEXT,
    "inspectionDate" TIMESTAMP(3),
    "nextInspectionType" TEXT,
    "nextInspectionDate" TIMESTAMP(3),
    "classificationForInspection" TEXT,
    "coordinateNorth" DOUBLE PRECISION,
    "coordinateEast" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inspections_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "inspections" ADD CONSTRAINT "inspections_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
