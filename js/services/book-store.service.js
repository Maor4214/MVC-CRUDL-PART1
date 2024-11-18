'use strict'

const BOOKSDATA = 'books'
var gBooks = []
_createBooks()

function getBooks(options = {}) {
  const filterBy = options.filterBy
  const sortBy = options.sortBy
  const page = options.page

  var books = _filterBooks(filterBy)
  if (sortBy.title) {
    const bookSortDir = sortBy.title
    books = books.toSorted(
      (book1, book2) => book1.txt.localeCompare(book2.txt) * bookSortDir
    )
  }
  if (sortBy.maxPrice) {
    const bookSortDir = sortBy.maxPrice
    books = books.toSorted(
      (book1, book2) => book1.price.localeCompare(book2.price) * bookSortDir
    )
  }
  if (sortBy.maxRating) {
    const bookSortDir = sortBy.maxRating
    books = books.toSorted(
      (book1, book2) => book1.rating - book2.rating * bookSortDir
    )
  }

  const startIdx = page.idx * page.size
  const endIdx = startIdx + page.size
  books = books.slice(startIdx, endIdx)

  return books
}

function _createBooks() {
  gBooks = loadFromStorage(BOOKSDATA)
  if (gBooks && gBooks.length > 0) return

  gBooks = [
    _createBook(
      'I KILL',
      '40$',
      'Giorgio Faletti',
      'https://m.media-amazon.com/images/I/51YTHispVOL._AC_SY200_QL15_.jpg'
    ),
    _createBook(
      'Gone Girl',
      '35$',
      'Gillian Flynn',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-8YcDNgP1l5xuUliMw88ILo6FxT0HS_xJ5g&s'
    ),
    _createBook(
      'Goosebumps',
      '15$',
      'R. L Stine',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk8suVsAjqNnw8fvh6Fwr4cKQLaC1xRBVMSA&s'
    ),
    _createBook(
      'The Farm',
      '20$',
      'Tom Rob Smith',
      'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1391017911i/17557913.jpg'
    ),
    _createBook(
      'Blue Lock',
      '65$',
      'Muneyuki Kaneshiro',
      'https://upload.wikimedia.org/wikipedia/en/thumb/c/c6/Blue_Lock_manga_volume_1.png/220px-Blue_Lock_manga_volume_1.png'
    ),
    _createBook(
      'Don Quixote',
      '32$',
      'Miguel de Cervantes',
      'https://cdn.kobo.com/book-images/b2ece927-6fe1-40fd-8ee2-681e9c3fe4c3/1200/1200/False/don-quixote-101.jpg'
    ),
  ]
  _saveData()
}

function _createBook(txt, price, author, imgUrl) {
  return {
    id: makeId(),
    txt,
    price,
    author,
    desc: makeLorem(100),
    rating: getRandomInt(1, 6),
    imgUrl,
  }
}

function removeBook(bookId) {
  const bookIdx = gBooks.findIndex((book) => book.id === bookId)
  gBooks.splice(bookIdx, 1)
  _saveData()
}

function updateBook(bookId, title, price, author, url) {
  const bookIdx = gBooks.findIndex((book) => book.id === bookId)
  gBooks[bookIdx].txt = title
  gBooks[bookIdx].price = price + '$'
  gBooks[bookIdx].author = author
  gBooks[bookIdx].imgUrl = url
  _saveData()
}

function addBook(name, price, author, imgUrl) {
  const newBook = _createBook(name, price, author, imgUrl)
  gBooks.unshift(newBook)
  _saveData()
}

function _saveData() {
  saveToStorage(BOOKSDATA, gBooks)
}

function getBook(bookId) {
  const bookIdx = gBooks.find((book) => book.id === bookId)
  return bookIdx
}

function _filterBooks(filterBy) {
  var books = gBooks
  if (filterBy.txt)
    books = books.filter((book) =>
      book.txt.toLowerCase().includes(filterBy.txt.toLowerCase())
    )
  if (filterBy.rating)
    books = books.filter((book) => book.rating >= filterBy.rating)
  return books
}

function getPageCount(options) {
  const filterBy = options.filterBy
  const page = options.page

  const booksLength = _filterBooks(filterBy).length
  const pageCount = Math.ceil(booksLength / page.size)

  return pageCount
}
