import { Router } from 'express';
import extractRatesController from './controller/extractRatesController';

const routes = Router(); 


routes.get('/trigger/bancomocRates', extractRatesController.index); // Need authentication to be used

export default routes;  