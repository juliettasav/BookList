// document.addEventListener('DOMContentLoaded', getBooksFromLocalStorage);

// function getBooksFromLocalStorage() {
//     let books;
//     if(localStorage.getItem('books') === null) {
//         books = [];
//     } else {
//         books = JSON.parse(localStorage.getItem('books'));
//     }

//     books.forEach(book => {
//         const list = document.querySelector('#book-list');
//         const rowTable = document.createElement('tr');

//         rowTable.innerHTML = `
//         <td>${book.title}</td>
//         <td>${book.author}</td>
//         <td>${book.code}</td>
//         <td><a href="#" class="delete"><i class="fa fa-remove"></i></a></td>
//     `
//     list.appendChild(rowTable);

//     })
    
// }

class Book {
    constructor(title, author, code) {
        this.title = title;
        this.author = author;
        this.code = code;
    }
}


class UI {
    addBookToList(book) {

    const list = document.querySelector('#book-list');
    const rowTable = document.createElement('tr');
    // 
    rowTable.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.code}</td>
        <td><a href="#" class="delete"><i class="fa fa-remove"></i></a></td>
    `
    list.appendChild(rowTable);

    }



    deleteBook(target) {

        if(target.parentElement.classList.contains('delete')) {
            target.parentElement.parentElement.parentElement.remove();
            
        }
        
    }


    showAlert(message, className) {

        const error = document.createElement('div');
        const div = document.querySelector('.container');
        const form = document.querySelector('form');
        error.className = `alert alert-${className}`;
        error.appendChild(document.createTextNode(message));
        div.insertBefore(error, form);

    }

    clearFields() {
        document.querySelector('#book-title').value = ''; 
        document.querySelector('#book-author').value = ''; 
        document.querySelector('#book-isbn').value = '';  
    }

    clearError() {
        document.querySelector('.alert').remove();
    }

}

// Local storage 

class Store {
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;

    }

    static displayBooks(){
        const books = Store.getBooks();
        books.forEach(book => {
            const list = document.querySelector('#book-list');
        const rowTable = document.createElement('tr');

        rowTable.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.code}</td>
        <td><a href="#" class="delete"><i class="fa fa-remove"></i></a></td>
        `
        list.appendChild(rowTable);

        })
    }

    static addBook(book){
        const books = Store.getBooks();

        books.push(book)

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(target){
        const books = Store.getBooks();
        
        books.forEach((item, index) => {
            
            if(item.code === target) {
                books.splice(index, 1);
            }
            
        })

        localStorage.setItem('books', JSON.stringify(books));
        
        
    }
}


// DOM Load Event 

document.addEventListener('DOMContentLoaded', Store.displayBooks);


document.querySelector('.btn').addEventListener('click', function (e) {

    const title = document.querySelector('#book-title').value,
        author = document.querySelector('#book-author').value,
        code = document.querySelector('#book-isbn').value;
        
    const newBook = new Book(title, author, code);

    const ui = new UI();

    if(title === '' || author === '' || code === '') {
        ui.showAlert('Please fill all fields', 'danger');
        setTimeout(ui.clearError, 2000);
    } else {
        ui.addBookToList(newBook);
        Store.addBook(newBook);
        ui.clearFields();
    }
    
    e.preventDefault();
});


// Evenet Delegation 

document.querySelector('#book-list').addEventListener('click', function(e) {

    const ui = new UI();
    ui.deleteBook(e.target);

    // remove from local storage

    Store.removeBook(e.target.parentElement.parentElement.previousElementSibling.textContent);

    ui.showAlert('This book was successfully removed', 'success');
    setTimeout(ui.clearError, 2000);
     
 
    e.preventDefault();
});

