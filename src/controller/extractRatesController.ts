import { Request, Response } from 'express';
import bancomocRates from '../lib/schedules/bancoRates';


export default {
  async index(request: Request, response: Response) { 
    bancomocRates();

    response.send('Done');
  }
}