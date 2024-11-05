var gFilterBy = ''

function onInit() {
  renderBooks()
}

function renderBooks() {
  const elBookList = document.querySelector('.book-list')
  const books = getBooks(gFilterBy)

  const strHtmls = books.map(
    (book) => `
        <li onclick="onToggleBook('${book.id}')">
            <span>${book.txt}</span>
            <button onclick="onShowBookDetails(event, '${book.id}')">Details</button>
            <button onclick="onUpdateBook(event, '${book.id}')">Update</button>
            <button onclick="onRemoveBook(event, '${book.id}')">x</button>
        </li>`
  )
  elBookList.innerHTML = strHtmls.join('')
}

function onRemoveBook(ev, bookId) {
  ev.stopPropagation()
  //Model
  removeBook(bookId)

  //DOM
  renderBooks()
}

function onUpdateBook(ev, bookId) {
  ev.stopPropagation()
  const newPrice = +prompt('Insert new price for the book:')
  updatePrice(newPrice, bookId)

  renderBooks()
}

function onAddBook(ev) {
  ev.preventDefault()

  const elInput = document.querySelector('.add-book input')
  const txt = elInput.value
  if (!txt) return

  const price = +prompt('Write the price of the book:') + '$'
  const author = prompt('Write the author of the book:')
  addBook(txt, price, author)

  renderBooks()
}
