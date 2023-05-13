import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../../Screens/HomeScreen';
import BottomNavigation from './BottomNavigation';

const stack = createStackNavigator();

const ApplicationNavigation = () => {
  return (
    <NavigationContainer>
      <stack.Navigator screenOptions={{headerShown: false}}>
        <stack.Screen name="Home" component={HomeScreen} />
        <stack.Screen name="Eventss" component={BottomNavigation} />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default ApplicationNavigation;
