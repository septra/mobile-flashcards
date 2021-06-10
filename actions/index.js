export const RECEIVE_INITIAL_DATA = 'RECEIVE_INITIAL_DATA'
export const ADD_CARD = 'ADD_CARD'
export const ADD_DECK = 'ADD_DECK'

export function receiveDecks(decks) {
  return {
    type: RECEIVE_INITIAL_DATA,
    decks
  }
}

export function addDeck(title) {
  return {
    type: ADD_DECK,
    title
  }
}

export function addCard(title, card) {
  return {
    type: ADD_CARD,
    title,
    card,
  }
}