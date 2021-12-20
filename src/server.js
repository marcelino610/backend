import express from 'express'
import { Server } from 'socket.io'
import server from 'http'
import { ProductsContainer } from '../containers/MongoDBContainer.js'
import mongoose from 'mongoose'
// import fs from 'fs'
// import MariaDBContainer from '../containers/mariadb/mariaContainer.js'
// import ChatContainer from '../containers/mariadb/chatContainer.js'
// import { options, options2 } from '../containers/mariadb/options.js'

const app = express()
const httpServer = server.createServer(app)
const io = new Server(httpServer)
const products = new ProductsContainer('products', new mongoose.Schema({
    id: { type: Number },
    name: { type: String },
    price: { type: Number },
    imageURL: { type: String }
}))
// const products = new MariaDBContainer(options, 'products')
// const chat = new ChatContainer(options2)

import faker from 'faker'
faker.locale = 'es'

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send(console.log('conectado'))
})

app.get('/api/productos-test', (req, res) => {
    io.on('connect', async socket => {
        let fakeProducts = []
        function a() {
            for (let i = 0; i < 5; i++) {
                fakeProducts.push({
                    nombre: faker.commerce.productName(),
                    precio: faker.commerce.price(),
                    imagen: faker.image.image()
                })
            }
        }
        await a()
        console.log(fakeProducts);
        socket.emit('load-fake-products', { fakeProds: JSON.parse(JSON.stringify(fakeProducts)) })
    })

    res.sendFile('productos-test.html', { root: 'public' })
})

io.on('connection', socket => {
    console.log('Usuario conectado')

    socket.emit('load-products', { products: products.getAll(), anyProduct: products.getAll().length > 0 })

    socket.on('save-prod', data => {
        products.save(data)
        io.sockets.emit('load-products', { products: products.getAll(), anyProduct: products.getAll().length > 0 })
    })

    socket.on('send-message', data => {
        console.log(data)
        chat.addMessage(data)
        io.sockets.emit('new-msg', data)
    })
})

const PORT = process.env.PORT || 8080
const srv = httpServer.listen(PORT, () => console.log(`Servidor escuchando en puerto ${srv.address().port}`))
srv.on('error', err => console.log(`Error en servidor: ${err}`))