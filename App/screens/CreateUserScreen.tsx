import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import { useLazyGloversCreateTeamGetQuery } from '../redux/service/GloversService';
import { useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window');

const CreateUserScreen = ({ navigation }:any) => {
  const [gloverCreateteam] = useLazyGloversCreateTeamGetQuery();

  const gloversGetCreateTeam = useSelector(
    (state:any) => state.glover.gloverDetailsGetCreateTeam,
  );

  useEffect(() => {
    async function fetchCreateTeamData() {
      await gloverCreateteam(true);
    }
    fetchCreateTeamData();
  }, []);

  const [selectedCard, setSelectedCard] = useState(null);
  const [showAgeView, setShowAgeView] = useState(false);
  const [isButtonVisible, setButtonVisible] = useState(false);

  const handleCardPress = (cardTypeIndex) => {
    setSelectedCard(cardTypeIndex);
    setShowAgeView(true);
    setButtonVisible(false);
  };

  const handleScreenPress = () => {
    setButtonVisible(true);
  };

  const handleButtonPress = () => {
    navigation.navigate('CreateNextTeam');
  };

  const handleChevron = () => {
    navigation.navigate('Home');
  };

  const renderAgeList = (ageList) => (
    <FlatList
      data={ageList}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={handleScreenPress}>
          <View style={styles.Card}>
            <View style={styles.CardContent}>
              <Image
                source={require('../assets/images/baseball.png')}
                style={styles.Ball}
              />
              <Text style={styles.CardText}>{item?.display_name}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item?._id}
      horizontal
    />
  );

  const renderSelectedCardContent = () => {
    if (selectedCard === null || !gloversGetCreateTeam?.data[0]?.type[selectedCard]) return null;

    const { question, player_age_list } = gloversGetCreateTeam?.data[0]?.type[selectedCard];

    return (
      <>
        {showAgeView && (
          <View style={styles.AgeView}>
            <Text style={styles.AgeText}>{question}</Text>
          </View>
        )}
        <View style={styles.RowContainer}>{renderAgeList(player_age_list)}</View>
      </>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.Container}>
      <View style={styles.ChevronLeftView}>
        <TouchableOpacity onPress={handleChevron}>
          <Image
            source={require('../assets/images/left_chevron.png')}
            style={styles.ChevronLeft}
          />
        </TouchableOpacity>
        <Text style={styles.CreateText}>Create Your Team</Text>
      </View>

      <Text style={styles.SelectText}>Select Your Team Sport</Text>
      <View style={styles.Card}>
        <View style={styles.ImageContainer}>
          <Image source={require('../assets/images/rectangle.png')} style={styles.TopLeftImage} />
        </View>
        <Image
          source={require('../assets/images/baseball.png')}
          style={styles.Ball}
        />
        <Text style={styles.CenteredText}>
          {gloversGetCreateTeam?.data[0]?.type[0]?.game_name}
        </Text>
      </View>

      <Text style={styles.RegistrationText}>Registration Status</Text>
      <View style={styles.InputContainer}>
        <TextInput style={styles.InputText} placeholder="Register Team" />
      </View>

      <Text style={styles.SelectText}>Select Your Team Type</Text>
      <View style={styles.TeamTypeContainer}>
        {[0, 1, 2].map((cardTypeIndex) => (
          <TouchableOpacity
            key={cardTypeIndex}
            onPress={() => handleCardPress(cardTypeIndex)}
          >
            <View
              style={[
                styles.Card,
                selectedCard === cardTypeIndex && styles.SelectedCard,
              ]}
            >
              <Image
                source={require('../assets/images/baseball.png')}
                style={styles.Ball}
              />
              <Text style={styles.CenteredText}>
                {gloversGetCreateTeam?.data[0]?.type[cardTypeIndex]?.display_name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {renderSelectedCardContent()}

      {isButtonVisible && (
        <TouchableOpacity onPress={handleButtonPress}>
          <View style={styles.NextButton}>
            <Text style={styles.NextButtonText}>Next</Text>
          </View>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  ChevronLeftView: {
    flexDirection: 'row',
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  ChevronLeft: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  CreateText: {
    fontSize: 22,
    fontWeight: '600',
    marginLeft: 10,
  },
  SelectText: {
    fontSize: 18,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  ImageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  TopLeftImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  RegistrationText: {
    fontSize: 18,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  InputContainer: {
    borderRadius: 30,
    borderWidth: 0.5,
    width: '90%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  InputText: {
    paddingHorizontal: 10,
  },
  TeamTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  Card: {
    width: 100,
    height: 130,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    position: 'relative',
  },
  SelectedCard: {
    borderWidth: 2,
    borderColor: '#478ac2',
    marginHorizontal: 10,
  },
  Ball: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  CenteredText: {
    textAlign: 'center',
    marginTop: 10,
  },
  AgeView: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  AgeText: {
    fontSize: 18,
  },
  RowContainer: {
    flexDirection: 'row',
  },
  NextButton: {
    backgroundColor: '#035dab',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    alignSelf: 'center',
    marginVertical: 20,
  },
  NextButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  CardContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  CardText: {
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
  },
});
export default CreateUserScreen;

