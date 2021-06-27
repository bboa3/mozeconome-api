import { PrismaClient } from "@prisma/client"

interface RatesInfo {
  ratesId: string
  date: Date
}

const prisma = new PrismaClient();

const saveRatesInfo = async ({ ratesId, date }: RatesInfo) => {

  return await prisma.info.create({

    data: {
      rates_id: ratesId,
      date
    }
  })
}

export default saveRatesInfo;