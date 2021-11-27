import knex from 'knex'

class ChatContainer {
    constructor(options) {
        this.knex = knex(options)
    }

    addMessage(data) {
        return this.knex('messages').insert(data)
    }

    getMessageById(id) {
        return this.knex('messages').where({ id: id })
    }

    getAllMessages() {
        return this.knex('messages').select('*')
    }

    close() {
        this.knex.destroy()
    }
}

export default ChatContainer