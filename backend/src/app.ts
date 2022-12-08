import express, { Express } from 'express';
import cors from 'cors';
import AppRouters from './routes';
import scrapper from './scrapper';

const app: Express = express();

app.use(express.urlencoded({ extended: true, limit: '1kb' }));
app.use(express.json({ limit: '10kb' }));
app.use(
    cors({
        origin: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    })
);

app.use('/api/v1', AppRouters);
scrapper.start();

export default app;
