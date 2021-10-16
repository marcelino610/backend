import express from 'express';
import Contenedor from './entrega-clase-2.js';

let products = new Contenedor('products.txt')

const app = express()
const server = app.listen('8080', () => {
    console.log(`Servidor escuchando puerto ${server.address().port}`)
});

server.on('error', err => console.log('Error: ', err))

app.get('/', (req, res) => res.send('hola, mundo'))

app.get('/productos', (req, res) => res.send(products.getAll()))

app.get('/productoRandom', (req, res) => {
    let prod = products.getAll()
    let n = parseInt(Math.random() * prod.length)
    res.send(`${JSON.stringify(prod[n])}\n${n}`)
})
