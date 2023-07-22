import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import {TextInput, Card, List, Divider} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {useLazyGloversCreateTeamNextGetQuery} from '../redux/service/GloversService';

const CreateUserNextScreen = ({navigation}: any) => {
  const [inputValue, setInputValue] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [activeButton, setActiveButton] = useState('back');
  const [options, setOptions] = useState([]);

  const [gloverCreateteamNext] = useLazyGloversCreateTeamNextGetQuery();

  const gloversGetCreateTeam = useSelector(
    (state: any) => state.glover.gloverDetailsGetCreateTeamNext,
  );

  useEffect(() => {
    async function _createteamNext() {
      await gloverCreateteamNext(true);
    }
    _createteamNext();
  }, []);

  const handleChevron = () => {
    navigation.navigate('CreateTeam');
  };

  const openDropdown = () => {
    setDropdownVisible(true);
    const apiOptions = gloversGetCreateTeam?.data?.Season.map(
      season => season.values,
    );
    setOptions(apiOptions);
  };

  const closeDropdown = () => {
    setDropdownVisible(false);
  };

  const handleOptionSelect = ({option}: any) => {
    setInputValue(option);
    closeDropdown();
  };

  const handleBackButtonPress = () => {
    setActiveButton('back');
    navigation.navigate('CreateTeam');
  };

  const handleFinishButtonPress = () => {
    setActiveButton('finish');
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
        <Text style={styles.SelectText1}>
          What is the name of your local league?
        </Text>
      </View>
      <TextInput
        style={styles.inputText}
        mode="outlined"
        label="Name"
        placeholder="Name"
        theme={{
          roundness: 30,
          colors: {
            primary: 'black',
          },
        }}
      />

      <View>
        <Text style={styles.SelectText1}>Where is your team based?</Text>
      </View>
      <TextInput
        style={styles.inputText}
        mode="outlined"
        label="City,Town"
        placeholder="Name"
        theme={{
          roundness: 30,
          colors: {
            primary: 'black',
          },
        }}
      />

      <View>
        <Text style={styles.SelectText1}>What is your team's name?</Text>
      </View>
      <TextInput
        style={styles.inputText}
        mode="outlined"
        label="Team Name"
        placeholder="Name"
        theme={{
          roundness: 30,
          colors: {
            primary: 'black',
          },
        }}
      />

      <View>
        <Text style={styles.SelectText1}>When is the upcoming season?</Text>
      </View>

      <TextInput
        style={styles.inputText}
        label="Input Text"
        value={inputValue}
        onChangeText={text => setInputValue(text)}
        mode="outlined"
        onFocus={openDropdown}
        theme={{
          roundness: 30,
          colors: {
            primary: 'black',
          },
        }}
      />

      {dropdownVisible && (
        <View style={styles.dropdownContainer}>
          <Card elevation={4}>
            <ScrollView>
              <List.Section>
                {options.map((option, index) => (
                  <React.Fragment key={index}>
                    <List.Item
                      title={option}
                      onPress={() => {
                        handleOptionSelect(option);
                        setInputValue(option);
                        closeDropdown();
                      }}
                    />
                    {index !== options.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List.Section>
            </ScrollView>
          </Card>
        </View>
      )}

      <View>
        <Text style={styles.SelectText1}>Upload your team logo?</Text>
      </View>

      <TouchableOpacity>
        <View style={styles.UploadButton}>
          <View style={styles.RowContainer}>
            <Image
              source={require('../assets/images/folder.png')}
              style={styles.UploadIcon}
            />
            <Text style={styles.UploadText}>Upload</Text>
          </View>
        </View>
      </TouchableOpacity>

      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <View>
          <TouchableOpacity onPress={handleBackButtonPress}>
            <View
              style={[
                styles.BackButton,
                activeButton === 'back' && styles.ActiveButton,
              ]}>
              <Text style={styles.BackText}>BACK</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={handleFinishButtonPress}>
            <View
              style={[
                styles.FinishButton,
                activeButton === 'finish' && styles.ActiveButton,
              ]}>
              <Text style={styles.FinishText}>FINISH</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
export default CreateUserNextScreen;
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
    fontSize: 20,
    marginLeft: 20,
    marginTop: 30,
    fontWeight: '400',
  },
  inputText: {
    width: '90%',
    height: 55,
    paddingHorizontal: 10,
    alignSelf: 'center',
    marginTop: 20,
  },
  dropdownContainer: {
    alignSelf: 'center',
    width: '80%',
    marginTop: 10,
  },
  RowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  UploadButton: {
    width: 120,
    height: 40,
    marginLeft: 20,
    borderRadius: 30,
    backgroundColor: '#035dab',
    marginTop: 10,
    paddingVertical: 10,
  },
  UploadText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
  },
  UploadIcon: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
  BackButton: {
    borderRadius: 30,
    backgroundColor: '#035dab',
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  BackText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  FinishButton: {
    borderRadius: 30,
    backgroundColor: '#035dab',
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  FinishText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  ActiveButton: {
    backgroundColor: '#cecece',
  },
  containers: {
    paddingHorizontal: 10,
  },
});
