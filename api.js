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
    .then((decks) => decks.title)
    .then((deck) => {
      return AsyncStorage.mergeItem(KEY, 
        {
          ...deck,
          questions: deck.questions.concat(card)
        }
      )
    })
}

AsyncStorage.setItem('mobile-flashcards', 
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
    'Javascript': {
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