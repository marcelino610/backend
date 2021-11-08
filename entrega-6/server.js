const express = require('express')
const fs = require('fs')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const Contenedor = require('./prod-cont')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const products = new Contenedor('products.txt')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send(console.log('conectado'))
    //res.send(compiler(products.getAll(), products.getAll().length > 0))
    //fetch('./views/main.hbs')
    //res.render('main.hbs', { productos: products.getAll(), length: products.getAll().length > 0 })
})

io.on('connection', socket => {
    console.log('Usuario conectado')

    socket.emit('load-products', { products: products.getAll(), anyProduct: products.getAll().length > 0})

    socket.on('save-prod', data => {
        products.save(data)
        io.sockets.emit('load-products', { products: products.getAll(), anyProduct: products.getAll().length > 0})
    })

    socket.on('send-message', data => {
        console.log(data)
        const alreadyChatted = fs.readdirSync('./', (err, files) => {
            err ? console.log('Error al buscar en directorio:', err) : files
        }).some(el => el === 'chat.txt')

        if (alreadyChatted) {
            let chat = JSON.parse(fs.readFileSync('./chat.txt','utf-8'))
            let newMsg = Object.keys(chat).length
            data['id'] = newMsg
            chat[newMsg] = data
            fs.writeFileSync('./chat.txt', JSON.stringify(chat), 'utf-8')
        } else {
            data['id'] = 0
            fs.writeFileSync('./chat.txt', JSON.stringify({0: data}), 'utf-8')
        }
        io.sockets.emit('new-msg', data)
    })
})

const PORT = 8080
const server = httpServer.listen(PORT, () => console.log(`Servidor escuchando en puerto ${server.address().port}`))
server.on('error', err => console.log(`Error en servidor: ${err}`))