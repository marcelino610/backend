import fs from 'fs';

class Contenedor {
    constructor(fileName) {
        this.fileName = fileName
    }

    save(newObject) {
        const dirList = fs.readdirSync('./', (err, files) => {
            err ? console.error('Sucedieron cosas: ', err) : files;
        })
        
        if (!(dirList.some(el => el === this.fileName)) || !(fs.readFileSync(`./${this.fileName}`, 'utf-8'))) fs.writeFileSync(`./${this.fileName}`, JSON.stringify({}))
        
        let data = fs.readFileSync(`./${this.fileName}`, 'utf-8');
        data = JSON.parse(data)
        newObject.id = newObject.id ? newObject.id : data.length
        data[data.length] = newObject
        fs.writeFileSync(`./${this.fileName}`, JSON.stringify(data), "utf-8");
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

export default Contenedor;