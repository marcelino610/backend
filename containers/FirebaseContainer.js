import admin from 'firebase-admin'
import config from '../src/config.js'

admin.initializeApp({
    credential: admin.credential.cert(config.firebase)
})

const db = admin.firestore()

class ProductsContainer {
    constructor(collName) {
        this.collection = db.collection(collName)
    }

    async get(id) {
        const doc = this.collection.doc(`${id}`)
        const item = await doc.get()
        doc ? item.data() : ({ message: `Producto ${id} no encontrado` })
    }

    async getAll() {
        const data = await this.collection.get().docs
        let response = {}
        data.map(doc => ({
            id: doc.id,
            name: doc.data().name,
            description: doc.data().description,
            code: doc.data().code,
            imageURL: doc.data().imageURL,
            price: doc.data().price,
            stock: doc.data().stock
        })).forEach(el => response[el.id] = el)
        return response
    }

    async add(newProduct) {
        const docIds = await this.collection.get().docs.map(doc => (doc.id))
        const id = docIds[docIds.length - 1]
        await this.collection.doc(`${id}`).create({ id, ...newProduct })
        return id
    }

    async update(id, prodParams) {
        this.collection.doc(`${id}`) ?
            await this.collection.doc(`${id}`).update({ ...prodParams }) :
            ({ message: `Producto ${id} no encontrado` })
    }

    async delete(id) {
        this.collection.doc(`${id}`) ?
            await this.collection.doc(`${id}`).delete() :
            ({ message: `Producto ${id} no encontrado` })
    }
}

class CartsContainer {
    constructor(collName) {
        this.collection = db.collection(collName)
    }

    async get(id) {
        const doc = this.collection.doc(`${id}`)
        const item = await doc.get()
        doc ? item.data() : ({ message: `Producto ${id} no encontrado` })
    }

    async getAll() {
        const data = await this.collection.get().docs
        let response = {}
        data.map(doc => ({
            id: doc.id,
            name: doc.data().name,
            description: doc.data().description,
            code: doc.data().code,
            imageURL: doc.data().imageURL,
            price: doc.data().price,
            stock: doc.data().stock
        })).forEach(el => response[el.id] = el)
        return response
    }

    async add(newCart) {
        const docIds = await this.collection.get().docs.map(doc => (doc.id))
        const id = docIds[docIds.length - 1]
        await this.collection.doc(`${id}`).create({ id, ...newCart })
        return id
    }

    async update(id, cartParams) {
        this.collection.doc(`${id}`) ?
            await this.collection.doc(`${id}`).update({ ...cartParams }) :
            ({ message: `Producto ${id} no encontrado` })
    }

    async delete(id) {
        this.collection.doc(`${id}`) ?
            await this.collection.doc(`${id}`).delete() :
            ({ message: `Producto ${id} no encontrado` })
    }
}

export { ProductsContainer, CartsContainer }