import React, { useState } from 'react'
import { Text, View, SafeAreaView, TextInput } from 'react-native'
import { addCardToDeck } from '../api';
import { Button } from './Deck'
import {CommonActions} from '@react-navigation/native';
import { addCard } from '../actions';
import { useDispatch } from 'react-redux';

export default function NewQuestion(props) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const dispatch = useDispatch()

  const handleSubmit = () => {
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

  return (
    <SafeAreaView>
      <TextInput
        onChangeText={setQuestion}
        value={question}
        placeholder="Question"
      />
      <TextInput
        onChangeText={setAnswer}
        value={answer}
        placeholder="Answer"
      />
      <Button text="Submit" onPress={() => handleSubmit()} />
    </SafeAreaView>
  );
}
