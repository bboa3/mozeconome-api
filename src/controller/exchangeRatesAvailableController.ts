import { Request, Response } from 'express';
import exchangeRatesValidator from '../validations/exchangeRates';
import { resolve } from 'path';
import fs from 'fs';

const currenciesPath = resolve(__dirname, '..', 'entity', 'currencies', 'currencies.json');

export default {
  async index(request: Request, response: Response) { 
    const { iso_4217 } = request.params;

    await exchangeRatesValidator.iso(iso_4217);

    fs.readFile(currenciesPath, 'utf8', (err, file) => {
      if(err) return console.log(err);

      const currencies = JSON.parse(file);

      const currency = currencies[iso_4217];

      if(!currency) 
      return response.status(404).json({error: 'Currency not found'})

      response.status(200).json(currency);
    })
  },

  async list(request: Request, response: Response) { 

    fs.readFile(currenciesPath, 'utf8', (err, file) => {
      if(err) return console.log(err);

      const currencies = JSON.parse(file);

      const keys = Object.keys(currencies);

      response.status(200).json(keys);
    })
  }
}