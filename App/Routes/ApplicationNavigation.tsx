import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import BottomNavigation from './BottomNavigation';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import ProfileAudioScreen from '../screens/ProfileAudioScreen';
import ProfileAudioNextScreen from '../screens/ProfileAudioNextScreen';
import TermsAndService from '../screens/TermsAndServiceScreen';
import PrivacyPolicy from '../screens/PrivacyPolicyScreen';

const stack = createStackNavigator();

const ApplicationNavigation = () => {
  return (
    <NavigationContainer>
      <stack.Navigator screenOptions={{ headerShown: false }}>
        <stack.Screen name="Home" component={HomeScreen} />
        <stack.Screen name="SignIn" component={SignInScreen} />
        <stack.Screen name="SignUp" component={SignUpScreen} />
        <stack.Screen name="Bottom" component={BottomNavigation} />
        <stack.Screen name="EditProfile" component={EditProfileScreen} />
        <stack.Screen name="ProfileAudio" component={ProfileAudioScreen} />
        <stack.Screen
          name="ProfileAudioNext"
          component={ProfileAudioNextScreen}
        />
        <stack.Screen name='TermsAndService' component={TermsAndService}/>
        <stack.Screen name='PrivacyPolicy' component={PrivacyPolicy}/>
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default ApplicationNavigation;
