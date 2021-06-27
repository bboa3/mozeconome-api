/*
  Warnings:

  - You are about to drop the column `currency_id` on the `exchanges` table. All the data in the column will be lost.
  - You are about to drop the `countries` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `currencies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `currencies_symbols` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `iso_4217` to the `exchanges` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "countries" DROP CONSTRAINT "countries_currency_id_fkey";

-- DropForeignKey
ALTER TABLE "currencies" DROP CONSTRAINT "currencies_symbol_id_fkey";

-- DropForeignKey
ALTER TABLE "exchanges" DROP CONSTRAINT "exchanges_currency_id_fkey";

-- AlterTable
ALTER TABLE "exchanges" DROP COLUMN "currency_id",
ADD COLUMN     "iso_4217" TEXT NOT NULL;

-- DropTable
DROP TABLE "countries";

-- DropTable
DROP TABLE "currencies";

-- DropTable
DROP TABLE "currencies_symbols";
