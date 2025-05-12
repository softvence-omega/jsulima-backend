/*
  Warnings:

  - You are about to drop the column `company` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "company",
ADD COLUMN     "country" TEXT;

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "features" TEXT[];
