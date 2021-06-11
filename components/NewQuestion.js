import React, { useState } from 'react'
import { Text, View, SafeAreaView, TextInput, KeyboardAvoidingView, StyleSheet } from 'react-native'
import { addCardToDeck } from '../api';
import { styles, Button } from './Deck'
import {CommonActions} from '@react-navigation/native';
import { addCard } from '../actions';
import { useDispatch } from 'react-redux';
import { brown, purple, red } from '../colors';

export default function NewQuestion(props) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const dispatch = useDispatch()

  const handleSubmit = () => {
    if (question === '' || answer === '') {
      alert('Please provide a question and an answer')
    } else {
      const card = {
        question,
        answer
      }
      const title = props.route.params.deckId
      addCardToDeck(title, card)
        .then(() => {
          dispatch(addCard(title, card))
        })
      props.navigation.dispatch(CommonActions.goBack({
        key: 'Deck'
      }))
    }
  }

  return (
    <KeyboardAvoidingView style={[styles.container, {justifyContent: 'flex-start'}]}>
      <TextInput
        onChangeText={setQuestion}
        value={question}
        placeholder="Question"
        style={localStyles.textInput}
      />
      <TextInput
        onChangeText={setAnswer}
        value={answer}
        placeholder="Answer"
        style={localStyles.textInput}
      />
      <Button style={{width: '90%'}} text="Submit" onPress={() => handleSubmit()} />
    </KeyboardAvoidingView>
  );
}

const localStyles = StyleSheet.create({
  textInput: {
    marginVertical: 10, 
    borderWidth: 1, 
    padding: 5, 
    borderColor: purple, 
    borderRadius: 10, 
    backgroundColor: red,
    width: '90%', 
    height: 40
  }
})