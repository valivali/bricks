ALTER TABLE "structure_ids"
ADD COLUMN IF NOT EXISTS "localBypassMethodOther" TEXT;

ALTER TABLE "structure_ids"
ADD COLUMN IF NOT EXISTS "bypassDescriptionImage" TEXT;
