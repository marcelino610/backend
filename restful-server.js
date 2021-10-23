import express from 'express'
import routerProducts from './routers/products-router.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/api/productos', routerProducts)

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`);
})
server.on('error', err => console.log('Error en servidor', err))