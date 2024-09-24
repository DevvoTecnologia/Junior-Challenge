/*
  Warnings:

  - You are about to drop the column `forjadorId` on the `anel` table. All the data in the column will be lost.
  - You are about to drop the `forjador` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "anel" DROP CONSTRAINT "anel_forjadorId_fkey";

-- AlterTable
ALTER TABLE "anel" DROP COLUMN "forjadorId";

-- DropTable
DROP TABLE "forjador";
