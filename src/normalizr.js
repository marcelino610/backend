import { schema, normalize } from 'normalizr'
import util from 'util'

const authorsSchema = new schema.Entity('author')//, { idAttribute: 'id' })
const messagesSchema = new schema.Entity('messages', {
    author: authorsSchema,
    idAttribute: 'text'
})
const chatSchema = new schema.Entity('chat', {
    messages: messagesSchema
})

function print(objeto) {
    console.log('Objeto normalizado: ', util.inspect(objeto, false, 12, true))
}

async function normalizeChat(obj) {
    const normObj = normalize(obj, chatSchema)
    print(normObj)
    console.log('Longitud objeto original:  ', JSON.stringify(obj).length);
    console.log('Longitud objeto normalizado: ', JSON.stringify(normObj).length);
    return normObj
}

async function denormalizeChat(obj) {

}

export { normalizeChat, denormalizeChat }