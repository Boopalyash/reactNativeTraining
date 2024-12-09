import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { useGloversLoginPostMutation } from '../redux/service/GloversService';

const { width, height } = Dimensions.get('window');

const SignInScreen = ({ navigation }: any) => {
  const passwordRef = useRef(null);
  const gloversPostSignInMethod = useSelector(
    (state: any) => state.glover.gloversDetails,
  );
  const [email, setEmail] = useState(gloversPostSignInMethod?.email || '');
  const [password, setPassword] = useState(gloversPostSignInMethod?.password || '');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [gloversSign, { data, isSuccess, isLoading, error, isError }] =
    useGloversLoginPostMutation();

  const handleSignIn = async () => {
    const validateEmail = () => {
      if (!email.length) {
        setEmailError('Email address is required');
        return false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setEmailError('Invalid email address');
        return false;
      }

      setEmailError('');
      return true;
    };

    const validatePassword = () => {
      if (!password.length) {
        setPasswordError('Password is required');
        return false;
      }

      if (password.length < 8) {
        setPasswordError('Password must be at least 8 characters long');
        return false;
      }

      setPasswordError('');
      return true;
    };



    if (validateEmail() && validatePassword()) {
      const gloversSignInReqObj = {
        email,
        password,
      };

      try {
        const res = await gloversSign(gloversSignInReqObj).unwrap();
        if (res.code === 0) {
          navigation.navigate('Bottom');
        } else {
          Alert.alert(res.message);
        }
      } catch (err) {
        console.error(err);
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    }
  };

  const handleFan = () => {
    console.log('Log as fan clicked');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/gloverslogo.png')}
        style={styles.logo}
      />
      <View style={{ alignSelf: 'flex-start' }}>
        <Text style={styles.gloversText}>Get started with Glover's</Text>
      </View>
      <TextInput
        style={styles.inputText}
        mode="outlined"
        label="Email Address"
        placeholder="Enter Your Email Address"
        theme={{
          roundness: 30,
          colors: { primary: 'black' },
        }}
        onChangeText={text => setEmail(text.toLowerCase())}
        value={email}
        returnKeyType="next"
        blurOnSubmit={false}
        onSubmitEditing={() => passwordRef.current?.focus()}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      <TextInput
        style={styles.inputText}
        mode="outlined"
        label="Password"
        placeholder="Enter your password"
        secureTextEntry={!showPassword}
        right={
          <TextInput.Icon
            name={showPassword ? 'eye-off' : 'eye'}
            onPress={togglePasswordVisibility}
          />
        }
        theme={{
          roundness: 30,
          colors: { primary: 'black' },
        }}
        onChangeText={text => setPassword(text)}
        value={password}
        returnKeyType="done"
        ref={passwordRef}
        onSubmitEditing={handleSignIn}
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

      <TouchableOpacity onPress={() => Alert.alert('Forgot Password')}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
        <Text style={styles.signInButtonText}>SIGN IN</Text>
      </TouchableOpacity>

      <View style={styles.dontView}>
        <Text style={styles.dontText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.dontSignText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleFan}>
        <Text style={styles.LogText}>Log as a fan</Text>
      </TouchableOpacity>

      <Text style={styles.LogWith}>Login with</Text>

      <View style={styles.iconView}>
        <TouchableOpacity>
          <Image
            source={require('../assets/images/GoogleLogo.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../assets/images/appleLogo.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.PolicyView}>
        <View>
          <Text style={{ fontSize: 16 }}>Glover's</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('TermsAndService')}>
          <Text style={styles.TermsText}>Terms of Service</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 16 }}>and</Text>
        <TouchableOpacity onPress={() => navigation.navigate('PrivacyPolicy')}>
          <Text style={styles.TermsText}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '5%',
    backgroundColor: 'white',
  },
  logo: {
    width: '80%',
    height: height * 0.2,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: height * 0.05,
  },
  gloversText: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: '500',
  },
  inputText: {
    marginTop: 15,
  },
  forgotPasswordText: {
    color: '#0963ae',
    marginTop: 10,
    textAlign: 'right',
    fontSize: 14,
  },
  signInButton: {
    backgroundColor: '#005dab',
    paddingVertical: 15,
    borderRadius: 30,
    marginTop: 20,
    alignItems: 'center',
  },
  signInButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dontView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  dontText: {
    fontSize: 14,
  },
  dontSignText: {
    fontSize: 14,
    color: '#005dab',
    marginLeft: 5,
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  LogText: {
    alignSelf: 'center',
    fontSize: 16,
    color: '#005dab',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  LogWith: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 16,
    fontWeight: 500,
  },
  icon: {
    width: 50,
    height: 50,
    marginLeft: 10,
    marginRight: 10,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  PolicyView: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  TermsText: {
    color: '#005dab',
    marginLeft: 5,
    marginRight: 5,
    textDecorationLine: 'underline',
    fontSize: 16,
  },
  iconView: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default SignInScreen;
