import React from 'react';
import {useRoute} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';
import EventScreen from '../screens/EventScreen';
import AllGamesScreen from '../screens/AllGamesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LiveScreen from '../screens/LiveScreen';
import EventNavigation from './EventNavigation';
import HomeNavigation from './CreateUserNavigation';


const Bottom = createBottomTabNavigator();

const HomeIcon = ({focused}: any) => {
  return (
    <Image
      source={
        focused
          ? require('../assets/images/home_active.png')
          : require('../assets/images/homeInactive.png')
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
          ? require('../assets/images/eventsActive.png')
          : require('../assets/images/Events_inactive.png')
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
          ? require('../assets/images/liveActive.png')
          : require('../assets/images/live_inactive.png')
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
          ? require('../assets/images/profileActive.png')
          : require('../assets/images/profile_inactive.png')
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
        component={HomeNavigation}
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
        component={EventNavigation}
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
