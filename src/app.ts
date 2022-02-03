import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

import { router } from './routes/routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

app.use(router);

// liberar acesso das foto via rota
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')));
// http://localhost:3001/files/teste.jpg

export { app };
