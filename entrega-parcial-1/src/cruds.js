import fs from 'fs'
import { URL } from 'url'

class Product {
    constructor(fileName) {
        this.root = new URL(`../db/${fileName}`, import.meta.url)
    }

    get(id) {
        const data = JSON.parse(fs.readFileSync(this.root, 'utf-8'))
        return data[id] ? { ...data[id] } : { mensaje: `Producto ${id} no encontrado` }
    }

    getAll() {
        return JSON.parse(fs.readFileSync(this.root, 'utf-8'))
    }

    add(newProduct) {
        const data = JSON.parse(fs.readFileSync(this.root, 'utf-8'))
        let id = Object.keys(data).length + 1
        data[id] = { id, ...newProduct }
        fs.writeFileSync(this.root, JSON.stringify(data), 'utf-8')
        return id
    }

    update(id, prodParams) {//objeto con los parámetros a actualizar
        const data = JSON.parse(fs.readFileSync(this.root, 'utf-8'))
        if (data[id]) {
            Object.keys(prodParams).forEach(el => data[id][el] = prodParams[el])
            fs.writeFileSync(this.root, JSON.stringify(data), 'utf-8')
        } else {
            return { mensaje: `Producto ${id} no encontrado` }
        }
    }

    delete(id) {
        const data = JSON.parse(fs.readFileSync(this.root, 'utf-8'))
        data[id] ? delete data[id] : ({ mensaje: `Producto ${id} no encontrado` })
        fs.writeFileSync(this.root, JSON.stringify(data), 'utf-8')
    }
}

class Cart {
    constructor(fileName) {
        this.root = new URL(`../db/${fileName}`, import.meta.url)
    }

    get(id) {
        const data = JSON.parse(fs.readFileSync(this.root, 'utf-8'))
        return data[id] ? { ...data[id] } : { mensaje: `Carrito ${id} no encontrado` }
    }

    getAll() {
        return JSON.parse(fs.readFileSync(this.root, 'utf-8'))
    }

    add(newCart) {
        const data = JSON.parse(fs.readFileSync(this.root, 'utf-8'))
        let id = Object.keys(data).length + 1
        data[id] = { id, ...newCart }
        fs.writeFileSync(this.root, JSON.stringify(data), 'utf-8')
        return id
    }

    update(id, cartParams) {
        const data = JSON.parse(fs.readFileSync(this.root, 'utf-8'))
        if (data[id]) {
            Object.keys(cartParams).forEach(el => data[id][el] = cartParams[el])
            fs.writeFileSync(this.root, JSON.stringify(data), 'utf-8')
        } else {
            return { mensaje: `Carrito ${id} no encontrado` }
        }
    }

    delete(id) {
        const data = JSON.parse(fs.readFileSync(this.root, 'utf-8'))
        data[id] ? delete data[id] : ({ mensaje: `Carrito ${id} no encontrado` })
        fs.writeFileSync(this.root, JSON.stringify(data), 'utf-8')
    }
}

export { Product, Cart }