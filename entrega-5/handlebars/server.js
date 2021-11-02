const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const Contenedor = require('./prod-cont.js')

let productosGuardados = new Contenedor('products.txt')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('hbs', handlebars({
    extname: '.hbs',
    defaultLayout: 'index.hbs'
}))

app.set('view engine', 'hbs')
app.set('views', './handlebars/views')


app.get('/productos', (req, res) => {
    res.render('main.hbs', { productos: productosGuardados.getAll(), length: productosGuardados.getAll().length > 0 })
})

app.post('/productos', (req, res) => {
    productosGuardados.save(JSON.parse(JSON.stringify(req.body)))
    res.send(`${JSON.stringify(req.body)}\n${JSON.stringify(productosGuardados.getAll())}`)
})

app.use(express.static('./handlebars/public'))

app.get('/', (req, res) => res.send(console.log('Salió bien')))


const PORT = 8080
const server = app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${server.address().port}`))
server.on('error', err => console.log(`Error en servidor: ${err}`))