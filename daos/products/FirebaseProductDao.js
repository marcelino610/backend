import { ProductsContainer } from "../../containers/FirebaseContainer.js";

class FirebaseProductDao extends ProductsContainer {
    constructor() {
        super('products')
    }
}

export default FirebaseProductDao