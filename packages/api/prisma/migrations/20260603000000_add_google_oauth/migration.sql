-- AlterTable
ALTER TABLE "User"
  ALTER COLUMN "password" DROP NOT NULL,
  ADD COLUMN "googleId" TEXT,
  ADD COLUMN "name" TEXT,
  ADD COLUMN "avatarUrl" TEXT,
  ADD COLUMN "emailVerified" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");
