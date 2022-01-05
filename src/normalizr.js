import { schema, normalize, denormalize } from 'normalizr'
import util from 'util'

const authorsSchema = new schema.Entity('authors', { idAttribute: 'id' })
const messagesSchema = new schema.Entity('messages', {
    author: authorsSchema
}, { idAttribute: '_id' })
const chatSchema = new schema.Entity('chat', {
    messages: [messagesSchema]
})

function print(objeto) {
    console.log('Objeto normalizado: ', util.inspect(objeto, false, 12, true))
}

let normalizeChat = obj => {
    const normObj = normalize(obj, chatSchema)
    print(normObj)
    return normObj
}

export { normalizeChat, chatSchema }