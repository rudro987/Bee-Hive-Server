import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response, Router } from 'express';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));

app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Bee-Hive server!');
});

app.use(globalErrorHandler);

export default app;
