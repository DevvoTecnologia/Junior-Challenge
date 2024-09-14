/*
  Warnings:

  - The primary key for the `historicoPortador` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `historicoPortador` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "historicoPortador" DROP CONSTRAINT "historicoPortador_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "historicoPortador_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "historicoPortador" ADD CONSTRAINT "historicoPortador_anelId_fkey" FOREIGN KEY ("anelId") REFERENCES "anel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
