
const newBook           = document.getElementById("newBook");
const newBookForm       = document.getElementById("newBookForm");
const newBookSubmit     = document.getElementById("submit");
const displayBoard      = document.getElementById("displayBoard");
let myLibrary           = [];

class Book {
    constructor(author, title, pages, read) {
        this.author     = author;
        this.title      = title;
        this.pages      = pages;
        this.read       = read;
    }
};

function addBookToLibrary(event) {
    const author    = document.getElementById("author").value;
    const title     = document.getElementById("title").value;
    const pages     = document.getElementById("pages").value;
    const read      = document.getElementById("read").checked;

    myLibrary.push(new Book(author, title, pages, read));
    displayLibrary();
    event.preventDefault();
    toggleNewBookForm();
};

function displayLibrary() {
    displayBoard.innerHTML  = "";    // clear displayBoard

    myLibrary.forEach((value, index, array) => {
        const card = document.createElement("div");
        card.classList = "displayCard";
        card.innerHTML = `<h3 class='displayCard-center'>${value.title}</h3>`;
        card.innerHTML += `<p>Author:</p><p>${value.author}</p>`;
        card.innerHTML += `<p>Pages:</p><p>${value.pages}</p>`;
        // card.innerHTML += value.read ? "<p class='displayCard-center'>Book Complete</p>" : "<p class='displayCard-center'>Book Unfinished</p>";
        card.innerHTML += value.read ? `<button class='displayCard-center book-status read'data-bookindex=${index}>Book Completed</button>` : `<button class='displayCard-center book-status unread' data-bookindex=${index}>Book Unfinished</button>`;
        card.innerHTML += `<button class='displayCard-center button-remove' data-bookindex=${index}>Remove</button>`;

        displayBoard.append(card);
    });
};

function removeBook(bookIndex) {
    myLibrary.splice(bookIndex, 1);
    displayLibrary();
};

function toggleNewBookForm() {
    newBookForm.classList.toggle("hidden-newBook");
}

function testBooks() {
    myLibrary.push(new Book("Author1", "Title1", 234, true));
    myLibrary.push(new Book("Author2", "Title2", 134, false));
    myLibrary.push(new Book("Author3", "Title3", 834, false));
};

function toggleReadStatus(index) {
    myLibrary[index].read = !myLibrary[index].read;
    displayLibrary();
};

// Event Listeners
newBook         .addEventListener("click", toggleNewBookForm, false);
newBookSubmit   .addEventListener("click", addBookToLibrary, false);

displayBoard.addEventListener(
    "click",
    (e) => {
        if (e.target.classList.contains("button-remove")) {
            // Remove book from myLibrary and displayBoard
            removeBook(e.target.dataset.bookindex);
        }
        else if (e.target.classList.contains("book-status")) {
            // Toggle book read status
            toggleReadStatus(e.target.dataset.bookindex);
        }
    },
    false
);

// Testing
// testBooks();
// displayLibrary();
