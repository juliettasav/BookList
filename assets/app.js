
function Book (title, author, code) {
        this.title = title;
        this.author = author;
        this.code = code;
}

function UI(){};

UI.prototype.addBookToList = function(book) {
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

UI.prototype.clearFields = function() {
    document.querySelector('#book-title').value = ''; 
    document.querySelector('#book-author').value = ''; 
    document.querySelector('#book-isbn').value = '';   
}

UI.prototype.showAlert = function(message, className) {
    const error = document.createElement('div');
    const div = document.querySelector('.container');
    const form = document.querySelector('form');
    error.className = `alert alert-${className}`;
    error.appendChild(document.createTextNode(message));
    
    div.insertBefore(error, form);

    // setTimeout(clearError, 3000);
     
}

UI.prototype.clearError = function() {
    document.querySelector('.alert').remove();
}

UI.prototype.deleteBook = function(target) {
    if(target.parentElement.classList.contains('delete')) {
            target.parentElement.parentElement.parentElement.remove();
          }

    
}




document.querySelector('.btn').addEventListener('click', addBook);


function addBook(e) {

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
        ui.clearFields();
    }

    
    
    e.preventDefault();
}

// Evenet Delegation 

document.querySelector('#book-list').addEventListener('click', function(e) {

    const ui = new UI();

    ui.deleteBook(e.target);
    ui.showAlert('This book was successfully removed', 'success');
    setTimeout(ui.clearError, 2000);
     
 
    e.preventDefault();
});

