-- AlterTable
ALTER TABLE "inspections" ADD COLUMN     "structureId" TEXT;

-- CreateTable
CREATE TABLE "structure_components" (
    "id" TEXT NOT NULL,
    "structureId" TEXT NOT NULL,
    "componentCode" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "importanceLevel" TEXT NOT NULL,
    "basicMeasurementUnit" TEXT NOT NULL,
    "secondaryMeasurementUnit" TEXT,
    "quantity" INTEGER NOT NULL,
    "evaluationNeeded" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "comments" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "structure_components_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sub_components" (
    "id" TEXT NOT NULL,
    "componentId" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "basicQuantity" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "secondaryQuantity" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "comments" TEXT,
    "attachment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sub_components_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "inspections" ADD CONSTRAINT "inspections_structureId_fkey" FOREIGN KEY ("structureId") REFERENCES "structure_ids"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "structure_components" ADD CONSTRAINT "structure_components_structureId_fkey" FOREIGN KEY ("structureId") REFERENCES "structure_ids"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_components" ADD CONSTRAINT "sub_components_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "structure_components"("id") ON DELETE CASCADE ON UPDATE CASCADE;
