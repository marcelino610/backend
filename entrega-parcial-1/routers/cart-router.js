import express from "express"
import { Product, Cart } from "../src/cruds.js"

const cartRouter = express.Router()

const cart = new Cart('carts.txt')
const products = new Product('products.txt')

cartRouter.post('/', (req, res) => {
    const cartId = cart.add({
        timestamp: Date.now(),
        products: []
    })
    res.send({ cartID: `${cartId}` })
})

cartRouter.delete('/:id', (req, res) => {
    cart.delete(req.params.id)
    res.send({ mensaje: `carrito ${req.params.id} eliminado` })
})

cartRouter.route('/:id/productos')
    .get((req, res) => {
        const prodsInCart = cart.get(req.params.id).products
        prodsInCart.length >= 1 ? res.json(prodsInCart.map(el => products.getAll()[el] && products.get(el))) : res.json({ mensaje: `El carrito ${req.params.id} no tiene productos` })
    })
    .post((req, res) => {
        const prodId = req.body.id_prod
        let prodsInCart = cart.get(req.params.id).products
        prodsInCart.push(prodId)
        products.get(prodId).id ? cart.update(req.params.id, { products: prodsInCart }) : res.json({ mensaje: `Producto ${prodId} no encontrado` })
        res.send({ mensaje: `Producto añadido a carrito ${req.params.id}` })
    })

cartRouter.delete('/:id/productos/:id_prod', (req, res) => {
    let prodsInCart = cart.get(req.params.id).products
    let index = prodsInCart.indexOf(parseInt(req.params.id_prod))
    prodsInCart.splice(index, 1)
    index !== -1 ? cart.update(req.params.id, { products: prodsInCart }) : res.json({mensaje: `Producto ${req.params.id_prod} no encontrado`})
    res.send({ mensaje: `Producto ${req.params.id_prod} eliminado de carrito ${req.params.id}` })
})

export default cartRouter