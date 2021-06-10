import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'

export default function Deck(props) {
  const { deck } = useSelector(decks => {
    const deck = decks[props.route.params.deckId]
    return {
      deck
    }
  })
  return (
    <View style={styles.container}>
      <Text style={{alignSelf:'center'}}>
        {deck.title}
      </Text>
      <Text style={{alignSelf:'center'}}>
        Total Cards: {deck.questions && deck.questions.length}
      </Text>
      <Button 
        text="Start Quiz"
        onPress={() => props.navigation.navigate('Quiz', {deckId: props.route.params.deckId})} 
      />
      <Button 
        text="Add Question" 
        onPress={() => props.navigation.navigate('NewQuestion', {deckId: props.route.params.deckId})} 
      />
    </View>
  )
}

export function Button({ onPress, text }) {
    return (
        <TouchableOpacity
            style={Platform.OS == 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
            onPress={onPress}
        >
            <Text style={styles.submitBtnText}>{text}</Text>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 20,
  },
  row: {
      flexDirection: 'row',
      flex: 1,
      alignItems: 'center'
  },
  iosSubmitBtn: {
      // backgroundColor: purple,
      padding: 10,
      borderRadius: 7,
      height: 45,
      marginLeft: 40,
      marginRight: 40,
  },
  androidSubmitBtn: {
      // backgroundColor: purple,
      padding: 10,
      paddingLeft: 30,
      paddingRight: 30,
      height: 45,
      borderRadius: 2,
      alignSelf: 'flex-end',
      justifyContent: 'center',
      alignItems: 'center'
  },
  submitBtnText: {
      // color: white,
      fontSize: 22,
      textAlign: 'center'
  },
  center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 30,
      marginRight: 30
  }
})