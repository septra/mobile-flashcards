import React, { useState } from 'react'
import { Text, View, SafeAreaView, TextInput } from 'react-native'
import { saveDeckTitle } from '../api';
import { Button } from './Deck'
import {CommonActions} from '@react-navigation/native';
import { addDeck } from '../actions';
import { useDispatch } from 'react-redux';

export default function AddDeck(props) {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch()

  const handleSubmit = () => {
    saveDeckTitle(title)
      .then(() => {
        dispatch(addDeck(title))
      })
    props.navigation.dispatch(CommonActions.goBack({
      key: 'Deck'
    }))
  }

  return (
    <SafeAreaView>
      <TextInput
        onChangeText={setTitle}
        value={title}
        placeholder="Enter New Deck Title"
      />
      <Button text="Submit" onPress={() => handleSubmit()} />
    </SafeAreaView>
  );
}
