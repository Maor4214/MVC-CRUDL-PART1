'use strict'

var gBooks = []
_createBooks()

function getBooks() {
  return gBooks
}

function _createBooks() {
  gBooks = [
    _createBook('I KILL', '40$', 'Giorgio Faletti'),
    _createBook('Gone Girl', '35', 'Gillian Flynn'),
    _createBook('Goosebumps', '15$', 'R. L Stine'),
    _createBook('The Farm', '20$', 'Tom Rob Smith'),
  ]
}

function _createBook(txt, price, author) {
  return {
    id: makeId(),
    txt,
    price,
    author,
  }
}

function removeBook(bookId) {
  const bookIdx = gBooks.findIndex((book) => book.id === bookId)
  gBooks.splice(bookIdx, 1)
}
