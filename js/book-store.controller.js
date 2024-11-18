var gQueryOptions = {
  filterBy: { txt: '', rating: 0 },
  sortBy: {},
  page: { idx: 0, size: 5 },
}

var gSortDir = 1
var gBookId = null
var gLayout = null

function onInit() {
  // readQueryParams()
  renderBooks()
}

function renderBooks() {
  const books = getBooks(gQueryOptions)
  elList = document.querySelector('.book-list-modal')
  elCards = document.querySelector('.book-card-modal')

  if (gLayout === 'card') {
    renderBooksByCards(books)
    elList.classList.add('hide')
    elCards.classList.remove('hide')
  } else {
    renderBooksByList(books)
    elList.classList.remove('hide')
    elCards.classList.add('hide')
  }
}

function renderBooksByList(books) {
  const elBookList = document.querySelector('tbody')

  const strHtmls = books.map(
    (book) => `
       <tr>
      <td>${book.txt}</td>
      <td><span>${book.price}</span></td>
      <td><span>${book.author}</span></td>
      <td><span>${book.rating}</span></td>
      <td><button onclick="onReadBook('${book.id}')">Details</button>
      <button onclick="onUpdateBook(event, '${book.id}')">Update</button>
      <button onclick="onRemoveBook(event, '${book.id}')">Delete</button></td>
    </tr>
  `
  )

  elBookList.innerHTML = strHtmls.join('')
}

function renderBooksByCards(books) {
  const elModal = document.querySelector('.book-card-modal')
  const elPrice = document.querySelector('.book-card-modal h3')
  const elImg = document.querySelector('.book-card-modal img')
  const elBtn = document.querySelector('.btn')

  const strHtmls = books.map(
    (book) => `<div class="card">
      <h2 class="book-title">${book.txt}</h2>
      <h3>Price: ${book.price}</h3>
      <h3>Rating: ${book.rating}</h3>
      <img src="${book.imgUrl}" alt="Cover IMG">
    <button onclick="onReadBook('${book.id}')">Details</button>
      <button onclick="onUpdateBook(event, '${book.id}')">Update</button>
      <button onclick="onRemoveBook(event, '${book.id}')">Delete</button>
      </div>`
  )
  elModal.innerHTML = strHtmls.join('')
}

function onRemoveBook(ev, bookId) {
  ev.stopPropagation()
  //Model
  removeBook(bookId)

  //DOM
  renderBooks()
}

function onUpdateBook(ev, bookId) {
  gBookId = bookId

  const elModal = document.querySelector('.book-modal')

  elModal.showModal()
}

function onAddBook(ev) {
  gBookId = null

  const elModal = document.querySelector('.book-modal')

  elModal.showModal()
}

function onReadBook(bookId) {
  const elBookModal = document.querySelector('.book-details')

  const book = getBook(bookId)
  elBookModal.querySelector('.book-details h3').innerText = book.txt
  elBookModal.querySelector('.book-details pre').innerText = book.desc
  elBookModal.querySelector('.book-details img').src = book.imgUrl
  elBookModal.querySelector('.book-id').innerText = book.id
  elBookModal.querySelector('.rating').value = book.rating

  elBookModal.dataset.bookId = bookId
  elBookModal.showModal()
}

function onCloseModal(modal) {
  const elModal = document.querySelector(modal)

  elModal.close()
}
// function onCloseModaDetails(ev) {
//   ev.stopPropagation()

//   const elModal = document.querySelector('.book-details')

//   elModal.close()
// }

function onSaveBook() {
  const elForm = document.querySelector('.book-modal form')

  const elBookTitle = elForm.querySelector('.book-title')
  const elBookPrice = elForm.querySelector('.book-price')
  const elBookAuthor = elForm.querySelector('.book-author')
  const elBookUrl = elForm.querySelector('.book-url')

  const title = elBookTitle.value
  const price = +elBookPrice.value
  const author = elBookAuthor.value
  var url = elBookUrl.value

  if (!title || !price || !author) return

  if (!url)
    url =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTMI5yf9vYw85Q9Qr4kI3HH-qHdza7Gzp5HQ&s'

  if (gBookId) {
    updateBook(gBookId, title, price, author, url)
  } else {
    addBook(title, price, author, url)
  }
  // clearDialog()
  renderBooks()
  elForm.reset()
}

