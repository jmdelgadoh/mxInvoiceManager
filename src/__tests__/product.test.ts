import supertest from 'supertest'
import createServer from '../util/server'
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from 'mongoose'
import { createProduct } from '../service/product.service';
import { signJwt } from '../util/jwt.util';
import { productPayload, userPayload } from './mockConstants';

const app = createServer()


describe('product', ()=>{

    beforeAll(async()=>{
        const mongoServer = await MongoMemoryServer.create()

        await mongoose.connect(mongoServer.getUri())
    })

    afterAll(async()=>{
        await mongoose.disconnect()
        await mongoose.connection.close()
    })

    describe('get product route', () => {
        describe('given the product does not exist', ()=>{
            it('should return 404', async() => {
                const productId = 'product_123'
                await supertest(app).get(`/api/products/${productId}`).expect(404)
            })
        })

        describe('given the product exists', ()=>{
            it('should return 200 status and the product', async() => {
                const product = await createProduct(productPayload)
                const productId = product.productId
               const {body, statusCode} = await supertest(app).get(`/api/products/${productId}`)

               expect(statusCode).toBe(200)
               expect(body.productId).toBe(productId)
            })
        })
    })

    describe('create product route', () => {
        describe('given the user is not logged in', ()=> {
            it('should return 403',async()=>{
                const {statusCode} = await supertest(app).post('/api/products')

                expect(statusCode).toBe(403)
            })
        })

        describe('given the user is logged in', ()=> {
            it('should return 200 and the product',async()=>{
                const jwt = signJwt(userPayload)

                const {statusCode, body} = await supertest(app).post('/api/products')
                .set('Authorization', `Bearer ${jwt}`)
                .send(productPayload);

                expect(statusCode).toBe(200)

                expect(body).toEqual({
                    "user": expect.any(String),
                    "title": "Canon EOS 1500D DSLR Camera with 18-55mm Lens",
                    "description": "Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go.",
                    "image": "https://i.imgur.com/QlRphfQ.jpg",
                    "price": 879.99,
                    "_id": expect.any(String),
                    "productId": expect.any(String),
                    "createdAt": expect.any(String),
                    "updatedAt": expect.any(String),
                    "__v": 0
                })
            })
        })
    })
})