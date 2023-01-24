import { get } from 'lodash';
import {Request, Response, NextFunction} from 'express';
import { verifyJwt } from '../util/jwt.util';
import { reissueAccessToken } from '../service/session.service';


export const deserializeUser = async(req:Request, res:Response, next:NextFunction) => {
    const {headers} = req;
    // get accessToken from cookie in request or from headers authorization header
    const accessToken : string = get(req, 'cookies.accessToken') || get(headers, 'authorization', '').replace(/^Bearer\s/, '')
    const refreshToken = get(req, 'cookies.accessToken') || get(req, 'headers.x-refresh')
    
    
    if(!accessToken){
        // continue to controller handler, if controller needs auth, it will fail and return
        return next()
    }

    const {decoded, expired} = verifyJwt(accessToken)
    
    if(decoded){
        res.locals.user = decoded;
        return next()
    }

    if(expired && refreshToken){
        const newAccessToken = await reissueAccessToken({refreshToken})

        if(newAccessToken){
            res.setHeader('x-access-token', newAccessToken)
            res.cookie('accessToken', newAccessToken, {
                maxAge: 900000,
                httpOnly: true,
                domain: 'localhost', //todo add this to config
                path: '/',
                sameSite: 'strict',
                secure: false
            })
        }

        const result = verifyJwt(newAccessToken as string);
        res.locals.user = result.decoded;
        return next()
    }

    return next();

}