import Contenedor from './entrega-clase-2.js';

const objeto1 = {
    title: '\'16 Bugatti Chiron',
    price: 700,
    thumbnail: 'https://media.mattel.com/root/HWCarsCatalog/Web/MainImage/FYB49_W_19_003.png',
}
const objeto2 = {
    title: 'Audi R8 Spyder',
    price: 700,
    thumbnail: 'https://media.mattel.com/root/HWCarsCatalog/Web/MainImage/GHB28_W_20_003.png',
}
const objeto3 = {
    title: 'Ford Mustang Shelby GT500',
    price: 700,
    thumbnail: 'https://media.mattel.com/root/HWCarsCatalog/Web/MainImage/GHB32_W_20_003.png',
}
const objeto4 = {
    title: 'Lamborghini Urus',
    price: 700,
    thumbnail: 'https://media.mattel.com/root/HWCarsCatalog/Web/MainImage/GRY29_W_20_003.png',
}
const objeto5 = {
    title: '2016 Mercedes AMG GT',
    price: 700,
    thumbnail: 'https://media.mattel.com/root/HWCarsCatalog/Web/MainImage/FXB15_c_19_003.png',
}


let resultados = new Contenedor('productos.txt');


resultados.save(objeto1);
resultados.save(objeto2);//si quiero hacerlo asíncrono, usar writeFile y .then al cargar segundo elemento en adelante
resultados.save(objeto3);
resultados.save(objeto4);
resultados.save(objeto5);
console.log('.save() fucniona correctamente')
console.log('\n-----------------\n');

console.log('Búsqueda por id = 2', resultados.getById(2));
console.log('Búsqueda por id = 17', resultados.getById(17));
console.log('.getById() funciona correctamente');
console.log('\n-----------------\n');

console.log(resultados.getAll())
console.log('.getAll() funciona correctamente');
console.log('\n-----------------\n');

console.log('Antes de eliminar', resultados.getById(3))
resultados.deleteById(3);
console.log('Después de eliminar', resultados.getById(3))
resultados.getById(3) === null ? console.log('.deleteById() funciona correctamente') : console.log('.deleteById() NO funciona correctamente');
console.log('\n-----------------\n');

resultados.deleteAll();
console.log('Llamado a .getAll() luego de .deleteAll(): ', resultados.getAll())
resultados.getAll().length === 0 ? console.log('.deleteAll() funciona correctamente') : console.log('.deleteAll() NO funciona correctamente');