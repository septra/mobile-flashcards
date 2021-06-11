import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput, KeyboardAvoidingView, AsyncStorage } from 'react-native'
import { saveDeckTitle } from '../api';
import {CommonActions} from '@react-navigation/native';
import { addDeck } from '../actions';
import { useDispatch } from 'react-redux';
import { styles, Button } from './Deck'
import { purple, red } from '../colors';

export default function AddDeck(props) {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch()

  const handleSubmit = () => {
    if (title === '') {
      alert('Please enter a deck name.')
    } else {
      saveDeckTitle(title)
        .then(() => {
          dispatch(addDeck(title))
        })
      setTitle('')
      props.navigation.navigate('Deck', {deckId: title})
    }
  }

  return (
      <KeyboardAvoidingView style={[styles.container, {justifyContent: 'center'}]}>
        <TextInput
          onChangeText={setTitle}
          value={title}
          placeholder="Enter New Deck Title"
          keyboardType='default'
          style={localStyles.textInput}
        />
        <Button style={{marginVertical: 10, width: '90%'}} text="Create Deck" onPress={() => handleSubmit()} />
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