function clearDialog() {
  const elForm = document.querySelector('.book-modal')

  const elBookTitle = elForm.querySelector('.book-title')
  const elBookPrice = elForm.querySelector('.book-price')
  const elBookAuthor = elForm.querySelector('.book-author')
  const elBookUrl = elForm.querySelector('.book-url')

  elBookTitle.value = ''
  elBookPrice.value = ''
  elBookAuthor.value = ''
  elBookUrl.value = ''
}

function switchDesplay(display) {
  gLayout = display
  console.log('display', display)
  renderBooks()
}

function onChangeRating() {
  const elBookId = document.querySelector('.book-id').innerText
  const bookId = getBook(elBookId)
  const ratingValue = document.querySelector('.rating').value
  bookId.rating = ratingValue

  renderBooks()
}

function onFilterBy(ev) {
  ev.preventDefault()
  const filterValue = document.querySelector('.search-book input').value
  gQueryOptions.filterBy.txt = filterValue
  renderBooks()
}

function onSetSortBy(sortDir) {
  const elSortField = document.querySelector('select')
  const sortField = elSortField.value
  if (sortDir) gSortDir = sortDir
  else if (!sortDir) sortDir = gSortDir
  console.log('sortDir', sortDir)
  console.log('sortField', sortField)
  gQueryOptions.sortBy = { [sortField]: sortDir }
  // setQueryParams()
  renderBooks()
}

function onSetFilterByRating(rating) {
  gQueryOptions.filterBy.rating = rating.minRating
  renderBooks()
}
function onSwitchPage(diff) {
  const pageCount = getPageCount(gQueryOptions)

  var newPageIdx = gQueryOptions.page.idx + diff
  if (newPageIdx >= pageCount) newPageIdx = 0
  if (newPageIdx < 0) newPageIdx = pageCount - 1

  gQueryOptions.page.idx = newPageIdx

  renderBooks()
}

// function readQueryParams() {
//   const queryParams = new URLSearchParams(window.location.search)

//   gQueryOptions.filterBy = {
//     txt: queryParams.get('title') || '',
//     rating: +queryParams.get('rating') || 0,
//   }

//   if (queryParams.get('sortField')) {
//     const sortField = queryParams.get('sortField')
//     const sortDir = +queryParams.get('sortDir')
//     gQueryOptions.sortBy[sortField] = sortDir
//   }

//   if (queryParams.get('pageIdx')) {
//     gQueryOptions.page.idx = +queryParams.get('pageIdx')
//     gQueryOptions.page.size = +queryParams.get('pageSize')
//   }

//   renderQueryParams()
// }

// function renderQueryParams() {
//   document.querySelector('.title').value = gQueryOptions.filterBy.txt
//   document.querySelector('.rating').value = gQueryOptions.filterBy.rating

//   const sortKeys = Object.keys(gQueryOptions.sortBy)
//   const sortField = sortKeys[0]
//   const sortDir = gQueryOptions.sortBy[sortKeys[0]]

//   document.querySelector('.sort-by select').value = sortField || ''
//   document.querySelector('.sort-by input').checked = sortDir === -1
// }

// function setQueryParams() {
//   const queryParams = new URLSearchParams()

//   queryParams.set('title', gQueryOptions.filterBy.txt)
//   queryParams.set('rating', gQueryOptions.filterBy.minSpeed)

//   const sortKeys = Object.keys(gQueryOptions.sortBy)
//   if (sortKeys.length) {
//     const sortField = sortKeys[0]
//     queryParams.set('sortField', sortField)
//     queryParams.set('sortDir', gQueryOptions.sortBy[sortField])
//   }

//   if (gQueryOptions.page) {
//     queryParams.set('pageIdx', gQueryOptions.page.idx)
//     queryParams.set('pageSize', gQueryOptions.page.size)
//   }

//   const newUrl =
//     window.location.protocol +
//     '//' +
//     window.location.host +
//     window.location.pathname +
//     '?' +
//     queryParams.toString()

//   window.history.pushState({ path: newUrl }, '', newUrl)
// }
