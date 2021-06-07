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