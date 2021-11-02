const Contenedor = require('./prod-cont')
const express = require('express')
const app = express()

const products = new Contenedor('products.txt')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs')
app.set('views', './ejs/views')

app.get('/', (req, res) => res.render('pages/index.ejs', { partial: '../partials/form', btn: 'products' }))

app.get('/productos', (req, res) => res.render('pages/index', {
    partial: '../partials/table',
    btn: 'home',
    products: products.getAll()
}))

app.post('/productos', (req, res) => {
    products.save(req.body)
    res.send(req.body)
})

const PORT = 8080
const server = app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${server.address().port}`))
server.on('error', err => console.log(`Error en servidor: ${err}`))