const compiler = (prods, length) => {
    let html = ''
    if (length) {
        prods.forEach(el => {
            let template = Handlebars.compile(`
            <tr>
                <td>{{title}}</td>
                <td>$ {{price}}</td>
                <td>
                    <img src="{{thumbnail}}" class="img-fluid" alt="img">
                </td>
            </tr>
            `)
            html += template(el)
        })
    } else {
        html = Handlebars.compile(`<td colspan="3">No hay productos</td>`)
    }
    return document.querySelector('tbody').innerHTML = html
}