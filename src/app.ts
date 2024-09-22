import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from Bee-Hive server!')
  });

export default app;