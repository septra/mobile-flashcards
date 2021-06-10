import { AsyncStorage } from "react-native";

KEY = 'mobile-flashcards'

export function getDecks() {
  return AsyncStorage.getItem(KEY)
    .then(JSON.parse)
}

export function getDeck(id) {
  return AsyncStorage.getItem(KEY)
    .then(JSON.parse)
    .then(({ id }) => id)
}

export function saveDeckTitle(id) {
  return AsyncStorage.mergeItem(KEY,
    JSON.stringify({
      [id]: {
        title: id,
        questions: []
      }
    })
  )
}

export function addCardToDeck(title, card) {
  return AsyncStorage.getItem(KEY)
    .then(JSON.parse)
    .then((decks) => {
      const np = JSON.stringify({
          ...decks,
          [title]: {
            ...decks[title],
            questions: decks[title].questions.concat(card)
          } 
        })
      return AsyncStorage.setItem(KEY, np)
    })
}

// Seed data if not already there.
AsyncStorage.getItem(KEY)
  .then(JSON.parse)
  .then((data) => {
    if (data === null) {
      AsyncStorage.setItem(KEY, 
        JSON.stringify({
          'React': {
            title: 'React',
            questions: [
              {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
              },
              {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
              }
            ]
          },
          'JavaScript': {
            title: 'JavaScript',
            questions: [
              {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
              }
            ]
          }
        })
      )
    }
  })