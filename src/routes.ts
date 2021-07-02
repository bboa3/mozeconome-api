import { Router } from 'express';
import extractRatesController from './controller/extractRatesController';
import inflectionController from './controller/inflectionController';

const routes = Router(); 


routes.get('/trigger/bancomocRates', extractRatesController.index); // Need authentication to be used
routes.get('/inflection/save', inflectionController.index); // Need authentication to be used

export default routes;  