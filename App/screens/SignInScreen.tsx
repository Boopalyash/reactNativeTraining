import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {useGloversLoginPostMutation} from '../redux/service/GloversService';

const SignInScreen = ({navigation}: any) => {
  const gloversPostSignInMethod = useSelector(
    (state: any) => state.glover.gloversDetails,
  );

  const [email, setEmail] = useState(gloversPostSignInMethod?.email);
  const [password, setPassword] = useState(gloversPostSignInMethod?.password);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [gloversSign, {data, isSuccess, isLoading, error, isError}] =
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
      console.log('Email:', email);
      console.log('Password:', password);

      let gloversSignInReqObj = {
        email: email,
        password: password,
      };

      console.log('triggerLoginAPI', gloversSignInReqObj);
      const res = await gloversSign(gloversSignInReqObj).unwrap();
      console.log('res---------->', res);
      if (res.code === 0) {
        navigation.navigate('Bottom');
      } else {
        Alert.alert(res.message);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const handleForgotPassword = () => {
    console.log('Forgot Password clicked');
  };

  const handleSignUp = () => {
    console.log('Sign Up clicked');
    navigation.navigate('SignUp');
  };

  const handleFan = () => {
    console.log('Log as fan clicked');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/gloverslogo.png')}
        style={styles.logo}
      />
      <Text style={styles.GloversText}>Get started with Glover's</Text>
      <TextInput
        style={styles.inputText}
        mode="outlined"
        label="Email Address"
        placeholder="Enter Your Email Address"
        theme={{
          roundness: 30,
          colors: {
            primary: 'black',
          },
        }}
        onChangeText={text => setEmail(text.toLowerCase())}
        value={email}
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
          colors: {
            primary: 'black',
          },
        }}
        onChangeText={text => setPassword(text)}
        value={password}
      />

      {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : null}

      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
        <Text style={styles.signInButtonText}>SIGN IN</Text>
      </TouchableOpacity>

      <View style={styles.DontView}>
        <Text style={styles.DontText}>Don't have an account?</Text>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.DontSignText}>Sign Up</Text>
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
          <Text style={{fontSize: 16}}>Glover's</Text>
        </View>
        <TouchableOpacity onPress={() => Alert.alert('Terms of Service')}>
          <Text style={styles.TermsText}>Terms of Service</Text>
        </TouchableOpacity>
        <Text style={{fontSize: 16}}>and</Text>
        <TouchableOpacity onPress={() => Alert.alert('Privacy Policy')}>
          <Text style={styles.TermsText}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default SignInScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logo: {
    width: 300,
    height: 150,
    resizeMode: 'contain',
    marginLeft: 50,
    marginTop: 60,
  },
  GloversText: {
    fontSize: 20,
    marginLeft: 30,
    fontWeight: 500,
    marginTop: 20,
  },
  inputText: {
    width: '85%',
    height: 55,
    paddingHorizontal: 10,
    alignSelf: 'center',
    marginTop: 20,
  },
  forgotPasswordText: {
    color: '#0963ae',
    marginTop: 20,
    marginLeft: 240,
    fontSize: 18,
  },
  signInButton: {
    backgroundColor: '#005dab',
    paddingVertical: 15,
    width: '85%',
    alignSelf: 'center',
    borderRadius: 30,
    marginTop: 20,
  },
  signInButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  DontView: {
    flexDirection: 'row',
    marginTop: 30,
    alignSelf: 'center',
  },
  DontText: {
    fontSize: 16,
  },
  DontSignText: {
    fontSize: 16,
    color: '#005dab',
    left: 5,
    textDecorationLine: 'underline',
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
    marginTop: 40,
    fontSize: 16,
    fontWeight: 500,
  },

  icon: {
    width: 50,
    height: 50,
    marginLeft: 10,
    marginRight: 10,
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
    marginBottom: 20,
  },
  dropdownContainer: {
    height: 40,
    marginTop: 10,
  },
  dropdownStyle: {
    backgroundColor: '#fafafa',
  },
  dropdownItemStyle: {
    justifyContent: 'flex-start',
  },
  dropdownMenuStyle: {
    backgroundColor: '#fafafa',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    alignSelf: 'center',
  },
  inputContainer: {
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 20,
    borderWidth: 1,
    margin: 35,
    borderColor: 'white',
  },
  inputText1: {
    fontSize: 16,
    paddingLeft: 20,
    marginHorizontal: 20,
  },

  inputIcon: {
    position: 'absolute',
    top: 10,
    left: 20,
  },
  btnEye: {
    position: 'absolute',
    right: 25,
    top: 12,
  },
});
