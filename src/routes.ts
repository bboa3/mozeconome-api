import { Router } from 'express';
import multer from 'multer';
import extractRatesController from './controller/extractRatesController';
import inflectionController from './controller/inflectionController';
import exchangeRatesController from './controller/exchangeRatesController';

import inflectionFileConfig from './config/inflectionFile';

const routes = Router(); 
const inflectionFile = multer(inflectionFileConfig);

routes.get('/rates/:iso_4217', exchangeRatesController.index);
routes.get('/rates/:iso_4217/:take', exchangeRatesController.list);

routes.get('/banco-rates', extractRatesController.index); // Need authentication to be used
routes.post('/inflection/save', inflectionFile.single('file'), inflectionController.create); // Need authentication to be used

export default routes;  