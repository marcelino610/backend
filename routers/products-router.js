import Router from 'express/lib/express.js'
import Contenedor from '../entrega-clase-2.js';

const routerProducts = Router()

/* --- Guardo lista de productos --- */
let products = new Contenedor('products.txt')


/* --- Obtener todos los productos --- */
routerProducts.get('/', (req, res) => res.send(products.getAll()))

/* --- Obtener producto por id --- */
routerProducts.get('/:id', (req, res) => {
    const id = req.params.id
    products.getById(id) ? res.send(products.getById(id)) : res.json({ error: 'Producto no encontrado' })
})

/* --- Guardar nuevo producto --- */
routerProducts.post('/', (req, res) => {
    products.save(req.body)
    res.send(req.body)
})

/* --- Modificar producto por id --- */
routerProducts.put('/:id', (req, res) => {
    try {
        products.update(req.params.id, req.body)
        res.send(products.getById(req.params.id))
    } catch (error) {
        res.json({ error: 'Producto no encontrado' })
    }
})

/* --- Eliminar producto por id --- */
routerProducts.delete('/borrar/:id', (req, res) => {
    try {
        products.deleteById(req.params.id)
        res.send(!(products.getById(req.params.id)) && ('El producto ha sido borrado'))
    } catch (err) {
        res.json({ error: 'Producto no encontrado' })
    }
})

export default routerProducts