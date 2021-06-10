export const RECEIVE_INITIAL_DATA = 'RECEIVE_INITIAL_DATA'
export const ADD_CARD = 'ADD_CARD'

export function receiveDecks(decks) {
  return {
    type: RECEIVE_INITIAL_DATA,
    decks
  }
}

export function addCard(title, card) {
  return {
    type: ADD_CARD,
    title,
    card,
  }
}