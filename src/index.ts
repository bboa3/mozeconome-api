import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import 'express-async-errors';
import { config } from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import routes from './routes';

import errorHandler from './validations/handler/handler';


dotenvExpand(config());

const app = express();

app.use(cors());


app.use(helmet());
app.use(express.json()); 

app.use('/api/v1', routes);

app.use(errorHandler);

app.listen(process.env.HTTP_PORT || 3002);
