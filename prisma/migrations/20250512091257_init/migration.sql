/*
  Warnings:

  - You are about to drop the column `PhoneNumber` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "PhoneNumber",
ADD COLUMN     "phoneNumber" TEXT;
