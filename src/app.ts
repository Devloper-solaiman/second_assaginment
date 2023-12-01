import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { UsersRouters } from './app/modules/user/user.route';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/users', UsersRouters);

const getAController = (req: Request, res: Response) => {
  res.send('standard server');
};
app.get('/', getAController);

export default app;
