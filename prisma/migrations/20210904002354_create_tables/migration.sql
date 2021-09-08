-- CreateTable
CREATE TABLE "rates" (
    "id" SERIAL NOT NULL,
    "buy" DECIMAL(6,2) NOT NULL,
    "sale" DECIMAL(6,2) NOT NULL,
    "medium" DECIMAL(6,2) NOT NULL,
    "iso_4217" TEXT NOT NULL,
    "info_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "info" (
    "rates_id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("rates_id")
);

-- AddForeignKey
ALTER TABLE "rates" ADD FOREIGN KEY ("info_id") REFERENCES "info"("rates_id") ON DELETE CASCADE ON UPDATE CASCADE;
