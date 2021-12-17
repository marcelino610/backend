import mongoose from "mongoose";

const prodsColl = 'products'
const cartsColl = 'carts'

const ProdsSchema = new mongoose.Schema({
    id: {type: Number},
    timestamp: {type: Number},
    name: {type: String, require: true},
    description: {type: String, require: true},
    code: {type: String, require: true},
    imageURL: {type: String, require: true},
    price: {type: Number},
    stock: {type: Number}
})

const CartsSchema = new mongoose.Schema({
    id: {type: Number},
    timestamp: {type: Number},
    products: {type: Array}
})

const products = mongoose.model(prodsColl, ProdsSchema)
const carts = mongoose.model(cartsColl, CartsSchema)

export { products, carts }