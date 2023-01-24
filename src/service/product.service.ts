import ProductModel, { ProductDocument } from "../models/product.model"
import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose"

export const createProduct = async(input: DocumentDefinition<ProductDocument>) => {
    return ProductModel.create(input);
}

export const findProduct = async(
    query : FilterQuery<ProductDocument>,
    options : QueryOptions = {lean:true}
    ) => {
    return ProductModel.findOne(query, {}, options);
}

export const findAndUpdateProduct = async(
    query : FilterQuery<ProductDocument>,
    update : UpdateQuery<ProductDocument>,
    options: QueryOptions = {new:true}
) => {
    return ProductModel.findOneAndUpdate(query, update, options)
}

export const deleteProduct = async(
    query: FilterQuery<ProductDocument>
) => {
    return ProductModel.deleteOne(query)
}