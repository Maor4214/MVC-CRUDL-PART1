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
            <button onclick="onRemoveBook(event, '${book.id}')">x</button>
        </li>`
  )
  elBookList.innerHTML = strHtmls.join('')
}
