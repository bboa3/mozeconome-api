import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Props {
  iso_4217: string
  take: number
}

const getRates = async ({iso_4217, take}: Props) => {
  return await prisma.rates.findMany({
    where: { iso_4217 },
    take: take,
    orderBy: {
      id: 'desc'
    },
    include: {
      info: true
    }
  })
}

export default getRates;