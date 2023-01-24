import { FilterQuery, UpdateQuery } from "mongoose";
import {get, stubFalse} from 'lodash';
import SessionModel, { SessionDocument } from "../models/session.model"
import { findUser } from "./user.service";
import { verifyJwt , signJwt } from '../util/jwt.util';
import config from 'config'

export const createSession = async (userId: String, userAgent: string) => {
    const session = await SessionModel.create({
        user: userId,
        userAgent
    })

    return session;
}

export const findSessions = async(query: FilterQuery<SessionDocument>) => {
    console.log('query:', query)
    return SessionModel.find(query).lean()

}

export const updateSession = async(
    query : FilterQuery<SessionDocument>, 
    update:UpdateQuery<SessionDocument>) => {

    return SessionModel.updateOne(query, update);
}

export const reissueAccessToken = async({refreshToken}:{ refreshToken:string }) : Promise<false| undefined | string> => {
    const {decoded} = verifyJwt(refreshToken)

    if(!decoded || !get(decoded, 'session'))
        return false;
    
    const session = await SessionModel.findById(get(decoded,'session'))

    if(!session || !session.valid){
        return false
    }
    const user = await findUser({_id: session.user})

    if(!user) return false;

     //create an access token
     const accessToken = signJwt({
        ...user, 
        session: session._id
    },
        {
            expiresIn : config.get<string>('accessTokenTtl') //15m
    })

    return accessToken;
}