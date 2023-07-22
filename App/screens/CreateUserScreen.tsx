import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import {useLazyGloversCreateTeamGetQuery} from '../redux/service/GloversService';
import {useSelector} from 'react-redux';

const CreateUserScreen = ({navigation}: any) => {
  const [gloverCreateteam] = useLazyGloversCreateTeamGetQuery();

  const gloversGetCreateTeam = useSelector(
    (state: any) => state.glover.gloverDetailsGetCreateTeam,
  );

  useEffect(() => {
    async function _createteam() {
      await gloverCreateteam(true);
    }
    _createteam();
  }, []);

  const [showNewCard2, setShowNewCard2] = useState(false);
  const [showNewCard3, setShowNewCard3] = useState(false);
  const [showNewCard4, setShowNewCard4] = useState(false);
  const [showAgeView, setShowAgeView] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isButtonVisible, setButtonVisible] = useState(false);

  const handleCardPress2 = (card: any) => {
    setShowNewCard2(true);
    setShowNewCard3(false);
    setShowNewCard4(false);
    setShowAgeView(true);
    setSelectedCard(card);
    setButtonVisible(false);
  };

  const handleScreenPress2 = () => {
    setButtonVisible(true);
  };

  const handleCardPress3 = () => {
    setShowNewCard3(true);
    setShowNewCard2(false);
    setShowNewCard4(false);
    setButtonVisible(false);
  };

  const handleScreenPress3 = () => {
    setButtonVisible(true);
  };

  const handleCardPress4 = () => {
    setShowNewCard4(true);
    setShowNewCard2(false);
    setShowNewCard3(false);
    setButtonVisible(false);
  };

  const handleScreenPress4 = () => {
    setButtonVisible(true);
  };

  const handleButtonPress = () => {
    navigation.navigate('CreateNextTeam');
  };

  const handleChevron = () => {
    navigation.navigate('Home');
  };

  return (
    <ScrollView style={styles.Container}>
      <View style={styles.ChevronLeftView}>
        <TouchableOpacity onPress={handleChevron}>
          <Image
            source={require('../assets/images/left_chevron.png')}
            style={styles.ChevronLeft}
          />
        </TouchableOpacity>
        <Text style={styles.CreateText}>Create Your Team</Text>
      </View>
      <View>
        <Text style={styles.SelectText1}>Select Your Team Sport</Text>
      </View>
      <View style={styles.Card1}>
        <View style={styles.RowContainer}>
          <View style={styles.ImageContainer}>
            <Image source={require('../assets/images/rectangle.png')} />
          </View>
        </View>
        <View>
          <Image
            source={require('../assets/images/baseball.png')}
            style={styles.Ball}
          />
        </View>
        <View>
          <Text style={{marginTop: 10, alignSelf: 'center'}}>
            {gloversGetCreateTeam?.data[0]?.type[1]?.game_name}
          </Text>
        </View>
      </View>
      <View style={styles.RegistrationView}>
        <Text style={styles.RegistrationText}>Registration Status</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Register Team" />
      </View>
      <View>
        <Text style={styles.SelectText2}>Select Your Team Type</Text>
      </View>

      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={handleCardPress2}>
          <View style={styles.Card2}>
            <View style={{marginTop: 30}}>
              <Image
                source={require('../assets/images/baseball.png')}
                style={styles.Ball}
              />
            </View>
            <View>
              <Text style={{marginTop: 10, alignSelf: 'center'}}>
                {gloversGetCreateTeam?.data[0]?.type[0]?.display_name}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleCardPress3}>
          <View style={styles.Card3}>
            <View style={{marginTop: 30}}>
              <Image
                source={require('../assets/images/baseball.png')}
                style={styles.Ball}
              />
            </View>
            <View>
              <Text style={{marginTop: 10, alignSelf: 'center'}}>
                {gloversGetCreateTeam?.data[0]?.type[1]?.display_name}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleCardPress4}>
          <View style={styles.Card4}>
            <View style={{marginTop: 30}}>
              <Image
                source={require('../assets/images/baseball.png')}
                style={styles.Ball}
              />
            </View>
            <View>
              <Text style={{marginTop: 10, alignSelf: 'center'}}>
                {gloversGetCreateTeam?.data[0]?.type[2]?.display_name}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {showNewCard2 && (
        <>
          {showAgeView && (
            <View style={styles.AgeView}>
              <Text style={styles.AgeText}>
                {gloversGetCreateTeam?.data[0]?.type[0]?.question}
              </Text>
            </View>
          )}
          <View style={styles.rowContainer}>
            <FlatList
              data={gloversGetCreateTeam?.data[0]?.type[0]?.player_age_list}
              renderItem={({item}) => (
                <TouchableOpacity onPress={handleScreenPress2}>
                  <View style={styles.Card2}>
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
              keyExtractor={item => item?._id}
              horizontal
            />
          </View>
        </>
      )}

      {showNewCard3 && (
        <>
          {showAgeView && (
            <View style={styles.AgeView}>
              <Text style={styles.AgeText}>
                {gloversGetCreateTeam?.data[0]?.type[1]?.question}
              </Text>
            </View>
          )}
          <View style={styles.rowContainer}>
            <FlatList
              data={gloversGetCreateTeam?.data[0]?.type[1]?.player_age_list}
              renderItem={({item}) => (
                <TouchableOpacity onPress={handleScreenPress3}>
                  <View style={styles.Card3}>
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
              keyExtractor={item => item?._id}
              horizontal
            />
          </View>
        </>
      )}

      {showNewCard4 && (
        <>
          {showAgeView && (
            <View style={styles.AgeView}>
              <Text style={styles.AgeText}>
                {gloversGetCreateTeam?.data[0]?.type[2]?.question}
              </Text>
            </View>
          )}
          <View style={styles.rowContainer}>
            <FlatList
              data={gloversGetCreateTeam?.data[0]?.type[2]?.player_age_list}
              renderItem={({item}) => (
                <TouchableOpacity onPress={handleScreenPress4}>
                  <View style={styles.Card4}>
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
              keyExtractor={item => item?._id}
              horizontal
            />
          </View>
        </>
      )}

      {selectedCard && (
        <>
          {isButtonVisible && (
            <TouchableOpacity onPress={handleButtonPress}>
              <View style={styles.SignOutButton}>
                <Text style={styles.SignOutText}>Next</Text>
              </View>
            </TouchableOpacity>
          )}
        </>
      )}
    </ScrollView>
  );
};
export default CreateUserScreen;
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
  },
  ChevronLeftView: {
    flexDirection: 'row',
    marginTop: 60,
    marginLeft: 20,
  },
  ChevronLeft: {
    width: 15,
    height: 25,
  },
  CreateText: {
    fontSize: 22,
    left: 35,
    fontWeight: '600',
  },
  SelectText1: {
    fontSize: 18,
    marginLeft: 20,
    marginTop: 30,
  },
  Card1: {
    width: 100,
    height: 130,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#478ac2',
    marginLeft: 30,
    marginTop: 20,
    backgroundColor: '#f5f5f5',
  },
  RowContainer: {
    flexDirection: 'row',
  },
  ImageContainer: {
    borderRadius: 8,
  },
  Ball: {
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
  RegistrationView: {
    marginTop: 20,
    marginLeft: 20,
  },
  RegistrationText: {
    fontSize: 18,
  },
  inputContainer: {
    borderRadius: 30,
    width: 340,
    paddingVertical: 15,
    borderWidth: 0.3,
    alignSelf: 'center',
    marginTop: 20,
  },
  input: {
    left: 20,
  },
  SelectText2: {
    fontSize: 18,
    marginLeft: 20,
    marginTop: 30,
  },
  Card2: {
    width: 100,
    height: 130,
    borderRadius: 8,
    borderColor: '#478ac2',
    marginLeft: 30,
    marginTop: 20,
    backgroundColor: '#f5f5f5',
  },
  Card3: {
    width: 100,
    height: 130,
    borderRadius: 8,
    borderColor: '#478ac2',
    marginLeft: 30,
    marginTop: 20,
    backgroundColor: '#f5f5f5',
  },
  Card4: {
    width: 100,
    height: 130,
    borderRadius: 8,
    borderColor: '#478ac2',
    marginLeft: 30,
    marginTop: 20,
    backgroundColor: '#f5f5f5',
  },
  SelectedCard: {
    borderWidth: 2,
    borderColor: '#478ac2',
  },
  AgeView: {
    marginTop: 20,
    marginLeft: 20,
  },
  AgeText: {
    fontSize: 18,
  },
  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  CardContent: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },

  CardText: {
    marginTop: 10,
    alignSelf: 'center',
  },
  SignOutButton: {
    alignSelf: 'center',
    textAlign: 'center',
    borderRadius: 30,
    backgroundColor: '#035dab',
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginBottom: 150,
  },
  SignOutText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
});
