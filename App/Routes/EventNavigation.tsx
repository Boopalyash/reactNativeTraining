import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import EventScreen from '../screens/EventScreen';

const stack = createStackNavigator();

const EventNavigation = () => {
  return (
    <stack.Navigator screenOptions={{headerShown: false}}>
      <stack.Screen name="Event" component={EventScreen} />
      <stack.Screen name="Login" component={LoginScreen} />
    </stack.Navigator>
  );
};

export default EventNavigation;
