import { PrismaClient } from "@prisma/client";
import saveRatesInfo from "./saveRatesInfo";

export type Rates = {
  buy: number
  sale: number
  medium: number
  iso_4217: string
}

export interface ExchangeRates {
  ratesId: string
  date: Date
  rates: Rates[]
}

const prisma = new PrismaClient();

const saveExchangeRates = async ({ratesId, date, rates}: ExchangeRates) => {

  const newExchangeRatesInfo = await saveRatesInfo({
    ratesId,
    date
  })

  const exchangeRates = rates.map(rate => {
    return {
      ...rate,
      info_id: newExchangeRatesInfo.rates_id
    }
  })

  prisma.rates.createMany({
    data: exchangeRates
  })
  .then(re => console.log(re))
  .catch(err => console.log(err))
}


export default saveExchangeRates;