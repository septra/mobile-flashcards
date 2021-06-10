import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, FlatList, SafeAreaView } from 'react-native'
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

  const renderItem = ({item}) => {
    const deck = item
    return (
      <TouchableOpacity 
        style={styles.item} 
        onPress={() => props.navigation.navigate('Deck', {deckId: deck.title})}
      >
        <Text style={styles.deckHeading}>{deck.title}</Text>
        <Text style={styles.deckDetail}>Questions: {deck.questions.length}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={Object.values(decks)}
        renderItem={renderItem}
        keyExtractor={item => item.title}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: brown
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    color: yellow,
    borderRadius: 10,
    height: 100,
    width: '90%',
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: purple,
    shadowColor: yellow,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 5,
    shadowOpacity: 1
  },
  deckHeading: {
    color: yellow,
    fontSize: 30
  },
  deckDetail: {
    color: '#F0B7A4',
  }
})