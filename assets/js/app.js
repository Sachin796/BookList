//Book Constructor

function Book(title, author, ISBN) {
  this.title = title;
  this.author = author;
  this.isbn = ISBN;
}

//UI Constructor
function UI() {
  UI.prototype.addBookToList = function(book) {
    const list = document.getElementById("book-list");

    const row = document.createElement("tr");

    row.innerHTML = `<td>${book.title}</td><td>${book.author}</td><td>${
      book.isbn
    }</td><td><a href="#" class="delete">X</td>`;

    list.appendChild(row);
  };

  UI.prototype.showAlert = function(message, className) {
    //Create Div
    const div = document.createElement("div");
    //Add Classes
    div.className = `alert ${className}`;
    //Add text
    div.appendChild(document.createTextNode(message));
    //Get Parent
    const container = document.querySelector(".container");
    //Get form
    const form = document.querySelector("#book-form");
    //Create text node
    container.insertBefore(div, form);

    //Disappear after 3 seconds
    setTimeout(function() {
      document.querySelector(".alert").remove();
    }, 3000);
  };

  //Delete book
  UI.prototype.deleteBook=function(target)
  {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }

  UI.prototype.cleardata = function() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  };
}

//Event LIstener for add book
document.getElementById("book-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const titledata = document.getElementById("title").value;
  const authordata = document.getElementById("author").value;
  const isbndata = document.getElementById("isbn").value;

  //Instating Book-Create a new book object
  const book = new Book(titledata, authordata, isbndata);
  //After creating a book object the UI will display datat so creating a new UI object
  const ui = new UI();

  //Validation

  if (titledata === "" || authordata === "" || isbndata === "") {
    //Error Handling Alert
    ui.showAlert("Please Provide data", "error");
  } else {
    ui.addBookToList(book);
    ui.showAlert("Book added Sucessfully", "success");
    ui.cleardata();
document.getElementById('title').focus();  
}
});

//Event Listener for Delete
document.getElementById("book-list").addEventListener("click", function(e) {
  e.preventDefault();
  const ui = new UI();
  console.log(e.target)
  ui.deleteBook(e.target);
  //Show message
  ui.showAlert("Book Deleted successfully", "success");

});
