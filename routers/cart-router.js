import express from "express"
import { products, cart } from '../daos/index.js'

const cartRouter = express.Router()

cartRouter.post('/', async (req, res) => {
    const cartId = await cart.add({
        timestamp: Date.now(),
        products: []
    })
    res.send({ cartID: `${cartId}` })
})

cartRouter.delete('/:id', async (req, res) => {
    let result = await cart.delete(req.params.id)
    result ?
        res.send({ message: `Carrito ${req.params.id} eliminado` }) :
        res.send({ message: `Carrito ${req.params.id} no encontrado` })
})

cartRouter.route('/:id/productos')
    .get(async (req, res) => {
        const result = await cart.get(req.params.id)
        if (result) {
            const prodsInCart = result.products
            if (prodsInCart.length >= 1) {
                const listOfProds = await products.getAll()
                let fullProdsInCart = await prodsInCart.map(el => listOfProds[el] && listOfProds[el])
                res.json(fullProdsInCart)
            } else {
                res.json({ message: `El carrito ${req.params.id} no tiene productos` })
            }
        } else {
            res.json({ message: `Carrito ${req.params.id} no encontrado` })
        }
    })
    .post(async (req, res) => {
        const prodId = req.body.id_prod
        let prodsInCart = await cart.get(req.params.id).then(res => { return res.products }) //aquí se supone que el carrito ya existe
        prodsInCart.push(prodId)
        let condition = await products.get(prodId)
        if (condition) {
            let result = await cart.update(req.params.id, { products: prodsInCart })
            if (result) {
                res.send({ message: `Producto añadido a carrito ${req.params.id}` })
            } else {
                res.send({ message: `Producto ${id} no encontrado` })
            }
        } else {
            res.json({ message: `Producto ${prodId} no encontrado` })
        }

    })

cartRouter.delete('/:id/productos/:id_prod', async (req, res) => {
    let prodsInCart = await cart.get(req.params.id)
    let index = prodsInCart.products.indexOf(parseInt(req.params.id_prod))
    if (index !== -1) {
        prodsInCart.products.splice(index, 1)
        let result = cart.update(req.params.id, { products: prodsInCart.products })
        if (!result) res.json({ message: `Carrito ${req.params.id} no encntrado` })
        res.send({ message: `Producto ${req.params.id_prod} eliminado de carrito ${req.params.id}` })
    } else {
        res.json({ message: `Producto ${req.params.id_prod} no encontrado en este carrito` })
    }
})

export default cartRouter