/*
  Warnings:

  - You are about to alter the column `buy` on the `rates` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(6,2)`.
  - You are about to alter the column `sale` on the `rates` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(6,2)`.
  - You are about to alter the column `medium` on the `rates` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(6,2)`.

*/
-- AlterTable
ALTER TABLE "rates" ALTER COLUMN "buy" SET DATA TYPE DECIMAL(6,2),
ALTER COLUMN "sale" SET DATA TYPE DECIMAL(6,2),
ALTER COLUMN "medium" SET DATA TYPE DECIMAL(6,2);
