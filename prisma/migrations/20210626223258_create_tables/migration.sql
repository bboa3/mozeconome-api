-- CreateTable
CREATE TABLE "countries" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "currency_id" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "currencies" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "symbol_id" INTEGER NOT NULL,
    "iso_4217" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updaded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "currencies_symbols" (
    "id" SERIAL NOT NULL,
    "symbol" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exchanges" (
    "id" SERIAL NOT NULL,
    "buy" INTEGER NOT NULL,
    "sale" INTEGER NOT NULL,
    "medium" INTEGER NOT NULL,
    "currency_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "countries.name_unique" ON "countries"("name");

-- CreateIndex
CREATE UNIQUE INDEX "countries_currency_id_unique" ON "countries"("currency_id");

-- CreateIndex
CREATE UNIQUE INDEX "currencies.iso_4217_unique" ON "currencies"("iso_4217");

-- AddForeignKey
ALTER TABLE "countries" ADD FOREIGN KEY ("currency_id") REFERENCES "currencies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "currencies" ADD FOREIGN KEY ("symbol_id") REFERENCES "currencies_symbols"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exchanges" ADD FOREIGN KEY ("currency_id") REFERENCES "currencies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
