-- CreateTable
CREATE TABLE "portador" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha_hash" TEXT NOT NULL,

    CONSTRAINT "portador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "anel" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "poder" TEXT NOT NULL,
    "portador" TEXT NOT NULL,
    "forjadoPor" TEXT NOT NULL,
    "imagem" TEXT NOT NULL,
    "portadorId" TEXT,
    "forjadorId" TEXT NOT NULL,

    CONSTRAINT "anel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "forjador" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "forjaMax" INTEGER NOT NULL,

    CONSTRAINT "forjador_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "portador_email_key" ON "portador"("email");

-- AddForeignKey
ALTER TABLE "anel" ADD CONSTRAINT "anel_portadorId_fkey" FOREIGN KEY ("portadorId") REFERENCES "portador"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anel" ADD CONSTRAINT "anel_forjadorId_fkey" FOREIGN KEY ("forjadorId") REFERENCES "forjador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
