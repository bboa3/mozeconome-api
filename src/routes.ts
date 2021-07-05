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

/**
 * @swagger
 * tags:
 *  name: ExchangeRates
 *  description: This is for exchange rates
 * /api/v1/iso_4217: 
 *  get: 
 *    tags: [ExchangeRates]
 *    summary: Get all iso_4217 list
 *    responses:
 *      '200':
 *        description: Give you back the list of all currency ISO_4217 the API is already in a position to return exchange rates. So far are 18 currencies.
 *        content: 
 *          application/json:
 *            schema: 
 *              type: array
 *              items:
 *                type: string
 */
routes.get('/iso_4217', exchangeRatesAvailableController.list);

/**
 * @swagger
 * /api/v1/{iso_4217}: 
 *  get: 
 *    tags: [ExchangeRates]
 *    summary: Get currency information
 *    parameters: 
 *      - name: iso_4217
 *        in: params
 *        
 *    responses:
 *      '200':
 *        description: Receives iso_4217 as a parameter. returns information such as notes, coins, country, units, and more of the currency
 *        content: 
 *          application/json:
 *            schema: 
 *              type: object
 *              items:
 *                type: string
 */
routes.get('/currency/:iso_4217', exchangeRatesAvailableController.index);

routes.get('/exchange/:iso_4217', exchangeRatesController.index);
routes.get('/exchange/:iso_4217/:take', exchangeRatesController.list);

routes.get('/inflation/:loc', inflationRatesController.index);

routes.get('/banco-rates', extractRatesController.index); // Need authentication to be used
routes.post('/inflation/save', inflationFile.single('file'), inflationController.create); // Need authentication to be used

export default routes;