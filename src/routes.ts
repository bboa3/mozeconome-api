import { Router } from 'express';
import multer from 'multer';
import extractRatesController from './controller/extractRatesController';
import inflationController from './controller/inflationController';
import exchangeRatesController from './controller/exchangeRatesController';
import inflationRatesController from './controller/inflationRatesController';

import inflationFileConfig from './config/inflationFile';

const routes = Router(); 
const inflationFile = multer(inflationFileConfig);

routes.get('/exchange/:iso_4217', exchangeRatesController.index);
routes.get('/exchange/:iso_4217/:take', exchangeRatesController.list);

routes.get('/inflation/:loc', inflationRatesController.index);

routes.get('/banco-rates', extractRatesController.index); // Need authentication to be used
routes.post('/inflation/save', inflationFile.single('file'), inflationController.create); // Need authentication to be used

export default routes;  