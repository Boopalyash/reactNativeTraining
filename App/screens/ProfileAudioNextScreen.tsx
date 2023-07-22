import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';

const ProfileAudioNextScreen = ({route, navigation}: any) => {
  const {selectedImage} = route.params;

  const handleChevron = () => {
    navigation.navigate('ProfileAudio');
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/horror1.jpeg')}
        style={styles.backgroundImage}>
        <View style={styles.chevronLeftView}>
          <TouchableOpacity onPress={handleChevron}>
            <Image
              source={require('../assets/images/left_chevron.png')}
              style={styles.chevronLeft}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.selectedImageContainer}>
          <Image source={selectedImage} style={styles.selectedImage} />
        </View>
      </ImageBackground>
    </View>
  );
};

export default ProfileAudioNextScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  backgroundImage: {
    flex: 1,
    height: '30%',
  },

  chevronLeftView: {
    marginTop: 60,
    paddingHorizontal: 20,
  },
  chevronLeft: {
    width: 15,
    height: 20,
    tintColor: 'white',
  },
  selectedImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    shadowColor: 'white',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.5,
  },
  selectedImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
});
