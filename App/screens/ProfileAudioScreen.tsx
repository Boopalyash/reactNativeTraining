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
import image1 from '../assets/images/download1.jpeg';
import image2 from '../assets/images/download2.jpeg';
import image3 from '../assets/images/download6.jpeg';
import FlipCard from 'react-native-flip-card';

const ProfileAudioScreen = ({navigation}: any) => {
  const [selectedCardImages, setSelectedCardImages] = useState<any[]>([
    {image: image1},
    {image: image2},
    {image: image3},
  ]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSearch = () => {
    navigation.navigate('Profile');
  };

  const handleCardPress = imageSource => {
    setSelectedCardImages([...selectedCardImages, {image: imageSource}]);
    navigation.navigate('ProfileAudioNext', {selectedImage: imageSource});
  };

  return (
    <View style={styles.Container}>
      {/* Background View */}
      <ImageBackground
        source={require('../assets/images/horror1.jpeg')}
        style={styles.backgroundImage}>
        {/* Menu View */}
        <View style={styles.MenuView}>
          <TouchableOpacity>
            <Image
              source={require('../assets/images/menu.png')}
              style={styles.Menu}
            />
          </TouchableOpacity>

          <Text style={styles.CreateText}>My Playlist</Text>
          <TouchableOpacity onPress={handleSearch}>
            <Image
              source={require('../assets/images/search_big.png')}
              style={styles.Search}
            />
          </TouchableOpacity>
        </View>

        {/* Selected Card View */}
        <View>
          {selectedCardImages.map((item, index) => (
            <View key={index}>
              <TouchableOpacity
                style={styles.Cards}
                onPress={() => handleCardPress(item.image)}>
                <Image source={item.image} style={styles.CardImage} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* <ScrollView
          horizontal={true}
          contentContainerStyle={styles.selectedCardView}>
          {selectedCardImages.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleCardPress(item.image)}>
              <FlipCard
                style={styles.card}
                friction={6}
                perspective={1000}
                flipHorizontal={true}
                flipVertical={false}
                flip={false}
                clickable={true}
                onFlipEnd={isFlipEnd => {
                  handleCardPress(item.image);
                }}>
                <View style={styles.face}>
                  <Image source={item.image} style={styles.cardImage} />
                </View>

                <View style={styles.back}>
                  <Image source={item.image} style={styles.cardImage} />
                </View>
              </FlipCard>
            </TouchableOpacity>
          ))}
        </ScrollView> */}

        {/* Audio Player View */}
        <View style={styles.audioPlayer}>
          <TouchableOpacity style={styles.button}>
            <Image
              source={require('../assets/images/previous.png')}
              style={styles.buttonIcon1}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handlePlayPause}>
            <Image
              source={
                isPlaying
                  ? require('../assets/images/pause.png')
                  : require('../assets/images/play.png')
              }
              style={styles.buttonIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Image
              source={require('../assets/images/next1.png')}
              style={styles.buttonIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Recently Played View */}
        <View style={styles.RecentView}>
          <Text style={styles.RecentText}>Recently Played</Text>
        </View>

        {/* Scroll Content View */}
        <ScrollView horizontal style={styles.ScrollContainer}>
          <View style={styles.ScrollContent}>
            <TouchableOpacity
              style={styles.Card}
              onPress={() =>
                handleCardPress(require('../assets/images/download1.jpeg'))
              }>
              <Image
                source={require('../assets/images/download1.jpeg')}
                style={styles.CardImage}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.Card}
              onPress={() =>
                handleCardPress(require('../assets/images/download2.jpeg'))
              }>
              <Image
                source={require('../assets/images/download2.jpeg')}
                style={styles.CardImage}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.Card}
              onPress={() =>
                handleCardPress(require('../assets/images/download6.jpeg'))
              }>
              <Image
                source={require('../assets/images/download6.jpeg')}
                style={styles.CardImage}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.Card}
              onPress={() =>
                handleCardPress(require('../assets/images/download4.jpeg'))
              }>
              <Image
                source={require('../assets/images/download4.jpeg')}
                style={styles.CardImage}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.Card}
              onPress={() =>
                handleCardPress(require('../assets/images/download5.jpeg'))
              }>
              <Image
                source={require('../assets/images/download5.jpeg')}
                style={styles.CardImage}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.Card}
              onPress={() =>
                handleCardPress(require('../assets/images/download3.jpeg'))
              }>
              <Image
                source={require('../assets/images/download3.jpeg')}
                style={styles.CardImage}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default ProfileAudioScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    height: '30%',
  },
  Container: {
    flexGrow: 1,
    backgroundColor: 'black',
  },

  MenuView: {
    flexDirection: 'row',
    marginTop: 60,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  Menu: {
    width: 15,
    height: 20,
    tintColor: 'white',
  },
  CreateText: {
    fontSize: 22,
    fontWeight: '600',
    color: 'white',
  },
  Search: {
    width: 20,
    height: 20,
    top: 5,
    tintColor: 'white',
  },

  RecentView: {
    marginTop: '30%',
    marginLeft: 20,
  },
  RecentText: {
    fontSize: 22,
    fontWeight: '600',
    color: 'white',
  },
  ScrollContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  ScrollContent: {
    flexDirection: 'row',
  },
  Card: {
    width: 120,
    height: 120,
    marginRight: 15,
    shadowColor: 'white',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.5,
  },
  Cards: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: 10,
  },
  CardImage: {
    width: '100%',
    height: '100%',
  },
  FlipCardImage: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 8,
  },

  FlipCardContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30,
  },
  cardImage: {
    width: 100,
    height: 100,
  },

  audioPlayer: {
    flexDirection: 'row',
    top: 100,
    alignSelf: 'center',
  },
  button: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonIcon: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
  buttonIcon1: {
    width: 17,
    height: 17,
    tintColor: 'white',
  },
  face: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
  },
  back: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 8,
  },
  selectedCardView: {
    flexDirection: 'column',
    marginTop: 100,
  },
});
