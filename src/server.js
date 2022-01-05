import express from 'express'
import { Server } from 'socket.io'
import server from 'http'
import { ChatContainer, ProductsContainer } from '../containers/MongoDBContainer.js'
import mongoose from 'mongoose'
import faker from 'faker'
import { normalizeChat, chatSchema } from './normalizr.js'

await mongoose.connect('mongodb://localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
})
    .then(console.log('mongo conectado'))
    .catch(err => console.log(err))

const app = express()
const httpServer = server.createServer(app)
const io = new Server(httpServer)
const products = new ProductsContainer('products', new mongoose.Schema({
    id: { type: Number },
    name: { type: String },
    price: { type: Number },
    imageURL: { type: String }
}))
const chat = new ChatContainer('chat', new mongoose.Schema({
    author: { type: Object },
    text: { type: String },
    date: { type: String }
}))

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

    socket.on('send-message', async data => {
        console.log('data recibida: ', data)
        await chat.add(data)
        let chatHistory = await chat.getAll()
        let obj = {
            id: 'historial de mensajes',
            messages: chatHistory
        }
        let normalizedChat = await normalizeChat(obj)
        io.sockets.emit('new-msg', { normalizedChat, chatSchema })
    })
})

const PORT = process.env.PORT || 8080
const srv = httpServer.listen(PORT, () => console.log(`Servidor escuchando en puerto ${srv.address().port}`))
srv.on('error', err => console.log(`Error en servidor: ${err}`))