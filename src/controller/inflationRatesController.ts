import fs from 'fs';
import { resolve } from 'path';
import { Request, Response } from 'express';

import locValidator from '../validations/loc';


export default {
  async index(request: Request, response: Response) { 
    const { loc } = request.params;

    await locValidator.loc(loc);

    const path = resolve(__dirname, '..', 'entity', 'inflation', `${loc}.json`);

    fs.readFile(path, 'utf8', (err, file) => {
    if(err) return response.status(500).json(err);

      response.status(200).send(file);
    })
  },
}