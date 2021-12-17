import config from '../src/config.js'
import MongoDBProductDao from './products/MongoDBProductDao.js'
import MongoDBCartDao from './carts/MongoDBCartDao.js'
import FirebaseProductDao from './products/FirebaseProductDao.js'
import FirebaseCartDao from './carts/FirebaseCartDao.js'

let products
let cart

switch (config.method) {
    case 'file':
        break;
    case 'firebase':
        products = FirebaseProductDao
        cart = FirebaseCartDao
        break;
    case 'memory':
        break;
    case 'mongodb':
        products = MongoDBProductDao
        cart = MongoDBCartDao
        break;

}

export { products, cart }