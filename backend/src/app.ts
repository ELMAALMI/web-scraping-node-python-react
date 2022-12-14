import express, { Express } from 'express';
import cors from 'cors';
import AppRouters from './routes';
import handleError from './middleware/error-middleware';
import { APP_CONF_VARIABLE } from './constant';

const app: Express = express();

app.use(express.urlencoded({ extended: true, limit: '1kb' }));
app.use(express.json({ limit: '10kb' }));
app.use(
    cors({
        origin: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    })
);
console.log(APP_CONF_VARIABLE.DB_URI)
app.use('/api/v1', AppRouters);
app.use(handleError);
export default app;
