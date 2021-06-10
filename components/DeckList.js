import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getDecks } from '../api'
import { receiveDecks } from '../actions'

export default function DeckList(props) {
  const decks = useSelector(state => {
    return state
  })
  const dispatch = useDispatch()

  useEffect(() => {
    getDecks()
      .then((decks) => {
        dispatch(receiveDecks(decks))
      })
  }, [])

  return (
    <View style={styles.container}>
      <Text>DeckList</Text>
      {Object.keys(decks).map((deckName) => {
        const deck = decks[deckName]
        return (
          <DeckListItem 
            key={deck.title}
            deck={deck}
            linkTo={() => props.navigation.navigate('Deck', {deckId: deck.title})}
          />
        )
      })
      }
    </View>
  )
}

function DeckListItem({ deck, linkTo }) {
  return (
    <TouchableOpacity 
      style={styles.item} 
      onPress={linkTo}
    >
        <Text>{deck.title}</Text>
        <Text>Total Questions: {deck.questions.length}</Text>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    height: 100,
    width: '90%',
    marginVertical: 10,
    backgroundColor: 'orange',
  }
})