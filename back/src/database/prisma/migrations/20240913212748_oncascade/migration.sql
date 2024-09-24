-- DropForeignKey
ALTER TABLE "historicoPortador" DROP CONSTRAINT "historicoPortador_anelId_fkey";

-- AddForeignKey
ALTER TABLE "historicoPortador" ADD CONSTRAINT "historicoPortador_anelId_fkey" FOREIGN KEY ("anelId") REFERENCES "anel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
