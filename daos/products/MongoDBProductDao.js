import { ProductsContainer } from "../../containers/MongoDBContainer.js";

class MongoDBProductDao extends ProductsContainer {
    constructor() {
        super('products', {
            id: { type: Number, required: true },
            name: { type: String, required: true },
            description: { type: String, required: true },
            code: { type: String, Required: true },
            imageURL: { type: String, Required: true },
            price: { type: Number, required: true },
            stock: { type: Number, required: true }
        })
    }
}

export default new MongoDBProductDao()