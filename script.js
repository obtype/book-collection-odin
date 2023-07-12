function Book(name, author, pages, read) {   // Constructor for book objects.
	this.name = name;
	this.pages = pages;
	this.author = author;
	this.read = read;

}

Book.prototype.info = function () {
	return (`${this.name} by ${this.author}, ${this.pages} pages, ${this.read}`);
};


const coolBook = new Book("Harry Potter", "JR Tolkein", 332, "read");
//console.log(coolBook.info());

const badBook = new Book("bad book", "POPO Tolkein", 33, "not read");

let myLibrary = [coolBook, badBook];



function addBookToLibrary() {
	let newBook = new Book(prompt("Enter book name."), "sdsd", 51, "roede");
	//console.log(newBook.info());

	myLibrary.push(newBook);


}

const bookshelf = document.querySelector("div.bookshelf");
let bookCardTemplate = document.createElement("div");
bookCardTemplate.classList.add("book-card");
bookCardTemplate.appendChild(document.createElement("div"));
bookCardTemplate.appendChild(document.createElement("div"));
bookCardTemplate.appendChild(document.createElement("div"));
bookCardTemplate.appendChild(document.createElement("button"));
bookCardTemplate.appendChild(document.createElement("button"));

let cardPieces = bookCardTemplate.childNodes;
cardPieces[0].classList.add("name");
cardPieces[1].classList.add("author");
cardPieces[2].classList.add("pages");
cardPieces[3].classList.add("read-status");
cardPieces[4].classList.add("remove");
//console.log(cardPieces);

function refreshBookCards() {

	while (bookshelf.firstChild) {
		bookshelf.removeChild(bookshelf.firstChild);		//removes all the cards that are already on the bookshelf.
	}


	for (let i = 0; i < myLibrary.length; i++) {


		let bookCard = bookCardTemplate.cloneNode(true);
		bookshelf.appendChild(bookCard);
		bookCard.setAttribute("data-bookindex", i)
		//console.log(bookCard.childNodes);


		let name, author, pages, read, remove;

		bookCard.childNodes.forEach((element) => {
			if (element.classList[0] === "name") {
				name = element;
			}
		})
		bookCard.childNodes.forEach((element) => {
			if (element.classList[0] === "author") {
				author = element;
			}
		})
		bookCard.childNodes.forEach((element) => {
			if (element.classList[0] === "pages") {
				pages = element;
			}
		})
		bookCard.childNodes.forEach((element) => {
			if (element.classList[0] === "read-status") {
				read = element;
			}
		})
		bookCard.childNodes.forEach((element) => {
			if (element.classList[0] === "remove") {
				remove = element;
			}
		})

		name.textContent = `Name: ${myLibrary[i].name}`;
		author.textContent = `Author: ${myLibrary[i].author}`;
		pages.textContent = `Pages: ${myLibrary[i].pages}`;
		read.textContent = myLibrary[i].read;
		remove.textContent = "remove";
		//add all the content to those cards.

		read.setAttribute("status", read.textContent);

		remove.addEventListener("click", removeBookEntry);
		read.addEventListener("click", toggleReadStatus)
	}


}


function addBookEntry(event) {


	event.preventDefault();		//prevents default form behavior i.e. sending the data to a server.

	let formData = new FormData(bookForm);		//create a formData object using its constructor and passing in my forms node as the argument. 	
	console.log(formData.get("read"));		//formData.get gets the data associated with a particular input, that was submitted. 

	myLibrary.push(new Book(formData.get("name"), formData.get("author"), formData.get("pages"), formData.get("read") ? "read" : "not read"));
	refreshBookCards();
	//console.log(myLibrary);

}

function removeBookEntry(event) {
	/* console.log(event.target.parentNode.getAttribute("data-bookindex")); */
	myLibrary.splice(event.target.parentNode.getAttribute("data-bookindex"), 1);
	refreshBookCards();
}

function toggleReadStatus(event) {
	console.log("help")

	if (event.target.getAttribute("status") === "read") {
		event.target.textContent = "not read";
		event.target.setAttribute("status", "not read");
		myLibrary[event.target.parentNode.getAttribute("data-bookindex")].read = "not read";
	}


	else if (event.target.getAttribute("status") === "not read") {
		event.target.textContent = "read";
		event.target.setAttribute("status", "read");
		myLibrary[event.target.parentNode.getAttribute("data-bookindex")].read = "read";
	}

}


function closePopup(event) {
	if (bookForm.style.display === "block") {

		if (!bookForm.contains(event.target) && !addBookButton.contains(event.target)) {

			bookForm.style.display = "none";
			bookForm.parentNode.parentNode.style.display = "none";

		}
	}
}




let bookForm = document.querySelector("form.add-book-form");

let addBookButton = document.querySelector(".add-book-btn");


addBookButton.addEventListener("click", () => {
	bookForm.style.display = "block";
	bookForm.parentNode.parentNode.style.display = "block";
});

bookForm.addEventListener("submit", addBookEntry);
/* bookForm.addEventListener("submit", refreshBookCards); */
bookForm.addEventListener("submit", () => {
	bookForm.style.display = "none";
	bookForm.parentNode.parentNode.style.display = "none";
})

document.addEventListener("click", closePopup);




refreshBookCards();

