import mongoose from "mongoose";
import config from 'config';
import logger from './logger';

async function connectDB(){
    const dbUri = config.get<string>('dbUri');

    return mongoose.connect(dbUri)
    .then(()=>{
        logger.info('Connected to DB');
    }).catch(err => {
        logger.error('Failed at DB connection');
        process.exit(1);
    })
}

export default connectDB;