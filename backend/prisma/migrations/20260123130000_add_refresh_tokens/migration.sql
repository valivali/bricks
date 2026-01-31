-- Add refresh token storage
ALTER TABLE "users"
ADD COLUMN "refreshTokenHash" TEXT,
ADD COLUMN "refreshTokenExpiry" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "users_refreshTokenHash_key" ON "users"("refreshTokenHash");
