import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {useGloversProfileUpdateMutation} from '../redux/service/GloversService';

const EditProfileScreen = ({navigation}: any) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const user = useSelector((state: any) => state.glover.gloverDetails.user);

  useEffect(() => {
    setFirstName(user.first_name);
    setLastName(user.last_name);
    setEmail(user.email);
  }, [user]);

  const [gloversProfileUpdate, {data, isSuccess, isLoading, error, isError}] =
    useGloversProfileUpdateMutation();

  const handlePressSave = async () => {
    try {
      const response = await gloversProfileUpdate({
        first_name: firstName,
        last_name: lastName,
      });
      console.log('ProfileUpdate---------->', response);

      if (response) {
        console.log(response.data);
        navigation.navigate('Profile', {updatedData: response.data});
      } else {
        console.error('Error while updating profile:', error);
      }
    } catch (error) {
      console.error('Error while updating profile:', error.message);
    }
  };

  return (
    <View style={styles.Container}>
      <View style={styles.ProfileIconView}>
        <Image
          source={require('../assets/images/profileIcon.png')}
          style={styles.image}
        />
        <View style={styles.badge}>
          <TouchableOpacity>
            <View style={styles.cameraContainer}>
              <Image
                source={require('../assets/images/Camera_Icon.png')}
                style={styles.cameraIcon}
              />
            </View>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.inputText}
          mode="outlined"
          label="First Name"
          placeholder=""
          theme={{
            roundness: 30,
            colors: {
              primary: 'black',
            },
          }}
          value={firstName}
          onChangeText={text => setFirstName(text)}
        />

        <TextInput
          style={styles.inputText}
          mode="outlined"
          label="Last Name"
          placeholder=""
          theme={{
            roundness: 30,
            colors: {
              primary: 'black',
            },
          }}
          value={lastName}
          onChangeText={text => setLastName(text)}
        />

        <TextInput
          style={styles.inputText}
          mode="outlined"
          label="Email Address"
          placeholder=""
          theme={{
            roundness: 30,
            colors: {
              primary: 'black',
            },
          }}
          value={email}
          editable={false}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handlePressSave}>
          <Text style={styles.saveButtonText}>SAVE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default EditProfileScreen;
const styles = StyleSheet.create({
  Container: {
    flexGrow: 1,
    paddingTop: 50,
    backgroundColor: 'white',
  },
  inputText: {
    width: '85%',
    height: 55,
    paddingHorizontal: 10,
    alignSelf: 'center',
    marginTop: 20,
  },

  saveButton: {
    backgroundColor: '#005dab',
    paddingVertical: 15,
    width: '85%',
    alignSelf: 'center',
    borderRadius: 30,
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 50,
    alignSelf: 'center',
    top: 10,
  },
  badge: {
    position: 'absolute',
    right: 160,
    top: 70,
    backgroundColor: 'white',
    borderRadius: 50,
  },
  cameraContainer: {
    borderRadius: 30,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraIcon: {
    width: 20,
    height: 20,
  },
  ProfileIconView: {
    alignItems: 'center',
  },
});
