import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackView } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DeckList from './components/DeckList';
import AddDeck from './components/AddDeck';
import Deck from './components/Deck';
import NewQuestion from './components/NewQuestion';

const RouteConfigs = {
  DeckList:{
    name: "DeckList",
    component: DeckList,
    // options: {tabBarIcon: ({tintColor}) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />, title: 'History'}
  }, 
  AddDeck:{
    component: AddDeck,
    name: "Add Deck",
    // options: {tabBarIcon: ({tintColor}) => <FontAwesome name='plus-square' size={30} color={tintColor} />, title: 'Add Entry'}
  },
}

const Tab = Platform.OS === 'ios'
          ? createBottomTabNavigator() 
          : createMaterialTopTabNavigator()

const Tabs = ({navigation}) => {
  return <Tab.Navigator>
      <Tab.Screen {...RouteConfigs['DeckList']} />
      <Tab.Screen {...RouteConfigs['AddDeck']} />
  </Tab.Navigator>
}

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar />
      <Stack.Navigator
        initialRouteName="Decks"
        headerMode="screen"
      >
        <Stack.Screen
          name="Decks"
          component={Tabs}
        />
        <Stack.Screen
          name="Deck"
          component={Deck}
        />
        <Stack.Screen
          name="NewQuestion"
          component={NewQuestion}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
