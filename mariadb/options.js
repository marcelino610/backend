const options = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'entrega8'
    }
}

const options2 = {
    client: 'sqlite3',
    connection: {
        client: 'sqlite3',
        connection: { filename: '../db/ecommerce.sqlite' },
        useNullAsDefault: true
    }
}
export { options, options2 }