import { createProductHandler, deleteProductHandler, getProductHandler, updateProductHandler } from '../controller/product.controller';
import {Router, Request, Response} from 'express';
import { createProductSchema, deleteProductSchema, getProductSchema, updateProductSchema } from '../schema/product.schema';
import requireUser from '../middleware/requireUser';
import validateResource from '../middleware/validateResource';

const productRouter = Router();
productRouter.post('/', requireUser, validateResource(createProductSchema), createProductHandler)
productRouter.put('/:productId', requireUser, validateResource(updateProductSchema), updateProductHandler)
productRouter.get('/:productId', validateResource(getProductSchema), getProductHandler)
productRouter.delete('/:productId', requireUser, validateResource(deleteProductSchema), deleteProductHandler)
export default productRouter
