//Book Class
class Book{
    constructor(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
    
}

//UI Class 
class UI{ 
    addBookToList(book){
        const list = document.getElementById('book-list');
        //Create tr element 
        const row = document.createElement('tr');
        //insert cols
        row.innerHTML=`
        <tr >
            <th>${book.title}</th>
            <th>${book.author}</th>
            <th>${book.isbn}</th>
            <th class="delete-tr"><a href="#" class="delete">X</a></th>
            </tr>
                `;
                list.appendChild(row);
    }
    clearFields(){
        document.getElementById('title').value='';
        document.getElementById('author').value='';
        document.getElementById('isbn').value='';
    }
    showAlert(msg,className){
        const divShow = document.querySelector('.showDialog');
        divShow.style.backgroundColor =(className==='error')?'red': 'green';
        divShow.style.display = 'flex';
        divShow.textContent = msg; 
      //  console.log(divShow);
        setTimeout(function(){
            divShow.style.display = 'none';  
        },2000);
    }
    deleteBook(target){
        console.log(target);
        console.log(target.parentElement.parentElement);
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove();
            Store.removeBook(target.parentElement.previousElementSibling.textContent);
        }
    }


}
// Local storage class
class Store{
    static displayBooks(){
        const books = this.getBooks();
        books.forEach(book => {
            const ui = new UI();
            //add Book to UI
            ui.addBookToList(book);
        });
    }
    static getBooks(){
        let books;
        if(localStorage.getItem('books')===null){
            books=[];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addBook(book){
        const books = this.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }
    static removeBook(isbn){
        const books = this.getBooks();
        books.forEach(function(book,index){
            console.log(book);
            console.log(book.isbn);
            if(book.isbn === isbn){

                books.splice(index,1);
            }
        });
        localStorage.setItem('books',JSON.stringify(books));
    }
}

//DOM Load event
document.addEventListener('DOMContentLoaded',Store.displayBooks());
//Event Listeners for add book
document.getElementById('book-form').addEventListener('submit',function(e){
    // console.log('test');
     e.preventDefault();
     const title = document.getElementById('title').value,
     author = document.getElementById('author').value,
     isbn = document.getElementById('isbn').value;
    //init book
     const book = new Book(title,author,isbn);
     // init UI
     const ui = new UI();
     //Validate
     if(title===''||author===''||isbn===''){
         //Error alert 
         ui.showAlert('Please fill in all fields','error');
     }else{
     //Add book 
     ui.addBookToList(book);
     //Add book in storage
     Store.addBook(book);
     //add book to list
     ui.showAlert('Book Added!','success');
     //clear fields
     ui.clearFields();
     //console.log(book);
     }
 
 
 
 });
 
 //event listener for delete
 document.getElementById('book-list').addEventListener('click',function(e){
     e.preventDefault();
     const ui = new UI();
    //Delete book
     ui.deleteBook(e.target);
     ui.showAlert('Book removed','success');
 
 });