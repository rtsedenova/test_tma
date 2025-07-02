import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';
dotenv.config();

import postRouter from './posts/posts.route';
import userRouter from './users/user.route';

const bot = new Telegraf(process.env.BOT_TOKEN!);

export const startServer = () => {
  const app = express();
  const port = 3000;

  app.use(helmet({ crossOriginResourcePolicy: false })); 
  app.use(cors({ origin: '*' }));  
  app.use(morgan('dev'));        
  app.use(express.json());        

  app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

  app.use('/api/posts', postRouter);
  app.use('/api/users', userRouter);

  app.use(bot.webhookCallback('/bot'));

  app.get('/', (_req, res) => {
    res.send('Bot and server are running');
  });
  
  app.use((_req, res) => {
    res.status(404).json({ error: 'Not found' });
  });

  app.use((err: Error, _req: express.Request, res: express.Response) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  });


  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
};
