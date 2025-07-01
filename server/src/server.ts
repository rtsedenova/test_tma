import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';

import postRouter from './routes/posts.route';
import userRouter from './routes/users.route';

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
