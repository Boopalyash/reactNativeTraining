import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { useGloversProfileUpdateMutation } from '../redux/service/GloversService';

const { width, height } = Dimensions.get('window');

const EditProfileScreen = ({ navigation }: any) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const user = useSelector((state: any) => state.glover.gloverDetails.user);

  useEffect(() => {
    setFirstName(user.first_name);
    setLastName(user.last_name);
    setEmail(user.email);
  }, [user]);

  const [gloversProfileUpdate, { data, isSuccess, isLoading, error, isError }] =
    useGloversProfileUpdateMutation();

  const handlePressSave = async () => {
    try {
      const response = await gloversProfileUpdate({
        first_name: firstName,
        last_name: lastName,
      });
      console.log('ProfileUpdate---------->', response);

      if (response) {
        console.log(response?.data);
        navigation.navigate('Profile', { updatedData: response.data });
      } else {
        console.error('Error while updating profile:', error);
      }
    } catch (error) {
      console.error('Error while updating profile:', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileIconView}>
          <Image
            source={require('../assets/images/profileIcon.png')}
            style={styles.image}
          />
          <TouchableOpacity style={styles.badge}>
            <Image
              source={require('../assets/images/Camera_Icon.png')}
              style={styles.cameraIcon}
            />
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.inputText}
          mode="outlined"
          label="First Name"
          theme={{
            roundness: 30,
            colors: { primary: 'black' },
          }}
          value={firstName}
          onChangeText={text => setFirstName(text)}
        />

        <TextInput
          style={styles.inputText}
          mode="outlined"
          label="Last Name"
          theme={{
            roundness: 30,
            colors: { primary: 'black' },
          }}
          value={lastName}
          onChangeText={text => setLastName(text)}
        />

        <TextInput
          style={styles.inputText}
          mode="outlined"
          label="Email Address"
          theme={{
            roundness: 30,
            colors: { primary: 'black' },
          }}
          value={email}
          editable={false}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handlePressSave}>
          <Text style={styles.saveButtonText}>SAVE</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    paddingVertical: 40,
    paddingHorizontal: 20
  },
  scrollContent: {
    alignItems: 'center',
    paddingVertical: height * 0.05,
  },
  profileIconView: {
    alignItems: 'center',
    marginBottom: height * 0.03,
  },
  image: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: width * 0.15,
    backgroundColor: '#e6e6e6',
  },
  badge: {
    position: 'absolute',
    right: width * 0.3 / 10 - 10,
    bottom: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  cameraIcon: {
    width: width * 0.08,
    height: width * 0.08,
  },
  inputText: {
    width: '100%',
    height: height * 0.07,
    marginTop: height * 0.02,
  },
  saveButton: {
    backgroundColor: '#005dab',
    borderRadius: 30,
    paddingVertical: height * 0.015,
    marginTop: height * 0.03,
    width: '100%',
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
});

