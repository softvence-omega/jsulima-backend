/*
  Warnings:

  - The values [CANCELLED,EXPIRED] on the enum `PlanStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `endDate` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Plan` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PlanStatus_new" AS ENUM ('ACTIVE', 'INACTIVE');
ALTER TABLE "Plan" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Plan" ALTER COLUMN "status" TYPE "PlanStatus_new" USING ("status"::text::"PlanStatus_new");
ALTER TYPE "PlanStatus" RENAME TO "PlanStatus_old";
ALTER TYPE "PlanStatus_new" RENAME TO "PlanStatus";
DROP TYPE "PlanStatus_old";
ALTER TABLE "Plan" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
COMMIT;

-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "endDate",
DROP COLUMN "isActive";
