import express from 'express';
import path from 'path';
import helmet from 'helmet';
import cors from 'cors';
import 'express-async-errors';
import  cron from 'node-cron';
import { config } from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import routes from './routes';

import bancomocRates from './lib/schedules/bancomocRates';
import errorHandler from './validations/handler/handler';


dotenvExpand(config());

const app = express();

app.use(cors());


app.use(helmet());
app.use(express.json()); 

cron.schedule('0 8 * * *', () => {
  bancomocRates();
  }, {
    timezone: 'Africa/Harare'
  }
);

app.use('/api/v1', routes);

app.use('/files', express.static(path.join(__dirname, '..', 'files')));

app.use(errorHandler);

app.listen(process.env.HTTP_PORT || 3002);
