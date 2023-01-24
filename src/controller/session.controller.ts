import { Request, Response, NextFunction } from "express";
import { createSession, findSessions, updateSession } from "../service/session.service";
import { validateUserPassword } from "../service/user.service";
import { signJwt } from "../util/jwt.util";
import logger from "../util/logger";
import config from 'config';


export const createSessionHandler = async(req : Request, res : Response, next : NextFunction) => {
    
    // validate password
    const user = await validateUserPassword(req.body)
    console.log('USER:', user)
    if(!user)
        return res.status(401).send('Invalid credentials');

    //create a session
    
    const session = await createSession(user._id, req.get('user-agent') || '')
    
    //create an access token
    const accessToken = signJwt({
        ...user, 
        session: session._id
    },
        {
            expiresIn : config.get<string>('accessTokenTtl') //15m
    })

    //create a refresh token
    const refreshToken = signJwt({
        ...user, 
        session: session._id
    },{
        expiresIn : config.get<string>('refreshTokenTtl') //1y
    });
    

    res.cookie('accessToken', accessToken, {
        maxAge: 900000,
        httpOnly: true,
        domain: 'localhost', //todo add this to config
        path: '/',
        sameSite: 'strict',
        secure: false
    })

    res.cookie('refreshToken', refreshToken, {
        maxAge: 3.154e10, //1 year
        httpOnly: true,
        domain: 'localhost', //todo add this to config
        path: '/',
        sameSite: 'strict',
        secure: false
    })

    // return access and refresh tokens
    return res.send({accessToken, refreshToken})
    
}

export const getUserSessionsHandler = async(req: Request, res: Response) => {
    
    const {user} = res.locals
    
    const sessions = await findSessions({user:user._id, valid:true})
    
    return res.send(sessions)
}

export const deleteSessionsHandler = async(req: Request, res: Response) => {
    
    const {session} = res.locals.user;

    await updateSession({_id: session}, {valid:false})

    return res.send({
        accessToken: null,
        refreshToken:null
    })
}