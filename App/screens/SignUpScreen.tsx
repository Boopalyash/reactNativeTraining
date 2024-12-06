import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
  ScrollView,
} from 'react-native';
import { TextInput, List, Card, Divider } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { useGloversNewUserPostMutation } from '../redux/service/GloversService';

const { width, height } = Dimensions.get('window');

const SignUpScreen = ({ navigation }: any) => {
  const gloversPostMethod = useSelector(
    (state: any) => state.glover.gloversDetails,
  );
  const [firstName, setFirstName] = useState(gloversPostMethod?.firstName);
  const [lastName, setLastName] = useState(gloversPostMethod?.lastName);
  const [email, setEmail] = useState(gloversPostMethod?.email);
  const [inputValue, setInputValue] = useState(gloversPostMethod?.inputValue);
  const [password, setPassword] = useState(gloversPostMethod?.password);
  const [confirmPassword, setConfirmPassword] = useState(
    gloversPostMethod?.confirmPassword,
  );
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');

  const [glovers, { data, isSuccess, isLoading, error, isError }] =
    useGloversNewUserPostMutation();

  const handleSignUp = () => {
    const validateFields = () => {
      let valid = true;

      if (!firstName) {
        setFirstNameError('Please enter your first name');
        valid = false;
      } else {
        setFirstNameError('');
      }

      if (!lastName) {
        setLastNameError('Please enter your last name');
        valid = false;
      } else {
        setLastNameError('');
      }

      if (!email) {
        setEmailError('Email address is required');
        valid = false;
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          setEmailError('Invalid email address');
          valid = false;
        } else {
          setEmailError('');
        }
      }

      if (!inputValue || !password || !confirmPassword) {
        Alert.alert('Error', 'Please fill in all fields');
        valid = false;
      }

      if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        valid = false;
      }

      return valid;
    };

    console.log('FirstName:', firstName);
    console.log('LastName:', lastName);
    console.log('Email:', email);
    console.log('InputValue:', inputValue);

    if (validateFields()) {
      console.log('Sign Up clicked');
      navigation.navigate('SignIn');

      let gloversReqObj = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        roles: inputValue,
      };
      console.log('triggerLoginAPI', gloversReqObj);
      glovers(gloversReqObj);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const openDropdown = () => {
    setDropdownVisible(true);
  };

  const closeDropdown = () => {
    setDropdownVisible(false);
  };

  const handleOptionSelect = ({ option }: any) => {
    setInputValue(option);
    closeDropdown();
  };

  const handleEmailChange = (text: string) => {
    setEmail(text.toLowerCase());
    setEmailError('');
  };

  const options = ['Player', 'Staff', 'Coach'];

  const validatePassword = () => {
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
    } else if (!/[A-Z]/.test(password)) {
      setPasswordError('Password must contain at least one uppercase letter');
    } else if (!/[a-z]/.test(password)) {
      setPasswordError('Password must contain at least one lowercase letter');
    } else if (!/\d/.test(password)) {
      setPasswordError('Password must contain at least one digit');
    } else if (!/[^a-zA-Z0-9]/.test(password)) {
      setPasswordError('Password must contain at least one symbol');
    } else {
      setPasswordError('');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/gloverslogo.png')}
        style={styles.logo}
      />
      <ScrollView showsHorizontalScrollIndicator={false}
        horizontal={false} >
        <View style={{ alignSelf: 'flex-start' }}>
          <Text style={styles.GloversText}>Get started with Glover's</Text>
        </View>

        <TextInput
          style={styles.inputText}
          mode="outlined"
          label="First Name"
          value={firstName}
          onChangeText={text => {
            setFirstName(text);
            setFirstNameError('');
          }}
          placeholder="Enter Your First Name"
          theme={{
            roundness: 30,
            colors: {
              primary: 'black',
            },
          }}
        />
        {firstNameError ? (
          <Text style={styles.errorText}>{firstNameError}</Text>
        ) : null}

        <TextInput
          style={styles.inputText}
          mode="outlined"
          label="Last Name"
          value={lastName}
          onChangeText={text => {
            setLastName(text);
            setLastNameError('');
          }}
          placeholder="Enter Your Last Name"
          theme={{
            roundness: 30,
            colors: {
              primary: 'black',
            },
          }}
        />
        {lastNameError ? (
          <Text style={styles.errorText}>{lastNameError}</Text>
        ) : null}

        <TextInput
          style={styles.inputText}
          mode="outlined"
          label="Email Address"
          value={email}
          onChangeText={handleEmailChange}
          placeholder="Enter Your Email Address"
          theme={{
            roundness: 30,
            colors: {
              primary: 'black',
            },
          }}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

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
            </Card>
          </View>
        )}

        <TextInput
          style={styles.inputText}
          mode="outlined"
          label="Password"
          placeholder="Enter your password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={text => setPassword(text)}
          onBlur={validatePassword}
          right={
            <TextInput.Icon
              name={showPassword ? 'eye-off' : 'eye'}
              onPress={togglePasswordVisibility}
            />
          }
          theme={{
            roundness: 30,
            colors: {
              primary: 'black',
            },
          }}
        />
        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}

        <TextInput
          style={styles.inputText}
          mode="outlined"
          label="Confirm Password"
          placeholder="Confirm Password"
          secureTextEntry={!showPassword}
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
          onBlur={validatePassword}
          right={
            <TextInput.Icon
              name={showPassword ? 'eye-off' : 'eye'}
              onPress={togglePasswordVisibility}
            />
          }
          theme={{
            roundness: 30,
            colors: {
              primary: 'black',
            },
          }}
        />
        {password !== confirmPassword && (
          <Text style={styles.errorText}>Incorrect Password</Text>
        )}

        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.signInText}>
          Already have an account?{' '}
          <Text
            style={styles.signInLink}
            onPress={() => navigation.navigate('SignIn')}>
            Sign In
          </Text>
        </Text>
      </ScrollView>
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: width * 0.05, // Adjusting padding based on screen width
    backgroundColor: 'white',
  },
  logo: {
    width: width * 0.6, // Adjusting logo width based on screen size
    height: width * 0.4, // Adjusting logo height based on screen size
    resizeMode: 'contain',
  },
  GloversText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: height * 0.02, // Adjusting margin based on screen height
  },
  inputText: {
    width: width * 0.9, // Making input fields responsive
    marginVertical: height * 0.02, // Adjusting spacing based on screen height
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginVertical: 5,
    marginLeft: 10,
  },
  signUpButton: {
    backgroundColor: 'black',
    width: width * 0.9,
    padding: height * 0.02,
    marginTop: height * 0.03,
    alignItems: 'center',
    borderRadius: 30,
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signInText: {
    marginTop: height * 0.02,
    fontSize: 16,
    alignSelf:'center'
  },
  signInLink: {
    color: 'blue',
    fontWeight: 'bold',
  },
  dropdownContainer: {
    position: 'absolute',
    top: 100, 
    width: '100%',
    zIndex: 1,
  },
});

export default SignUpScreen;
