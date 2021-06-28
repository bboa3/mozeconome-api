import { Request, Response } from 'express';
import bancomocRates from '../lib/schedules/bancomocRates';


export default {
  async index(request: Request, response: Response) { 
    bancomocRates();

    response.send('Done');
  }
}