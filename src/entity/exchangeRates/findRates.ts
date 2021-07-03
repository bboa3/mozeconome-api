import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const findRates = async (iso_4217: string) => {
  return await prisma.rates.findFirst({
    where: { iso_4217 },
    orderBy: {
      id: 'desc'
    },
    include: {
      info: true
    }
  })
}

export default findRates;