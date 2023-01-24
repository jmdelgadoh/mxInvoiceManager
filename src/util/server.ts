import express from 'express'
import { deserializeUser } from '../middleware/deserializeUser';
import appRouter from '../routes/index.route';
import cors from 'cors';
import config from 'config'
import cookieParser from 'cookie-parser'

function createServer(){
    const app = express();
    app.use(cors({
        origin: config.get('origin')
    }))
    app.use(cookieParser())
    app.use(express.json());
    app.use(deserializeUser);
    app.use(appRouter);

    return app;
}

export default createServer