import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { TextInput, Card, List, Divider } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { useLazyGloversCreateTeamNextGetQuery } from '../redux/service/GloversService';

const { width, height } = Dimensions.get('window'); 

const CreateUserNextScreen = ({ navigation }: any) => {
  const [inputValue, setInputValue] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [activeButton, setActiveButton] = useState('back');
  const [options, setOptions] = useState<string[]>([]);

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

    // Static data for dropdown options
    const staticOptions = [
      'Spring 2024',
      'Summer 2024',
      'Fall 2024',
      'Winter 2024',
      'Spring 2025',
    ];

    setOptions(staticOptions);
  };

  const closeDropdown = () => {
    setDropdownVisible(false);
  };

  const handleOptionSelect = (option: string) => {
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
      <Text style={styles.SelectText1}>What is the name of your local league?</Text>
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
      <Text style={styles.SelectText1}>Where is your team based?</Text>
      <TextInput
        style={styles.inputText}
        mode="outlined"
        label="City, Town"
        placeholder="Name"
        theme={{
          roundness: 30,
          colors: {
            primary: 'black',
          },
        }}
      />
      <Text style={styles.SelectText1}>What is your team's name?</Text>
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
      <Text style={styles.SelectText1}>When is the upcoming season?</Text>
      <View style={styles.inputWithDropdownContainer}>
        <TextInput
          style={styles.inputText}
          label="Select Season"
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
          mode="outlined"
          onFocus={openDropdown}
          onBlur={closeDropdown}
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
                        onPress={() => handleOptionSelect(option)}
                      />
                      {index !== options.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List.Section>
              </ScrollView>
            </Card>
          </View>
        )}
      </View>
      <Text style={styles.SelectText1}>Upload your team logo?</Text>
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
      <View style={styles.ButtonContainer}>
        <TouchableOpacity onPress={handleBackButtonPress}>
          <View style={[styles.BackButton, activeButton === 'back' && styles.ActiveButton]}>
            <Text style={styles.BackText}>BACK</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleFinishButtonPress}>
          <View
            style={[styles.FinishButton, activeButton === 'finish' && styles.ActiveButton]}
          >
            <Text style={styles.FinishText}>FINISH</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CreateUserNextScreen;

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
    fontSize: width * 0.06,
    marginLeft: width * 0.03,
    fontWeight: '600',
  },
  SelectText1: {
    fontSize: width * 0.05,
    marginHorizontal: width * 0.05,
    marginTop: height * 0.03,
    fontWeight: '400',
  },
  inputWithDropdownContainer: {
    width: '100%',
    alignSelf: 'center',
    marginTop: height * 0.02,
  },
  inputText: {
    width: '90%',
    alignSelf: 'center',
  },
  dropdownContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    alignSelf: 'center'
  },
  RowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  UploadButton: {
    width: width * 0.3,
    height: height * 0.06,
    borderRadius: 30,
    backgroundColor: '#035dab',
    marginLeft:20,
    marginTop: height * 0.02,
    justifyContent: 'space-evenly',
  },
  UploadIcon: {
    width: width * 0.05,
    height: height * 0.05,
    tintColor: 'white',
    resizeMode: 'contain',
  },
  UploadText: {
    color: 'white',
    fontSize: width * 0.035,
    fontWeight: 'bold',
  },
  ButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: height * 0.03,
    paddingBottom: 50,
  },
  BackButton: {
    borderRadius: 30,
    backgroundColor: '#035dab',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.08,
  },
  BackText: {
    color: 'white',
    fontSize: width * 0.04,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  FinishButton: {
    borderRadius: 30,
    backgroundColor: '#035dab',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.08,
  },
  FinishText: {
    color: 'white',
    fontSize: width * 0.04,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ActiveButton: {
    backgroundColor: '#cecece',
  },
});
