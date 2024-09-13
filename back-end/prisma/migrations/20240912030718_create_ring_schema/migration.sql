-- CreateTable
CREATE TABLE "Ring" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "power" TEXT NOT NULL,
    "bearer" TEXT NOT NULL,
    "forgedBy" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Ring_pkey" PRIMARY KEY ("id")
);
