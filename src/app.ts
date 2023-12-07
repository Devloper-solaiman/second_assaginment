import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { UsersRouters } from './app/modules/user/user.route';

const app: Application = express();

app.use(express.json());
app.use(cors());

const getAController = (req: Request, res: Response) => {
  res.send('standard server');
};
const getNotFound = (req: Request, res: Response) => {
  res.status(404).send({
    success: false,
    message: `Not found page`,
  });
};

app.use('/api/users', UsersRouters);
app.get('/', getAController);
app.all('*', getNotFound);

export default app;
