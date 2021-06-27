import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

const findRatesInfo = async (ratesId: string) => {

  return await prisma.info.findUnique({
    where: { rates_id: ratesId }
  })

}

export default findRatesInfo;