import React, { useState } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import {CommonActions} from '@react-navigation/native';

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
      <View>
        <Text>Done. You got {correctCount}/{deck.questions.length} correct.</Text>
        <TouchableOpacity onPress={() => reset()}>
          <Text>
            Restart Quiz
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => goBack()}>
          <Text>
            Back to Deck
          </Text>
        </TouchableOpacity>
      </View>
    )
  } else {
    return (
      <View>
        <Text>Completed: {quizIndex}</Text>
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
        <TouchableOpacity onPress={() => correctAnswer()}>
          <Text>
            Correct
            </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => incorrectAnswer()}>
          <Text>
            Incorrect
            </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const Question = ({ text, toggleAnswer }) => {
  return (
    <View>
      <Text>Question: {text}</Text>
      <TouchableOpacity onPress={() => toggleAnswer(true)}>
        <Text>
          View Answer
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const Answer = ({ text, toggleAnswer }) => {
  return (
    <View>
      <Text>Answer: {text}</Text>
      <TouchableOpacity onPress={() => toggleAnswer(false)}>
        <Text>
          View Question
        </Text>
      </TouchableOpacity>
    </View>
  );
}

