import React, { useState } from 'react'
import { Text, View, SafeAreaView, TextInput } from 'react-native'
import { saveDeckTitle } from '../api';
import {CommonActions} from '@react-navigation/native';
import { addDeck } from '../actions';
import { useDispatch } from 'react-redux';
import { styles, Button } from './Deck'

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
      <View style={[styles.container, {justifyContent: 'center'}]}>
        <TextInput
          onChangeText={setTitle}
          value={title}
          placeholder="Enter New Deck Title"
          keyboardType='default'
        />
        <Button style={{marginVertical: 50, width: '90%'}} text="Submit" onPress={() => handleSubmit()} />
      </View>
  );
}
