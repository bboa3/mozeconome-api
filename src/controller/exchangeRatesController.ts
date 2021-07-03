import { Request, Response } from 'express';

export default {
  async index(request: Request, response: Response) { 

    response.send('Done');
  }
}