-- AlterTable
ALTER TABLE "structure_ids" ADD COLUMN     "inspectionCompany" VARCHAR(200),
ADD COLUMN     "inspectionStatus" VARCHAR(50),
ADD COLUMN     "inspectionType" VARCHAR(50),
ADD COLUMN     "inspector" VARCHAR(200),
ADD COLUMN     "inventoryComponentName" VARCHAR(200),
ADD COLUMN     "plannedInspectionDate" TIMESTAMP(3),
ADD COLUMN     "structureDetailType" VARCHAR(50),
ADD COLUMN     "structureSubType" VARCHAR(50),
ADD COLUMN     "structureType" VARCHAR(50);
