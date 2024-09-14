/*
  Warnings:

  - You are about to drop the column `portadorId` on the `anel` table. All the data in the column will be lost.
  - The primary key for the `historicoPortador` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `portadorId` on the `historicoPortador` table. All the data in the column will be lost.
  - You are about to drop the `portador` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `portador` to the `historicoPortador` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "anel" DROP CONSTRAINT "anel_portadorId_fkey";

-- AlterTable
ALTER TABLE "anel" DROP COLUMN "portadorId",
ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "historicoPortador" DROP CONSTRAINT "historicoPortador_pkey",
DROP COLUMN "portadorId",
ADD COLUMN     "portador" TEXT NOT NULL,
ADD CONSTRAINT "historicoPortador_pkey" PRIMARY KEY ("anelId");

-- DropTable
DROP TABLE "portador";

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha_hash" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "anel" ADD CONSTRAINT "anel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
