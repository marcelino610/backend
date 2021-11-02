const fs = require('fs')

class Contenedor {
    constructor(fileName) {
        this.fileName = fileName
    }

    save(newObject) {
        //guardaba en dirList los archivos/directorios en /entrega-5
        const dirList = fs.readdirSync('./', (err, files) => {
            err ? console.error('Sucedieron cosas: ', err) : files;
        })
        
        //al ingresar al constructor el prámetro '/handlebars/products.txt'
        //y buscar en /entrega-5 o leer con readFileSync
        if (!(dirList.some(el => el === this.fileName)) || !(fs.readFileSync(`./${this.fileName}`, 'utf-8'))) fs.writeFileSync(`./${this.fileName}`, JSON.stringify({}))
        //no encontraba ningún archivo con el nombre indicado
        //en cambio, el parámetro sí servía para indicar dónde crear el archivo nuevo
        //usando writeFileSync
        //finalmente, guardaba siempre en 'entrega-5/handlebars/products.txt' un archivo con un
        //objeto vacío
        
        let data

        try {
            data = fs.readFileSync(`./${this.fileName}`, 'utf-8');
        } catch (err) {
            console.error('Sucedieron cosas: ', err)
        }

        data = JSON.parse(data)

        let id = 0

        while (data[id]) {
            id++;
        }

        newObject['id'] = `${id}`;
        data[id] = newObject;

        data = JSON.stringify(data)

        try {
            fs.writeFileSync(`./${this.fileName}`, data);
        } catch (err) {
            console.error('Sucedieron cosas: ', err);
        }
    }

    getById(id) {
        let data
        try {
            data = fs.readFileSync(`./${this.fileName}`, 'utf-8');
        } catch (err) {
            console.error('Sucedieron cosas: ', err)
        }
        data = JSON.parse(data)

        return data[id] ? data[id] : null;
    }

    getAll() {
        let data
        try {
            data = fs.readFileSync(`./${this.fileName}`, 'utf-8');
        } catch (err) {
            console.error('Sucedieron cosas: ', err)
        }
        data = JSON.parse(data)

        let objects = []

        for (let dataObject in data) {
            objects.push(data[dataObject])
        }

        return objects;
    }

    deleteById(id) {
        let data
        try {
            data = fs.readFileSync(`./${this.fileName}`, 'utf-8');
        } catch (err) {
            console.error('Sucedieron cosas: ', err)
        } 
        data = JSON.parse(data)
        
        if (data[id]) {
            delete data[id]
            try {
                fs.writeFileSync(`./${this.fileName}`, JSON.stringify(data))
            } catch (err) {
                console.error('Sucedieron cosas: ', err)
            }
        } else {
            throw new Error('producto no encontrado')
        }

    }

    deleteAll() {
        try {
            fs.writeFileSync(`./${this.fileName}`, "{}")
        } catch (err) {
            console.error('Sucedieron coas: ', err)
        }
    }

    update(id, updatedObject) {
        let data
        try {
            data = fs.readFileSync(`./${this.fileName}`, 'utf-8');
        } catch (err) {
            console.error('Sucedieron cosas: ', err)
        }
        data = JSON.parse(data)

        if (data[id]) {
            data[id] = updatedObject
            data[id].id = id
            
            data = JSON.stringify(data)
    
            try {
                fs.writeFileSync(`./${this.fileName}`, data);
            } catch (err) {
                console.error('Sucedieron cosas: ', err);
            }
        } else {
            throw new Error('No se encuentra el producto que está buscando')
        }
        
    }
}

module.exports = Contenedor;