'use strict'

function makeId(length = 5) {
  var id = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    id += possible.charAt(getRandomInt(0, possible.length))
  }

  return id
}

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled) // The maximum is exclusive and the minimum is inclusive
}

function makeLorem(wordCount = 100) {
  let str = ''
  let isNewSentence = true

  for (let i = 0; i <= wordCount; i++) {
    if (isNewSentence) {
      str += getWord(true) + ' '
      isNewSentence = false
    } else {
      str += getWord(false) + ' '
      if (!(wordCount % (i + 2))) {
        str += '.\n'
        isNewSentence = true
      }
    }
  }
  return str
}

function getWord(isUpperCase) {
  const chars = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
  ]
  const length = Math.floor(Math.random() * (5 - 2) + 2)
  let word = ''

  for (let i = 0; i <= length; i++) {
    word += chars[Math.floor(Math.random() * (25 - 0 + 1) + 0)]
  }

  if (isUpperCase) word = word.charAt(0).toUpperCase() + word.substring(1)
  return word
}
