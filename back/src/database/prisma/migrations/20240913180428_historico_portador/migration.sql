-- CreateTable
CREATE TABLE "historicoPortador" (
    "portadorId" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "anelId" TEXT NOT NULL,

    CONSTRAINT "historicoPortador_pkey" PRIMARY KEY ("portadorId","anelId")
);
