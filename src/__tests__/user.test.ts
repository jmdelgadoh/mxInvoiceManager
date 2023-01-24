import * as UserService from '../service/user.service';
import * as SessionService from '../service/session.service'
import { mockTokens, sessionMock, userInput, userLoginInput, userPayload } from './mockConstants';
import createServer from '../util/server';
import supertest from 'supertest'
import { createSessionHandler } from '../controller/session.controller';


const app = createServer();

describe('user',()=>{
    //user registration
    describe('user registration', ()=>{

        describe('given the username and password are valid',()=>{
            it('should return the user payload',async ()=>{
                const createUserServiceMock = jest.spyOn(UserService, 'createUser')
                //@ts-ignore
                .mockReturnValueOnce(userPayload)
                const {statusCode, body} = await supertest(app).post('/api/users').send(userInput)
                expect(statusCode).toBe(200)
                expect(body).toEqual(userPayload);
                expect(createUserServiceMock).toHaveBeenCalledWith(userInput)
            })
        })

        describe('given the passwords do not match',()=>{
            it('should return 400',async ()=>{
                const createUserServiceMock = jest.spyOn(UserService, 'createUser')
                //@ts-ignore
                .mockReturnValueOnce(userPayload)
                const {statusCode} = await supertest(app).post('/api/users').send({...userInput, passwordConfirmation:'banana'})
                expect(statusCode).toBe(400)
                
                expect(createUserServiceMock).not.toHaveBeenCalledWith(userInput)
            })
        })

        describe('given the user service throws', ()=>{
            it('should return a 409', async () => {
                const createUserServiceMock = jest.spyOn(UserService, 'createUser')
                .mockRejectedValue('oh no got rejected')
                const {statusCode, body} = await supertest(app).post('/api/users').send(userInput)
                expect(statusCode).toBe(409)
                
                expect(createUserServiceMock).toHaveBeenCalled() // we  need to call this service in order to throw
            })
        })

    })

    describe('create user session', ()=>{
        describe('given the username and password are valid', ()=>{
            it('should call res.send and res.cookie functions', async ()=>{
                //@ts-ignore
                jest.spyOn(UserService, 'validateUserPassword').mockReturnValue(userPayload)
                //@ts-ignore
                jest.spyOn(SessionService, 'createSession').mockReturnValue(sessionMock)
                const req = {
                    body: userLoginInput,
                    get: () => 'a user agent'
                }

                const send = jest.fn()
                const cookie = jest.fn()
                const res = {
                    send,
                    cookie // setting void func to avoid error on cookie call, this should be properly tested this is just a bypass
                }
                
                //@ts-ignore
                await createSessionHandler(req, res)

                expect(send).toHaveBeenCalledWith({
                    accessToken: expect.any(String),
                    refreshToken: expect.any(String)
                })

                expect(cookie).toHaveBeenCalledTimes(2)
                expect(cookie).toHaveBeenCalledWith(
                    expect.any(String),
                    expect.any(String),
                    {
                        maxAge: expect.any(Number),
                        httpOnly: true,
                        domain: expect.any(String), //todo add this to config
                        path: '/',
                        sameSite: 'strict',
                        secure: false 
                    }
                    )

            })

            it('supertest should return an accessToken and refreshToken', async ()=>{

                //@ts-ignore
                jest.spyOn(UserService, 'validateUserPassword').mockReturnValue(userPayload)
                
                //@ts-ignore
                jest.spyOn(SessionService, 'createSession').mockReturnValueOnce(sessionMock)
                
                const {statusCode, body} = await supertest(app).post('/api/sessions').send(userLoginInput)
                
                
                expect(SessionService.createSession).toHaveBeenCalledWith(userPayload._id, '')
                expect(statusCode).toBe(200)
                expect(body).toEqual({
                    accessToken : expect.any(String),
                    refreshToken: expect.any(String)
                });

                expect(UserService.validateUserPassword).toHaveBeenCalledWith(userLoginInput)
            })
        })
    })

   xdescribe('create user session 2 (slightly different test)', ()=>{
        describe('given the username and password are valid', ()=>{
            
        })
    })
        
        

})


