import jwt, {JwtPayload, Secret} from "jsonwebtoken";
import config from 'config';
import log from "./logger";
const privateKey = config.get<string>('privateKey')
const publicKey = config.get<string>('publicKey')

export function signJwt(object: Object, options?: jwt.SignOptions | undefined){
    
    try{
        return jwt.sign(
            object, 
            privateKey, 
            {
            ...(options && options), //use && to only pass options if !undefined
            algorithm : 'RS256'    //this algorithm allows us to use priv/pub keys
        }
        )
    } catch(e){
        log.error(e)
    }
    
};

export const verifyJwt = (token : string) : {valid: boolean, expired : boolean, decoded: JwtPayload | string | null }  => {
    try {

        //verify will throw an exception if token is invalid
        const decoded =  jwt.verify(token, publicKey)
        
        return {
            valid:true,
            expired:false,
            decoded
        }
    } catch(e:any){
        return {
            valid: false,
            expired: e.message === 'jwt expired',
            decoded: null
        }
    }
    
}