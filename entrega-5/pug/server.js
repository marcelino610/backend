const Contenedor = require('./prod-cont')
const express = require('express')
const app = express()

const products = new Contenedor('products.txt')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'pug')
app.set('views', './pug/views')

app.get('/', (req, res) => res.render('index.pug'))

app.get('/productos', (req, res) => res.render('prods.pug', { productos: products.getAll() }))

app.post('/productos', (req, res) => {
    products.save(req.body)
    res.send(req.body)
})

const PORT = 8080
const server = app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${server.address().port}`))
server.on('error', err => console.log(`Error en el servidor: ${err}`))