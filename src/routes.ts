import { Router } from 'express';
import extractRatesController from './controller/extractRatesController';


const routes = Router(); 

routes.get('/', extractRatesController.index);

export default routes;  