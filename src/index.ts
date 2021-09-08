import express from 'express';
import path from 'path';
import helmet from 'helmet';
import cors from 'cors';
import 'express-async-errors';
import  cron from 'node-cron';
import { config } from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import routes from './routes';

import swaggerUI from 'swagger-ui-express';
import swaggerSpecs from './config/swagger/swaggerSpecs';
import swaggerUiOpt from './config/swagger/swaggerUI';

import bancoRates from './lib/schedules/bancoRates';
import errorHandler from './validations/handler/handler';


dotenvExpand(config());

const app = express();

app.use(cors());

app.use(helmet());
app.use(express.json()); 

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs, swaggerUiOpt));

cron.schedule('0 8 * * *', () => {
  
  bancoRates();

  }, {
    timezone: 'Africa/Harare'
  }
);

app.use('/api/v1', routes);

app.use('/files', express.static(path.join(__dirname, '..', 'files')));
app.use('/files/inflation', express.static(path.join(__dirname, '..', 'files', 'inflation')));
app.use('/files/currencies', express.static(path.join(__dirname, '..', 'files', 'currencies')));

app.use(errorHandler);

app.listen(process.env.HTTP_PORT || 3002);
