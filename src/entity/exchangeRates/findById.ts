import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import { resolve } from 'path';

const currenciesPath = resolve(__dirname, 'currencies.json');




const prisma = new PrismaClient();

const findById = async (id: string) => {  
  return await prisma.exchanges.findUnique({
    where: { id }
  })
}

export default findById;