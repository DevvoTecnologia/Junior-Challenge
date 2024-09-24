/*
  Warnings:

  - You are about to drop the `customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reading` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "image" DROP CONSTRAINT "image_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "reading" DROP CONSTRAINT "reading_customer_id_fkey";

-- DropTable
DROP TABLE "customer";

-- DropTable
DROP TABLE "image";

-- DropTable
DROP TABLE "reading";
