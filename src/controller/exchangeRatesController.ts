import { Request, Response } from 'express';
import findRates from '../entity/exchangeRates/findRates';
import getRates from '../entity/exchangeRates/getRates';
import exchangeRatesViews from '../views/exchangeRatesViews';
import exchangeRatesValidator from '../validations/exchangeRates';

export default {
  async index(request: Request, response: Response) { 
    const { iso_4217 } = request.params;

    await exchangeRatesValidator.iso(iso_4217);

    const rates = await findRates(iso_4217);

    if(!rates)
    return response.status(404).json({error: 'Exchange rates not found'});

    response.send(exchangeRatesViews.render(rates));
  },

  async list(request: Request, response: Response) { 
    const { iso_4217, take } = request.params;

    await exchangeRatesValidator.iso(iso_4217);
    await exchangeRatesValidator.take(take);

    const rates = await getRates({
      iso_4217, 
      take: Number(take) 
    });

    if(!rates)
    return response.status(404).json({error: 'Exchange rates not found'});

    response.send(exchangeRatesViews.renderMany(rates));
  }
}