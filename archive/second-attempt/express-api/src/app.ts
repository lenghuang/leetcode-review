import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

dotenv.config({ path: require('find-config')('.env') });

import version1 from './api/v1';
import version2 from './api/v2';
import MessageResponse from './interfaces/MessageResponse';
import * as middlewares from './middlewares';

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

app.use('/api/v1', version1);
app.use('/api/v2', version2);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
