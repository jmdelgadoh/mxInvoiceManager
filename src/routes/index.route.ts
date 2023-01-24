import {Router, Request, Response} from 'express';
import requireUser from '../middleware/requireUser';
import { createSessionHandler, deleteSessionsHandler, getUserSessionsHandler } from '../controller/session.controller';
import { createUserHandler } from '../controller/user.controller';
import validateResource from '../middleware/validateResource';
import { createSessionSchema } from '../schema/session.schema';
import { createUserSchema } from '../schema/user.schema';
import productRouter from './products.route';
import invoiceRouter from "./invoice.route";


const appRouter = Router();
appRouter.use('/api/products', productRouter)
appRouter.use('/api/invoice', invoiceRouter)

appRouter.get('/healthcheck', 
(req : Request , res : Response)=>res.sendStatus(200));

appRouter.post('/api/users', validateResource(createUserSchema), createUserHandler)
appRouter.post('/api/sessions', validateResource(createSessionSchema), createSessionHandler)
appRouter.get('/api/sessions', requireUser, getUserSessionsHandler);
appRouter.delete('/api/sessions', requireUser, deleteSessionsHandler)
export default appRouter;