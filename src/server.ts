import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import config from './config';
import authRouter from './routers/auth-router';
import * as database from './services/database';

console.log('database ================================ ',database);
try {
  database.checkConnection((err) => {
    if (err) {
      throw new Error('\n---\nProblem connecting to database.\nYou probably forgot to create src/config/.env file\n---');
    }
    console.log('Connected to database');
    const server = express();

    // Middlewares
    server.use(express.json());
    server.use(morgan('tiny'));
    server.use(cors());

    // Routes
    server.use('/api/auth', authRouter);

    server.listen(config.server.port, () => {
      console.log(`Server ir running on ${config.server.url}`);
    });
  });
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error(error);
  }
}
