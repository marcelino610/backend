console.log('conectado')
const socket = io.connect()

const htmlCompiler = (prods, length) => {
    let html = ''
    if (length) {
        prods.forEach(el => {
            html += `
            <tr>
                <td>${el.nombre}</td>
                <td>$ ${el.precio}</td>
                <td>
                    <img src="${el.imagen}" class="img-fluid" alt="img">
                </td>
            </tr>
            `
        })
    } else {
        html = `<td colspan="3">No hay productos</td>`
    }
    return document.querySelector('tbody').innerHTML = html
}

socket.on('load-products', data => {
    htmlCompiler(data.products, data.anyProduct)
})

socket.on('new-msg', data => {
    document.getElementById('msgs').innerHTML += `
    <p style="color: brown;"><b style="color: blue !important;">${data.email}</b> [${data.date}]: <i style="color: green !important;">${data.message}</i></p>
    `
})

socket.on('load-fake-products', data => {
    console.log('lfp')
    htmlCompiler(data.fakeProds, true)
})

document.getElementById('save-prod') && document.getElementById('save-prod').addEventListener('submit', ev => {
    ev.preventDefault()
    socket.emit('save-prod', {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value,
    })
})

document.getElementById('send-message') && document.getElementById('send-message').addEventListener('submit', ev => {
    ev.preventDefault()
    const email = document.getElementById('msg-email').value
    if (email && email != '') {
        socket.emit('send-message', {
            date: new Date().toLocaleString(),//Date.now(),
            email: email,
            message: document.getElementById('msg-message').value
        })
        document.getElementById('msg-message').value = ''
    } else {
        alert('Para participar en el chat debés proporcionar un correo de contacto')
    }
})

// document.addEventListener('load', () => {
//     socket.emit('connection')
// })