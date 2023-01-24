import logger from "pino";
import dayjs from 'dayjs';

const log = logger({
    
    transport : {
        target: 'pino-pretty',
    },
    base: {
        pid: false, //process ID
        
    },
    // timestamp: () => `,"time":"${dayjs().format()}` 
    timestamp: () => `,"time":"${new Date(Date.now()).toISOString()}"`
    
})

export default log;