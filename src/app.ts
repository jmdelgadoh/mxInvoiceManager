import express from 'express';
import config from 'config'
import connectDB from './util/connectDB';
import logger from './util/logger';
import cors from 'cors'

import { deserializeUser } from './middleware/deserializeUser';
import createServer from './util/server';


const app = createServer();

const port = config.get<number>('port');

app.listen(port, async ()=>{
    logger.info(`Express listening on port ${port}`)
    await connectDB();
});

