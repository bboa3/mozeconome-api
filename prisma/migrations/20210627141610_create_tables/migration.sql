/*
  Warnings:

  - You are about to drop the `exchanges` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "exchanges";

-- CreateTable
CREATE TABLE "rates" (
    "id" TEXT NOT NULL,
    "buy" INTEGER NOT NULL,
    "sale" INTEGER NOT NULL,
    "medium" INTEGER NOT NULL,
    "iso_4217" TEXT NOT NULL,
    "info_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "info" (
    "rates_id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("rates_id")
);

-- AddForeignKey
ALTER TABLE "rates" ADD FOREIGN KEY ("info_id") REFERENCES "info"("rates_id") ON DELETE CASCADE ON UPDATE CASCADE;
