import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

const decks = {
  React: {
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
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

export default function DeckList(props) {
  return (
    <View style={styles.container}>
      <Text>DeckList</Text>
      {decks.map((deck) => (
        <TouchableOpacity 
          style={styles.item} 
          onPress={() => props.navigation.navigate('Deck', {deckId: deck.id})}
        >
          <View key={deck.id}>
                <Text>{deck.name}</Text>
          </View>
        </TouchableOpacity>
      ))
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    flex: 1,
    height: 50,
    width: '90%',
    marginVertical: 10,
    backgroundColor: 'orange',
  }
})