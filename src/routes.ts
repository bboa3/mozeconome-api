import { Router } from 'express';
import multer from 'multer';
import extractRatesController from './controller/extractRatesController';
import inflectionController from './controller/inflectionController';
import exchangeRatesController from './controller/exchangeRatesController';

import inflectionFileConfig from './config/inflectionFile';

const routes = Router(); 
const inflectionFile = multer(inflectionFileConfig);

routes.get('rates', exchangeRatesController.index);

routes.get('bancoRates', extractRatesController.index); // Need authentication to be used
routes.post('/inflection/save', inflectionFile.single('file'), inflectionController.index); // Need authentication to be used

export default routes;  