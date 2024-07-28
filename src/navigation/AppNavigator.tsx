import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import QuizScreen from '../screens/QuizScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';
import ResultScreen from '../screens/ResultScreen';
import UserScreen from '../screens/UserScreen';

export type RootStackParamList = {
  Home: undefined;
  Name: undefined;
  Quiz: { name: string };
  Result: { name: string; score: number };
  Leaderboard: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
        <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
        <Stack.Screen name="Name" component={UserScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;