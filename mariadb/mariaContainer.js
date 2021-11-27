// import options from './options.js'
import knex from 'knex'
// const knexs = knex(options)

class MariaDBContainer {
    constructor(opt, tableName) {
        this.knex = knex(opt);
        this.tableName = tableName
    }

    save(newProduct) {
        this.knex.from(this.tableName).select('*')
            .where('title', newProduct.title)
            .then(response => {
                if (response.length > 0) {
                    throw Error('El producto ya existe')
                } else {
                    this.knex(this.tableName)
                        .insert(newProduct)
                        .then(res => console.log('Producto guardado', res))
                        .catch(err => console.log('Error al guardar el producto', err))
                        .finally(() => this.knex.destroy())
                }
            }
            )
            .catch(err => console.log('Error en proceso de verificación', err))
            .finally(() => this.knex.destroy())
    }

    getById(id) {
        return this.knex.from(this.tableName).select('*').where('id', id)
            .then(res => {
                if (res.length > 0) {
                    return res
                } else {
                    return null
                }
            }
            )
            .catch(err => console.log('Error al buscar el producto', err))
            .finally(() => this.knex.destroy())
    }

    getAll() {
        return this.knex.from(this.tableName).select('*')
            .then(rows => {
                return rows.map(el => (el))
            })
            .catch(err => console.log('Error al obtener productos', err))
            // .finally(() => this.knex.destroy())
    }

    deleteById(id) {
        this.knex.from(this.tableName).select('*').where('id', id)
            .then(res => {
                if (res.length > 0) {
                    this.knex.from(this.tableName).where('id', id).del()
                        .then(() => console.log('Producto eliminado'))
                        .catch(err => console.log('Error al eliminar producto', err))
                        .finally(() => this.knex.destroy())
                } else {
                    throw Error('Producto no encontrado')
                }
            })
            .catch(err => {
                return Error(err)
            })
            .finally(() => this.knex.destroy())
    }

    deleteAll() {
        this.knex.from(this.tableName).del()
            .then(() => console.log('Base de datos de productos vaciada'))
            .catch(err => console.log('Error al vaciar la base de datos', err))
            .finally(() => this.knex.destroy())
    }

    update(id, updatedObject) {
        return this.knex.from(this.tableName).select('*').where('id', id)
            .then(res => {
                if (res.length > 0) {
                    this.knex.from(this.tableName).where('id', id)
                        .update(updatedObject)
                        .then(() => console.log(`Producto ${id} actualizado correctamente`))
                        .catch(err => console.log('Error al actualizar producto ' + id, err))
                        .finally(() => this.knex.destroy())
                } else {
                    throw Error('Producto no encontrado')
                }
            })
            .catch(err => console.log('Error al actualizar producto', err))
            .finally(() => this.knex.destroy())
    }
}

export default MariaDBContainer