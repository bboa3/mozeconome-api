import { Request, Response } from 'express';
import findISO_4217 from '../entity/exchangeRates/findISO_4217';


export default {
  async index(request: Request, response: Response) { 

    const iso = await findISO_4217();

    if(!iso) 
    return response.status(404).json({error: 'No ISO_4217 found'});

    const iso_4217 = iso.rates.map(rate => rate.iso_4217);

    response.status(200).json(iso_4217);
  }
}