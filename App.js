import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackView } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DeckList from './components/DeckList';
import AddDeck from './components/AddDeck';
import Deck from './components/Deck';
import Quiz from './components/Quiz';
import NewQuestion from './components/NewQuestion';
import { createStore } from 'redux';
import reducer from './reducers'
import { Provider } from 'react-redux';
import { blue, brown, purple, red, yellow } from './colors'
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 

const RouteConfigs = {
  DeckList:{
    name: "DeckList",
    component: DeckList,
    options: {tabBarIcon: ({tintColor}) => <Ionicons name='ios-file-tray-full-outline' size={24} color={yellow} />, title: 'Decks'}
  }, 
  AddDeck:{
    component: AddDeck,
    name: "Add Deck",
    options: {tabBarIcon: ({tintColor}) => <MaterialIcons name="create-new-folder" size={24} color={yellow} />, title: 'Add Deck'}
  },
}


const TabNavigatorConfig = {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: yellow,
    style: {
      // height: 56,
      backgroundColor: blue,
      shadowColor: "rgba(0, 0, 0, 0.24)",
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
};

const Tab = Platform.OS === 'ios'
          ? createBottomTabNavigator() 
          : createMaterialTopTabNavigator()

const Tabs = ({navigation}) => {
  return <Tab.Navigator {...TabNavigatorConfig}>
      <Tab.Screen {...RouteConfigs['DeckList']} />
      <Tab.Screen {...RouteConfigs['AddDeck']} />
  </Tab.Navigator>
}

const Stack = createStackNavigator()

const store = createStore(reducer)

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <View style={{flex: 1}} >
          {/* <StatusBar backgroundColor='black' barStyle='light-content'/> */}
          <View style={{backgroundColor: blue, height: Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor={red} barStyle="light-content" />
          </View>
          <Stack.Navigator
            initialRouteName="Decks"
            headerMode="screen"
            screenOptions={{
              headerStyle: {
                backgroundColor: blue,
              },
              headerTintColor: '#fff',
            }}
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
            <Stack.Screen
              name="Quiz"
              component={Quiz}
            />
          </Stack.Navigator>
        </View>
      </Provider>
    </NavigationContainer>
  );
}

