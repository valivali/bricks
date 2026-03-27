-- CreateTable
CREATE TABLE "field_images" (
    "id" TEXT NOT NULL,
    "structureId" TEXT NOT NULL,
    "fieldName" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "field_images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "field_images" ADD CONSTRAINT "field_images_structureId_fkey" FOREIGN KEY ("structureId") REFERENCES "structure_ids"("id") ON DELETE CASCADE ON UPDATE CASCADE;
