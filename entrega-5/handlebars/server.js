const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const Contenedor = require('./prod-cont.js')

let productosGuardados = new Contenedor('./handlebars/products.txt')
let products = productosGuardados.getAll()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.engine('hbs', handlebars({
    extname: '.hbs',
    defaultLayout: 'index.hbs'
}))

app.set('view engine', 'hbs')
app.set('views', './handlebars/views')

try {
    app.get('/productos', (req, res) => {
        res.render('main.hbs', { productos: products, prodExists: true })
    })
} catch (error) {
    res.send(`${error}`)
}

try {
    app.post('/productos', (req, res) => {
        console.log(typeof(req.body))
        let reqBody = JSON.parse(JSON.stringify(req.body))
        productosGuardados.save(reqBody)
        res.send(req.body)
    })
} catch (error) {
    
}

app.use(express.static('./handlebars/public'))

app.get('/', (req, res) => res.send(console.log('Salió bien')))


const PORT = 8080
const server = app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${server.address().port}`))
server.on('error', err => console.log(`Error en servidor: ${err}`))