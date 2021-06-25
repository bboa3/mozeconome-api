import { Router } from 'express';
import multer from 'multer';

import verifyClientInfo from './auth/client/verifyClientInfo';
import verifyCompanyInfo from './auth/client/verifyCompanyInfo';
import clientController from './controller/client/clientsController';

import helpController from './controller/help/helpController';
import helpValidator from './controller/help/helpValidator';

import provincesController from './controller/provinces/provincesController';

import rolesController from './controller/team/rolesController';
import teamController from './controller/team/teamController';
import teamValidator from './controller/team/TeamValidator';
import cvUploadConfig from './config/pdf';

const routes = Router(); 
const cvUpload = multer(cvUploadConfig);


routes.get('/provinces', provincesController.index);
routes.get('/roles', rolesController.index);


routes.post('/client', verifyClientInfo, verifyCompanyInfo, clientController.create);

routes.post('/team', cvUpload.single('cv'), teamValidator, teamController.create);
routes.post('/help', helpValidator, helpController.index);


export default routes;  