/*
  Warnings:

  - A unique constraint covering the columns `[customDomain]` on the table `Bio` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Bio" ADD COLUMN     "customDomain" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Bio_customDomain_key" ON "Bio"("customDomain");
