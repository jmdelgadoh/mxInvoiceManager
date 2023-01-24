import { ProductDocument, ProductDocumentLean } from "models/product.model"
import mongoose from "mongoose";
import {SessionDocumentLean} from '../models/session.model'
const mongoID = new mongoose.Types.ObjectId().toString()
const sessionID = new mongoose.Types.ObjectId().toString()

export const productPayload : ProductDocumentLean = {
    user: mongoID,
    "title": "Canon EOS 1500D DSLR Camera with 18-55mm Lens",
    "description": "Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go.",
    "price": 879.99,
    "image": "https://i.imgur.com/QlRphfQ.jpg"
}

export const userPayload = {
  _id: mongoID,
  email: "jane.doe@examplemock.com",
  name: "Jane Doe Mock",
};

export const userInput = {
  email: "test@example.com",
  name: "Jane Doe",
  password: "Password123",
  passwordConfirmation: "Password123",
};

export const userLoginInput = {
    email: "test",
    password: "somevalidpassword"
}

export const mockTokens = {
    accessToken: 'sometokenstring',
    refreshToken: 'adifferentToken'
}

export const sessionMock : SessionDocumentLean = {
    user: mongoID,
    valid: true,
    userAgent: '',
    _id: sessionID
}
