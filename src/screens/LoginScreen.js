import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';

import React, {useState} from 'react';
import Logo from '../components/Logo';
import Icon from 'react-native-vector-icons/Fontisto';
import Icon1 from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../assests/styles/Metrics';

const LoginScreen = props => {
  var emailregex = /[a-zA-Z0-9\.\-_]+[@]+[a-z]+[\.]+[a-z]{2,3}/;
  var passwordregex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]*$/;

  const [email, setEmail] = useState('Kamal@gmail.com');
  const [password, setPassword] = useState('Nam@9930');
  const [secure, setSecure] = useState(true);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = () => {
    var emailregex = /[a-zA-Z0-9\.\-_]+[@]+[a-z]+[\.]+[a-z]{2,3}/;

    if (!email) {
      setEmailError('Email is required.');
    } else if (!emailregex.test(email)) {
      setEmailError('Please Enter the valid email address');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = () => {
    var passwordregex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]*$/;

    if (!password) {
      setPasswordError('Password is required.');
    } else if (password.length < 8) {
      setPasswordError(
        'A minimum 8 characters password contains a combination of uppercase and lowercase letter and number are required.',
      );
    } else if (!passwordregex.test(password)) {
      setPasswordError(
        'A minimum 8 characters password contains a combination of uppercase and lowercase letter and number are required.',
      );
    } else {
      setPasswordError('');
    }
  };

  const handleLogin = () => {
    let valid = true;
    if (email === '') {
      setEmailError('Email is required');
      valid = false;
    } else if (!emailregex.test(email)) {
      setEmailError('Please enter correct email address');
      valid = false;
    } else {
      setEmailError('');
    }

    if (password === '') {
      setPasswordError('Pasword is requird');
      valid = false;
    } else if (!passwordregex.test(password)) {
      setPasswordError('Please enter correct password.');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      LoginpostData();
    } else {
      Alert.alert('Please enter correct details');
    }
  };

  async function LoginpostData() {
    const formData = new FormData();

    formData.append('email', email);
    formData.append('password', password);

    try {
      let result = await axios.post(
        'http://staging.php-dev.in:8844/trainingapp/api/users/login',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      // console.log('The data', result?.data, result?.data?.data?.access_token);
      if (result.status === 200) {
        const accessToken = result?.data?.data?.access_token;
        if (accessToken) {
          await EncryptedStorage.setItem('access_token', accessToken);
          Alert.alert('Login Successfull');
          props.navigation.replace('HomeScreen');
        } else {
          Alert.alert('Token not found');
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        Alert.alert(
          'Login Error',
          'Invalid credentials. Please check your email and password.',
        );
      } else {
        Alert.alert(
          'Network Issue',
          'Unable to connect. Please try again later.',
        );
      }
    }
  }

  return (
    <SafeAreaView style={styles.conatiner}>
      <View>
        <Logo />
      </View>

      <View style={styles.usernametextconatiner}>
        <Text style={styles.usernametext}>Username or email address</Text>

        <Text style={styles.usernameandpasswordstar}>*</Text>
      </View>

      <View style={styles.inputboxcontainer}>
        <Icon
          style={styles.lefticonstyle}
          name="email"
          size={19.5}
          color={'grey'}></Icon>
        <TextInput
          value={email}
          onChangeText={text => setEmail(text)}
          onBlur={validateEmail}
          style={styles.textinput}></TextInput>
      </View>
      {emailError ? <Text style={styles.errorstyle}>{emailError}</Text> : null}

      <View style={styles.passwordtextcontainer}>
        <Text style={styles.passwordtext}>Password</Text>

        <Text style={styles.usernameandpasswordstar}>*</Text>
      </View>

      <View style={styles.inputboxcontainer}>
        <Icon1
          style={styles.lefticonstyle}
          name="lock"
          size={19.5}
          color={'grey'}></Icon1>
        <TextInput
          value={password}
          secureTextEntry={secure}
          onChangeText={text => setPassword(text)}
          onBlur={validatePassword}
          style={styles.textinput}></TextInput>
        {secure === false ? (
          <TouchableOpacity
            style={styles.rightsideicon}
            onPress={() => setSecure(!secure)}>
            <Icon2 name={'eye'} size={19.5} color={'grey'}></Icon2>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.rightsideicon}
            onPress={() => setSecure(!secure)}>
            <Icon3 name={'eye-with-line'} size={20} color={'grey'}></Icon3>
          </TouchableOpacity>
        )}
      </View>
      {passwordError ? (
        <Text style={styles.errorstyle}>{passwordError}</Text>
      ) : null}

      <TouchableOpacity
        style={{
          marginTop: verticalScale(15),
          marginLeft: horizontalScale(215),
        }}
        onPress={() => props.navigation.navigate('Forgot Password')}>
        <Text style={{fontSize: moderateScale(14), color: '#2E6BC6'}}>
          Lost your password?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogin} style={styles.buttonconatiner}>
        <Text style={styles.buttontext}>LOG IN</Text>
      </TouchableOpacity>

      <View style={styles.registerconatiner}>
        <Text
          style={{
            fontSize: moderateScale(14),
            fontFamily: 'RobotoMono-SemiBold',
          }}>
          Don't have an account?
        </Text>
        <TouchableOpacity onPress={() => props.navigation.navigate('Register')}>
          <Text style={styles.registertext}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    justifyContent: 'center',
    // alignItems : 'center'
    // height: verticalScale(500),
    // marginTop: verticalScale(100),
    // backgroundColor: 'red',
  },
  usernametextconatiner: {
    flexDirection: 'row',
    marginTop: verticalScale(40),
  },

  usernametext: {
    fontSize: moderateScale(14.5),
    marginLeft: horizontalScale(26),
    fontWeight: '400',
    color: 'black',
  },

  usernameandpasswordstar: {
    marginLeft: horizontalScale(5),
    color: 'red',
    fontSize: moderateScale(15.5),
  },

  passwordtextcontainer: {
    flexDirection: 'row',
    marginTop: verticalScale(10),
  },

  passwordtext: {
    fontSize: moderateScale(14.5),
    marginLeft: horizontalScale(28),
    // marginTop: verticalScale(5),
    fontWeight: '400',
    color: 'black',
  },

  rightsideicon: {
    marginTop: verticalScale(13.5),
    marginLeft: horizontalScale(16),
  },

  inputboxcontainer: {
    marginTop: verticalScale(10),
    flexDirection: 'row',
    borderWidth: 3,
    borderRadius: moderateScale(8),
    borderColor: '#ccc',
    marginHorizontal: horizontalScale(25),
    // backgroundColor: 'red',
  },

  lefticonstyle: {
    marginTop: verticalScale(13),
    marginLeft: horizontalScale(10),
  },

  textinput: {
    height: verticalScale(45),
    width: horizontalScale(220),
    marginLeft: horizontalScale(10),
    // borderWidth: 2,
  },

  errorstyle: {
    color: 'red',
    fontSize: moderateScale(12.5),
    marginTop: verticalScale(5),
    marginLeft: horizontalScale(26),
  },

  buttonconatiner: {
    backgroundColor: '#2E6BC6',
    // backgroundColor : 'yellow',
    marginTop: verticalScale(25),
    marginHorizontal: horizontalScale(135),
    borderRadius: moderateScale(10),
    padding: verticalScale(5),
  },

  buttontext: {
    textAlign: 'center',
    fontSize: moderateScale(15),
    color: 'white',
    fontFamily: 'RobotoMono-SemiBold',
    padding: verticalScale(4),
  },

  registerconatiner: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: verticalScale(15),
  },

  registertext: {
    marginLeft: horizontalScale(10),
    fontSize: moderateScale(14),
    fontFamily: 'RobotoMono-SemiBold',
    color: 'black',
  },
});

export default LoginScreen;
