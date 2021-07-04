import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

const findISO_4217 = async () => {
  return await prisma.info.findFirst({
    
    orderBy: {
      created_at: 'desc'
    },

    select: {
      rates: {
        select: {
          iso_4217: true
        }
      }
    }
  })
}


export default findISO_4217;