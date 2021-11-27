import { options, options2 } from './options.js'
import knex from 'knex'
const knexs = knex(options)
const knexSQL3 = knex(options2)

knexs.schema.createTable('products', table => {
    table.increments('id')
    table.string('title')
    table.float('price')
    table.string('thumbnail')
})
    .then(() => console.log('tabla creada'))
    .catch(err => console.log(err))
    .finally(() => knexs.destroy())

knexSQL3.schema.createTable('messages', table => {
    table.increments('id')
    table.string('email')
    table.string('message')
    table.timestamp('date')
})
    .then(() => console.log('Tabla \'messages\' creada'))
    .catch(err => console.log('Error al crear tabla \'messages\''))
    .finally(() => knexSQL3.destroy())