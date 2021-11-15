import express from "express"
import { Product } from "../src/cruds.js"
import verifyAuth from "../src/auth.js"

const productsRouter = express.Router()

const products = new Product('products.txt')

productsRouter.route('/')
    .get((req, res) => {
        res.json(products.getAll())
    })
    .post(verifyAuth, (req, res) => {
        let productData = {
            //el id lo agrega el método add()
            timestamp: Date.now(),
            ...req.body // pasar por req los siguientes campos: name, description, code, imageURL, price, stock
        }
        res.json({ mensaje: `Producto añadido. ID: ${products.add(productData)}` })
    })
productsRouter.route('/:id')
    .get((req, res) => {
        res.json(products.get(req.params.id))
    })
    .put(verifyAuth, (req, res) => {
        products.update(req.params.id, req.body)
        res.json({ mensaje: 'Producto actualizado exitosamente' })
    })
    .delete(verifyAuth, (req, res) => {
        products.delete(req.params.id)
        res.json({ mensaje: 'Producto borrado exitosamente' })
    })

export default productsRouter