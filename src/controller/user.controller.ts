import {Request, Response} from 'express';
import { omit } from 'lodash';
import { CreateUserInput } from '../schema/user.schema';
import { createUser } from '../service/user.service';
import logger from '../util/logger'

export const createUserHandler = async (
    req : Request<{}, {}, CreateUserInput['body']>, 
    res: Response) => {
    try {
        const user = await createUser(req.body)
        return res.json(omit(user, 'password'))
    } catch (e: any) {
        logger.error(e)
        return res.status(409).send(e.message)
    }
}

export const getCurrentUser = async (req : Request<{}, {}, CreateUserInput['body']>, res: Response) => {
    return res.send(res.locals.user)
}