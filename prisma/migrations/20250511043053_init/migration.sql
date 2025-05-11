/*
  Warnings:

  - Added the required column `price` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `planType` on the `Subscription` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PlanType" AS ENUM ('MONTHLY', 'YEARLY');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'CANCELLED', 'EXPIRED');

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "status" "SubscriptionStatus" NOT NULL DEFAULT 'ACTIVE',
DROP COLUMN "planType",
ADD COLUMN     "planType" "PlanType" NOT NULL;
