import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response, Router } from 'express';
import router from './app/routes';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));

app.use('/api', router)

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from Bee-Hive server!')
  });

export default app;