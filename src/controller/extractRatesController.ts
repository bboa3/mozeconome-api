import { Request, Response } from 'express';
import bancoRates from '../lib/schedules/bancoRates';


export default {
  async index(request: Request, response: Response) { 
    bancoRates();

    response.send('Done');
  }
}