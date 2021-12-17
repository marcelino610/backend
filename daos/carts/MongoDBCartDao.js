import { CartsContainer } from '../../containers/MongoDBContainer.js'

class MongoDBCartDao extends CartsContainer {
    constructor() {
        super('carts', {
            id: { type: Number, required: true },
            timestamp: { type: Number, required: true },
            products: { type: Array, required: true }
        })
    }
}

export default new MongoDBCartDao()