import React from 'react';
import {useRoute} from '@react-navigation/native';
// import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';
import EventScreen from '../../Screens/EventScreen';
import AllGamesScreen from '../../Screens/AllGamesScreen';
import ProfileScreen from '../../Screens/ProfileScreen';
import LiveScreen from '../../Screens/LiveScreen';

// const Stack = createStackNavigator();
const Bottom = createBottomTabNavigator();

const HomeIcon = ({focused}: any) => {
  return (
    <Image
      source={
        focused
          ? require('../../Assets/Images/home_active.png')
          : require('../../Assets/Images/homeInactive.png')
      }
      style={{width: 24, height: 24}}
    />
  );
};

const MenuIcon = ({focused}: any) => {
  return (
    <Image
      source={
        focused
          ? require('../../Assets/Images/eventsActive.png')
          : require('../../Assets/Images/Events_inactive.png')
      }
      style={{width: 24, height: 24}}
    />
  );
};

const LiveIcon = ({focused}: any) => {
  return (
    <Image
      source={
        focused
          ? require('../../Assets/Images/liveActive.png')
          : require('../../Assets/Images/live_inactive.png')
      }
      style={{width: 24, height: 24}}
    />
  );
};

const UserIcon = ({focused}: any) => {
  return (
    <Image
      source={
        focused
          ? require('../../Assets/Images/profileActive.png')
          : require('../../Assets/Images/profile_inactive.png')
      }
      style={{width: 24, height: 24}}
    />
  );
};

const BottomNavigation = () => {
  const route = useRoute();
  const routeName = route.name;

  return (
    <Bottom.Navigator screenOptions={{headerShown: false}}>
      <Bottom.Screen
        name="Home"
        component={AllGamesScreen}
        options={{
          tabBarIcon: ({focused}) => <HomeIcon focused={focused} />,
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: 'bold',
          },
        }}
      />
      <Bottom.Screen
        name="Event"
        component={EventScreen}
        options={{
          tabBarIcon: ({focused}) => <MenuIcon focused={focused} />,
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: 'bold',
          },
        }}
      />
      <Bottom.Screen
        name="Live"
        component={LiveScreen}
        options={{
          tabBarIcon: ({focused}) => <LiveIcon focused={focused} />,
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: 'bold',
          },
        }}
      />
      <Bottom.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => <UserIcon focused={focused} />,
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: 'bold',
          },
        }}
      />
    </Bottom.Navigator>
  );
};

export default BottomNavigation;
