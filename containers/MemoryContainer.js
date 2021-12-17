class ProductsContainer {
    constructor(prodsMemory) {
        this.prodsMemory = prodsMemory
    }

    get(id) {
        if (this.prodsMemory[id]) {
            return this.prodsMemory[id]
        } else {
            return false
        }
    }

    getAll() {
        return this.prodsMemory
    }

    add(newProduct) {
        let id = Object.keys(this.prodsMemory).length + 1
        this.prodsMemory[id] = { id, ...newProduct }
        return id
    }

    update(id, prodParams) {
        if (this.prodsMemory[id]) {
            Object.keys(prodParams).forEach(el => this.prodsMemory[id][el] = prodParams[el])
            return true
        } else {
            return false
        }
    }

    delete(id) {
        if (this.prodsMemory[id]) {
            delete this.prodsMemory[id]
            return true
        } else {
            return false
        }
    }
}

class CartsContainer {
    constructor(cartsMemory) {
        this.cartsMemory = cartsMemory
    }

    get(id) {
        return this.cartsMemory[id] ? { ...this.cartsMemory[id] } : { message: `Carrito ${id} no encontrado` }
    }

    getAll() {
        return this.cartsMemory
    }

    add(newCart) {
        let id = Object.keys(this.cartsMemory).length + 1
        this.cartsMemory[id] = { id, ...newCart }
        return id
    }

    update(id, cartParams) {
        this.cartsMemory[id] ? Object.keys(cartParams).forEach(el => this.cartsMemory[id][el] = cartParams[el]) : ({ message: `Producto ${id} no encontrado` })
    }

    delete(id) {
        this.cartsMemory[id] ? delete this.cartsMemory[id] : ({ message: `Producto ${id} no encontrado` })
    }
}

export { ProductsContainer, CartsContainer }