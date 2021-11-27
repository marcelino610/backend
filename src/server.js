import express from 'express'
import fs from 'fs'
import { Server } from 'socket.io'
import MariaDBContainer from '../mariadb/mariaContainer.js'
import ChatContainer from '../mariadb/chatContainer.js'
import { options, options2 } from '../mariadb/options.js'
import server from 'http'

const app = express()
const httpServer = server.createServer(app)
const io = new Server(httpServer)
const products = new MariaDBContainer(options, 'products')
const chat = new ChatContainer(options2)

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send(console.log('conectado'))
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