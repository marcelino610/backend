import mongoose from 'mongoose'
import config from '../src/config.js'

await mongoose.connect(config.mongodb.URI, config.mongodb.options) //.URL es el string de conexión a mongodb
    .then(() => console.log('mongo conectado'))
    .catch(err => console.log('Error al conectar mongo', err))

class ProductsContainer {
    constructor(collName, schema) {
        this.collection = mongoose.model(collName, schema)
    }

    async get(id) {
        const data = await this.collection.find({ id }, { _id: 0, __v: 0 })
        if (data[0]) {
            return data[0] 
        } else {
            return false
        }
    }

    async getAll() {
        const data = await this.collection.find({}, { _id: 0, __v: 0 })
        let response = {}
        data.forEach(el => response[el.id] = el)
        return response
    }

    async add(newProduct) {
        let lastDocument = await this.collection.find().sort({ id: -1 }).limit(1)
        let id = lastDocument[0].id + 1
        await this.collection.create({ id, ...newProduct })
        return id
    }

    async update(pId, prodParams) {
        let data = await this.collection.find({ id: { $exists: true, $in: [pId] } })
        if (data.length > 0) {
            await this.collection.updateOne({ id: pId }, { $set: prodParams })
            return true
        } else {
            return false
        }
    }

    async delete(id) {
        let condition = await this.collection.find({ id })
        if (condition.length > 0) {
            await this.collection.deleteOne({ id: id })
            return true
        } else {
            return false
        }
    }
}

class CartsContainer {
    constructor(collName, schema) {
        this.collection = mongoose.model(collName, schema)
    }

    async get(id) {
        const data = await this.collection.find({ id }, { _id: 0, __v: 0 })
        if (data[0]) {
            return data[0]
        } else {
            return false
        }
    }

    async getAll() {
        const data = await this.collection.find({}, { _id: 0, __v: 0 })
        let response = {}
        data.forEach(el => response[el.id] = el)
        return response
    }

    async add(newCart) {
        let lastDocument = await this.collection.find().sort({ id: -1 }).limit(1)
        let id = lastDocument[0] ? lastDocument[0].id + 1 : 1
        await this.collection.create({ id, ...newCart })
        return id
    }

    async update(id, cartParams) {
        let data = await this.collection.find({ id: {$exists: true, $in: [id]} }) 
        if (data.length > 0) {
            await this.collection.updateOne({ id }, { $set: { ...cartParams } })
            return true
        } else {
            return false
        }
    }

    async delete(id) {
        let condition = await this.collection.find({ id }) 
        if (condition.length > 0) {
            await this.collection.deleteOne({ id })
            return true
        } else {
            return false
        }
    }
}

export { ProductsContainer, CartsContainer }