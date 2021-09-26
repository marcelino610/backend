class User {
    constructor(name, surname, books, pets) {
        this.name = name;
        this.surname = surname;
        this.books = books;
        this.pets = pets;
    }

    getFullName() {
        return `${this.name} ${this.surname}`
    }

    addPet(pet) {
        this.pets.push(pet);
    }

    countPets() {
        return this.pets.length;
    }

    addBook(title, author) {
        this.books.push({'title': title, 'author': author})
    }

    getBooksNames() {
        return this.books.map(el => el.title);
    }
}

let booksList = [
    {
        title: 'El Aleph',
        author: 'Josrge Luis Borges'
    },
    {
        title: 'El juego de los abalorios',
        author: 'Hermann Hesse'
    },
    {
        title: 'Fausto',
        author: 'Johann Wolfgang von Goethe'
    },
];
let petsList = ['Jerry', 'Tom']

let user = new User('Marcelino', 'Bazzana Sosa', booksList, petsList);

user.addBook('Der Staat im dritten Jahrtausend', 'Hans Adam II');
user.addPet('Lucas');

console.log(user.getFullName());
console.log(user.getBooksNames());
console.log(user.countPets());