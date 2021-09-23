import { Router } from 'express';
import multer from 'multer';
import extractRatesController from './controller/extractRatesController';
import totalInflationController from './controller/totalInflationController';
import productsInflationController from './controller/productsInflationController';
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
 * /api/v1/currency/MZN: 
 *  get: 
 *    tags: [ExchangeRates]
 *    summary: Get currency information
 *    parameters: 
 *      - name: iso_4217
 *        in: params
 *        schema: 
 *          type: string
 *    responses:
 *      '200':
 *        description: Receives `iso_4217` as a parameter. returns information such as notes, coins, country, units, and more of the currency
 *        content: 
 *          application/json:
 *            schema: 
 *              type: object
 *      '404': 
 *        content: 
 *          application/json:
 *            schema: 
 *              type: object
 *              properties: 
 *                error: 
 *                  type: string
 *                  default: Not found
 */
routes.get('/currency/:iso_4217', exchangeRatesAvailableController.index);

/**
 * @swagger
 * /api/v1/exchange/USD: 
 *  get: 
 *    tags: [ExchangeRates]
 *    summary: Exchange Rates for the current day
 *    parameters: 
 *      - name: iso_4217
 *        in: params
 *        schema: 
 *          type: string
 *    responses:
 *      '200':
 *        description: This endpoint receives `iso_4217` as a parameter to return exchange rates for the current day
 *        content: 
 *          application/json:
 *            schema: 
 *              type: object
 *      '404': 
 *        content: 
 *          application/json:
 *            schema: 
 *              type: object
 *              properties: 
 *                error: 
 *                  type: string
 *                  default: Not found
 */
routes.get('/exchange/:iso_4217', exchangeRatesController.index);

/**
 * @swagger
 * /api/v1/exchange/USD/30: 
 *  get: 
 *    tags: [ExchangeRates]
 *    summary: Exchange rates of the last days
 *    parameters: 
 *      - name: iso_4217
 *      - name: take
 *        in: params
 *        schema: 
 *          type: string
 *    responses:
 *      '200':
 *        description: This endpoint returns you the exchange rates of the last number of days. The endpoint receives `iso_4217` and `take` which is the number of days passed that you want to be returned.
 *        content: 
 *          application/json:
 *            schema: 
 *              type: object
 *      '404': 
 *        content: 
 *          application/json:
 *            schema: 
 *              type: object
 *              properties: 
 *                error: 
 *                  type: string
 *                  default: Not found
 *                
 */
routes.get('/exchange/:iso_4217/:take', exchangeRatesController.list);

/**
 * @swagger
 * tags:
 *  name: InflationRates
 *  description: This is for inflation rates
 * /api/v1/inflation/maputo:
 *  get: 
 *    tags: [InflationRates]
 *    summary: Get province inflation rates
 *    parameters: 
 *      - name: loc
 *        in: params
 *        schema: 
 *          type: string
 *    responses:
 *      '200':
 *        description: Receive `loc` as its parameter. This endpoint gives you back monthly and homologous inflation history since 2016 for a specific province or national inflation. The arrays in the returned object contain 12 numbers, each number in an array belongs to a month (0=Jan, 1=Feb, 2=Mar, 3=Apr, 4=May, 5=Jun, 6=Jul, 7=Aug, 8=Sep, 9=Out, 10=Nov, 11=Dec)
 *        content: 
 *          application/json:
 *            schema: 
 *              type: object
 *      '500': 
 *        content: 
 *          application/json:
 *            schema: 
 *              type: object
 */
routes.get('/inflation/:loc', inflationRatesController.index);

routes.get('/banco-rates', extractRatesController.index); // Need authentication
routes.post('/inflation/total', inflationFile.single('file'), totalInflationController.create); // Need authentication 
routes.post('/inflation/products', inflationFile.single('file'), productsInflationController.create); // Need authentication 

export default routes;