import { Router } from 'express';
import multer from 'multer';
import extractRatesController from './controller/extractRatesController';
import inflationController from './controller/inflationController';
import exchangeRatesController from './controller/exchangeRatesController';
import inflationRatesController from './controller/inflationRatesController';
import exchangeRatesAvailableController from './controller/exchangeRatesAvailableController';

import inflationFileConfig from './config/inflationFile';

const routes = Router(); 
const inflationFile = multer(inflationFileConfig);

routes.get('/iso_4217', exchangeRatesAvailableController.index);  // only valid while using https://www.bancomoc.mz/ for exchange rates

routes.get('/exchange/:iso_4217', exchangeRatesController.index);
routes.get('/exchange/:iso_4217/:take', exchangeRatesController.list);

routes.get('/inflation/:loc', inflationRatesController.index);

routes.get('/banco-rates', extractRatesController.index); // Need authentication to be used
routes.post('/inflation/save', inflationFile.single('file'), inflationController.create); // Need authentication to be used

export default routes;