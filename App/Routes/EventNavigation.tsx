import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import EventScreen from '../screens/EventScreen';

const stack = createStackNavigator();

const EventNavigation = () => {
  return (
    <stack.Navigator screenOptions={{headerShown: false}}>
      <stack.Screen name="Event" component={EventScreen} />
    </stack.Navigator>
  );
};

export default EventNavigation;
