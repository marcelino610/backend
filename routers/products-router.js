import express from "express"
import verifyAuth from "../src/auth.js"
import { products } from '../daos/index.js'

const productsRouter = express.Router()

productsRouter.route('/')
    .get(async (req, res) => {
        res.json(await products.getAll())
    })
    .post(verifyAuth, (req, res) => {
        let productData = {
            //el id lo agrega el método add()
            timestamp: Date.now(),
            ...req.body // pasar por req los siguientes campos: name, description, code, imageURL, price, stock
        }
        res.json({ message: `Producto añadido. ID: ${products.add(productData)}` })
    })
productsRouter.route('/:id')
    .get(async (req, res) => {
        let result = await products.get(req.params.id)
        result ?
            res.json(result) :
            res.json({ message: `Producto ${req.params.id} no encontrado` })
    })
    .put(verifyAuth, async (req, res) => {
        let result = await products.update(req.params.id, req.body)
        result ?
            res.json({ message: 'Producto actualizado exitosamente' }) :
            res.json({ message: `Producto ${req.params.id} no encontrado` })
    })
    .delete(verifyAuth, async (req, res) => {
        let result = await products.delete(req.params.id)
        result ?
            res.json({ message: 'Producto borrado exitosamente' }) :
            res.json({ message: `Producto ${req.params.id} no encontrado` })
    })

export default productsRouter