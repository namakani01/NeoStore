import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import React, {useState} from 'react';
import Logo from '../components/Logo';
import Icon from 'react-native-vector-icons/Fontisto';
import Icon1 from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';

const LoginScreen = props => {
  var emailregex = /[a-zA-Z0-9\.\-_]+[@]+[a-z]+[\.]+[a-z]{2,3}/;
  var passwordregex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]*$/;

  const [email, setEmail] = useState('Kamal@gmail.com');
  const [password, setPassword] = useState('Nam@9930');
  const [secure, setSecure] = useState(false);

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
          Alert.alert('Login Sucessfull', 'token stored');
          props.navigation.replace('HomeScreen');
        } else {
          Alert.alert('Token not found');
        }
      }
    } catch (error) {
      if (error.response) {
        console.log('Error response:', error.response.data);

        if (error.response.status === 401) {
          Alert.alert('Invalid Email or Password');
        } else {
          Alert.alert('Login Failed', 'Please try again later.');
        }
      } else {
        console.log('Error message:', error.message);
        Alert.alert('Login Failed', 'Please try again later.');
      }
    }
  }

  return (
    <SafeAreaView>
      <View style={{height: 500, marginTop: 100, alignSelf: 'center'}}>
        <View>
          <Logo />
        </View>

        <View style={{flexDirection: 'row', marginTop: 40}}>
          <Text
            style={{
              fontSize: 16,
              marginLeft: 28,
              fontWeight: '400',
              color: 'black',
            }}>
            Username or email address
          </Text>

          <Text style={{marginLeft: 5, color: 'red', fontSize: 17}}>*</Text>
        </View>

        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            borderWidth: 3,
            borderRadius: 8,
            borderColor: '#ccc',
            marginHorizontal: 25,
          }}>
          <Icon
            style={{marginTop: 12, marginLeft: 7}}
            name="email"
            size={20}
            color={'grey'}></Icon>
          <TextInput
            value={email}
            onChangeText={text => setEmail(text)}
            onBlur={validateEmail}
            style={{
              height: 47,
              width: '85%',
              marginLeft: 10,
              color: '#2E6BC6',
            }}></TextInput>
        </View>
        {emailError ? (
          <Text
            style={{color: 'red', fontSize: 14, marginTop: 5, marginLeft: 25}}>
            {emailError}
          </Text>
        ) : null}

        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Text
            style={{
              fontSize: 16,
              marginLeft: 28,
              fontWeight: '400',
              color: 'black',
            }}>
            Password
          </Text>

          <Text style={{marginLeft: 5, color: 'red', fontSize: 17}}>*</Text>
        </View>

        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            borderWidth: 3,
            borderRadius: 8,
            borderColor: '#ccc',
            marginHorizontal: 25,
          }}>
          <Icon1
            style={{marginTop: 12, marginLeft: 7}}
            name="lock"
            size={20}
            color={'grey'}></Icon1>
          <TextInput
            value={password}
            secureTextEntry={secure}
            onChangeText={text => setPassword(text)}
            onBlur={validatePassword}
            style={{
              height: 47,
              marginLeft: 10,
              width: '75%',
            }}></TextInput>
          {secure === false ? (
            <TouchableOpacity
              style={{marginTop: 13, marginLeft: 10}}
              onPress={() => setSecure(!secure)}>
              <Icon2 name={'eye'} size={20} color={'grey'}></Icon2>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{marginTop: 13, marginLeft: 10}}
              onPress={() => setSecure(!secure)}>
              <Icon3 name={'eye-with-line'} size={20} color={'grey'}></Icon3>
            </TouchableOpacity>
          )}
        </View>
        {passwordError ? (
          <Text
            style={{color: 'red', fontSize: 14, marginTop: 5, marginLeft: 25}}>
            {passwordError}
          </Text>
        ) : null}

        <TouchableOpacity
          style={{marginTop: 18, marginLeft: 220}}
          onPress={() => props.navigation.navigate('Forgot Password')}>
          <Text style={{fontSize: 15, color: '#2E6BC6'}}>
            Lost your password?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleLogin}
          style={{
            backgroundColor: '#2E6BC6',
            marginTop: 25,
            marginHorizontal: 110,
            borderRadius: 10,
            padding: 6,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 17,
              color: 'white',
              fontFamily: 'RobotoMono-SemiBold',
              padding: 4,
            }}>
            LOG IN
          </Text>
        </TouchableOpacity>

        <View
          style={{flexDirection: 'row', alignSelf: 'center', marginTop: 25}}>
          <Text style={{fontSize: 15, fontFamily: 'RobotoMono-SemiBold'}}>
            Don't have an account?
          </Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Register')}>
            <Text
              style={{
                marginLeft: 10,
                fontSize: 15,
                fontFamily: 'RobotoMono-SemiBold',
                color: 'black',
              }}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
