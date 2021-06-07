import React from 'react'
import { Text, View } from 'react-native'

export default function Deck(props) {
  return (
    <View>
      <Text>
        {props.route.params.deckId}
      </Text>
    </View>
  )
}
