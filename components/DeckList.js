import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getDecks } from '../api'
import { receiveDecks } from '../actions'
import { blue, brown, purple, red, yellow } from '../colors'

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
        <Text style={styles.deckHeading}>{deck.title}</Text>
        <Text style={styles.deckDetail}>Questions: {deck.questions.length}</Text>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: brown
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    color: yellow,
    borderRadius: 10,
    height: 100,
    width: '90%',
    marginVertical: 10,
    backgroundColor: purple,
  },
  deckHeading: {
    color: yellow,
    fontSize: 30
  },
  deckDetail: {
    color: '#F0B7A4',
  }
})