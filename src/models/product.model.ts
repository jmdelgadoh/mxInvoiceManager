import mongoose from 'mongoose';
import { customAlphabet } from 'nanoid';
import { UserDocument } from './user.model';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789')


export interface ProductDocumentLean {
    user: UserDocument['_id'];
    title:string;
    description: string;
    price: number;
    image: string;
    productId?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface ProductDocument extends ProductDocumentLean, mongoose.Document {}

const productSchema = new mongoose.Schema({
    productId: {
        type: String,
        required:true,
        unique:true,
        default: ()=>`product_${nanoid()}`
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    title: {
        type: String,
        required:true
    }, 
    description: {
        type: String,
        required:true
    },
    image: {
        type: String,
        required:true
    },
    price : {
        type: Number,
        required:true
    }
}, {
    timestamps: true
});

const ProductModel = mongoose.model<ProductDocument>('Product', productSchema);

export default ProductModel;