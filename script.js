function Book(name, author, pages, read) {   // Constructor for book objects.
	this.name = name;
	this.pages = pages;
	this.author = author;
	this.read = read;

}

Book.prototype.info = function () {
	return (`${this.name} by ${this.author}, ${this.pages} pages, ${this.read}`);
};


const coolBook = new Book("Harry Potter", "JR Tolkein", 332, "not read yet :(");
//console.log(coolBook.info());

const badBook = new Book("bad book", "POPO Tolkein", 33, " read :)");

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

function displayBookCards() {
	for (let i = 0; i < myLibrary.length; i++) {
		let bookCard = bookCardTemplate.cloneNode(true);
		bookshelf.appendChild(bookCard);
		bookCard.setAttribute("data-bookIndex", i)
		console.log(bookCard.childNodes);


		let name, author, pages, read, remove;

		bookCard.childNodes.forEach( (element) => {
			if(element.classList[0] === "name"){
				name = element;
			}
		})
		bookCard.childNodes.forEach( (element) => {
			if(element.classList[0] === "author"){
				author = element;
			}
		})
		bookCard.childNodes.forEach( (element) => {
			if(element.classList[0] === "pages"){
				pages = element;
			}
		})
		bookCard.childNodes.forEach( (element) => {
			if(element.classList[0] === "read-status"){
				read = element;
			}
		})
		bookCard.childNodes.forEach( (element) => {
			if(element.classList[0] === "remove"){
				remove = element;
			}
		})

		name.textContent = myLibrary[i].name;
		author.textContent = myLibrary[i].author;
		pages.textContent = myLibrary[i].pages;
		read.textContent = myLibrary[i].read;
		remove.textContent = "Remove";
		//add all the content to those cards.
	}
	

}


function addBookEntry(event){


	event.preventDefault();		//prevents default form behavior i.e. sending the data to a server.

	let formData = new FormData(bookForm);		//create a formData object using its constructor and passing in my forms node as the argument. 	
	console.log(formData.get("read"));		//formData.get gets the data associated with a particular input, that was submitted. 

	myLibrary.push(new Book(formData.get("name"), formData.get("author"), formData.get("pages"), formData.get("read")));

	console.log(myLibrary);
	
} 


let bookForm = document.querySelector("form.add-book-form");

let addBookButton = document.querySelector(".add-book-btn");

addBookButton.addEventListener("click", displayBookCards);
console.log(addBookButton);

bookForm.addEventListener("submit", addBookEntry);


//displayBookCards();

