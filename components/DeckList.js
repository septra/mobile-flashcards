import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

const decks = [
  {name: 'Deck 1', id: 'deck1'},
  {name: 'Deck 2', id: 'deck2'},
]

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