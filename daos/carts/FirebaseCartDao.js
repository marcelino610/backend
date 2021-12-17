import { CartsContainer } from "../../containers/FirebaseContainer.js"

class FirebaseCartDao extends CartsContainer {
    constructor() {
        super('carts')
    }
}

export default new FirebaseCartDao()