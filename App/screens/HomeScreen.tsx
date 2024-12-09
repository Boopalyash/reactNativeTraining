import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }: any) => {
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     navigation.navigate('SignIn');
  //   }, 3000);

  //   return () => clearTimeout(timer);
  // });

  
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        const parsedToken = JSON.parse(token);
        console.log('Token exists:', parsedToken.access_token);
        navigation.navigate('BottomTabs');
      } else {
        navigation.navigate('SignIn');
      }
    };
  
    checkToken();
  }, [navigation]);
  

  return (
    <View style={styles.Container}>
      <StatusBar backgroundColor="transparent" translucent />

      <ImageBackground
        source={require('../assets/images/Splash.jpeg')}
        style={styles.Image}
      />
      <View style={styles.LogoContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Eventss')}>
          <Image
            source={require('../assets/images/gloverslogo.png')}
            style={styles.Logo}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  Image: {
    flex: 1,
  },
  LogoContainer: {
    position: 'absolute',
    top: '40%',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  Logo: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
  },
});
