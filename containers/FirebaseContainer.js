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
        const doc = await this.collection.doc(`${id}`).get().then(res => res.data())
        if (doc) {
            return doc
        } else {
            return false
        }
    }

    async getAll() {
        const data = await this.collection.get()
        let response = {}
        if (data) {
            data.docs.map(doc => ({
                id: doc.id,
                name: doc.data().name,
                description: doc.data().description,
                code: doc.data().code,
                imageURL: doc.data().imageURL,
                price: doc.data().price,
                stock: doc.data().stock
            })).forEach(el => response[el.id] = el)
        } else {
            response = { message: 'No se han encontrado productos' }
        }
        return response
    }

    async add(newProduct) {
        let data = await this.collection.get()
        let id
        const docIds = data.docs.map(doc => (doc.id))
        if (docIds.length > 0) {
            id = parseInt(docIds[docIds.length - 1]) + 1
        } else {
            id = 1
        }
        await this.collection.doc(`${id}`).create({ id, ...newProduct })
        return id
    }

    async update(id, prodParams) {
        let data = await this.collection.doc(`${id}`).get()
        if (data) {
            await this.collection.doc(`${id}`).update({ ...prodParams })
            return true
        } else {
            return false
        }
    }

    async delete(id) {
        let data = await this.collection.doc(`${id}`).get()
        if (data.data()) {
            await this.collection.doc(`${id}`).delete()
            return true
        } else {
            return false
        }
    }
}

class CartsContainer {
    constructor(collName) {
        this.collection = db.collection(collName)
    }

    async get(id) {
        const doc = await this.collection.doc(`${id}`).get().then(res => res.data())
        if (doc) {
            return doc
        } else {
            return false
        }
    }

    async getAll() {
        const data = await this.collection.get()
        let response = {}
        if (data) {
            data.map(doc => ({
                id: doc.id,
                timestamp: doc.data().timestamp,
                products: doc.data().products
            })).forEach(el => response[el.id] = el)
        }
        return response
    }

    async add(newCart) {
        const data = await this.collection.get()
        let id
        const docIds = data.docs.map(doc => (doc.id))
        if (docIds.length > 0) {
            id = parseInt(docIds[docIds.length - 1]) + 1
        } else {
            id = 1
        }
        await this.collection.doc(`${id}`).create({ id, ...newCart })
        return id
    }

    async update(id, cartParams) {
        let data = this.collection.doc(`${id}`).get()
        if (data) {
            await this.collection.doc(`${id}`).update({ ...cartParams })
            return true
        } else {
            return false
        }
    }

    async delete(id) {
        let data = await this.collection.doc(`${id}`).get()
        if (data) {
            await this.collection.doc(`${id}`).delete()
            return true
        } else {
            return false
        }
    }
}

export { ProductsContainer, CartsContainer }