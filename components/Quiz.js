import React, { useState } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import {CommonActions} from '@react-navigation/native';
import { Button, styles } from './Deck'
import { Card } from 'react-native-elements'
import { purple, red } from '../colors';

export default function Quiz(props) {

  const [viewAnswer, toggleAnswer] = useState(false)
  const [quizIndex, setQuizIndex] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [quizComplete, setQuizComplete] = useState(false)

  const nextQuestion = () => {
    quizIndex === deck.questions.length - 1
      ? setQuizComplete(true)
      : setQuizIndex(quizIndex + 1)
  }

  const correctAnswer = () => {
    setCorrectCount(correctCount + 1)
    toggleAnswer(false)
    nextQuestion()
  }

  const incorrectAnswer = () => {
    nextQuestion()
  }

  const reset = () => {
    setQuizIndex(0)
    setCorrectCount(0)
    setQuizComplete(false)
  }

  const goBack = () => {
    props.navigation.dispatch(CommonActions.goBack({
      key: 'Deck'
    }))
  }

  const { deck } = useSelector(decks => {
    const deck = decks[props.route.params.deckId]
    return {
      deck
    }
  })

  if (quizComplete) {
    return (
      <View style={styles.container}>
        <Card containerStyle={[styles.titleCard, {height: 400}]}>
          <Card.Title style={{color: red}}>
            Finished.
          </Card.Title>
          <Text style={[styles.center, {color: 'white', marginTop: 10, paddingBottom: 100, fontWeight: '200', fontSize: 20}]}>
            You got {correctCount}/{deck.questions.length} correct.
          </Text>
          <Button style={{backgroundColor: red}} text="Restart Quiz" onPress={() => reset()} />
          <Button text="Back To Deck" onPress={() => goBack()} />
        </Card>
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <Card containerStyle={[styles.titleCard, {height: 400}]}>
          <Card.Title style={{color: red}}>Completed: {quizIndex}</Card.Title>
          {viewAnswer
            ? <Answer
              toggleAnswer={toggleAnswer}
              text={deck.questions[quizIndex].answer}
            />
            : <Question
              toggleAnswer={toggleAnswer}
              text={deck.questions[quizIndex].question}
            />
          }
          <View style={{justifyContent: 'flex-end'}}>
            <Button text="Correct" onPress={() => correctAnswer()} />
            <Button text="Incorrect" onPress={() => incorrectAnswer()} />
          </View>
        </Card>
      </View>
    )
  }
}

const Question = ({ text, toggleAnswer }) => {
  return (
    <View style={{margin: 'auto'}}>
      <Text style={[styles.center, {color: 'white', marginTop: 10, paddingBottom: 100, fontWeight: '200', fontSize: 20}]}>
        {text}
      </Text>
      <Button 
        style={{backgroundColor: purple}}
        textStyle={{color: '#F0B7A4'}}
        text="View Answer" 
        onPress={() => toggleAnswer(true)} />
    </View>
  );
}

const Answer = ({ text, toggleAnswer }) => {
  return (
    <View style={{margin: 'auto'}}>
      <Text style={[styles.center, {color: 'white', marginTop: 10, paddingBottom: 100, fontWeight: '200', fontSize: 20}]}>
        {text}
      </Text>
      <Button 
        style={{backgroundColor: purple}}
        textStyle={{color: '#F0B7A4'}}
        text="View Question" 
        onPress={() => toggleAnswer(false)} />
    </View>
  );
}

