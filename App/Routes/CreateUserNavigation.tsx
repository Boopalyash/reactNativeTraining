import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AllGamesScreen from '../screens/AllGamesScreen';
import CreateUserScreen from '../screens/CreateUserScreen';
import CreateUserNextScreen from '../screens/CreateUserNextScreen';

const stack = createStackNavigator();

const HomeNavigation = () => {
  return (
    <stack.Navigator screenOptions={{headerShown: false}}>
      <stack.Screen name="Home" component={AllGamesScreen} />
      <stack.Screen name="CreateTeam" component={CreateUserScreen} />
      <stack.Screen name="CreateNextTeam" component={CreateUserNextScreen} />
    </stack.Navigator>
  );
};

export default HomeNavigation;
