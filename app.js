//Book Constructor
function Book(title,author,isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

//UI Constructor 
function UI(){}

//add book to list
UI.prototype.addBookToList = function(book){
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

//clear fields 
UI.prototype.clearFields = function(){
    document.getElementById('title').value='';
    document.getElementById('author').value='';
    document.getElementById('isbn').value='';
}

//show Alert
UI.prototype.showAlert = function(msg,className){
    const divShow = document.querySelector('.showDialog');
    divShow.style.backgroundColor =(className==='error')?'red': 'green';
    divShow.style.display = 'flex';
    divShow.textContent = msg;  
  //  console.log(divShow);
    setTimeout(function(){
        divShow.style.display = 'none';  
    },2000);
}

//delete book
UI.prototype.deleteBook = function(target){
    console.log(target);
    console.log(target.parentElement.parentElement);
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}

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
