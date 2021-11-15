import express from "express";
import productsRouter from "../routers/products-router.js";
import cartRouter from "../routers/cart-router.js";

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send({ mensaje: 'todo OK' })
})

app.use('/api/productos', productsRouter)

app.use('/api/carrito', cartRouter)

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${server.address().port}`))
server.on('error', err => console.log(`Error en servidor: ${err}`))