import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Fontisto';

const ForgotpasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  var emailregex = /[a-zA-Z0-9\.\-_]+[@]+[a-z]+[\.]+[a-z]{2,3}/;

  const validateEmail = () => {
    if (!email) {
      setEmailError('Email is required.');
    } else if (!emailregex.test(email)) {
      setEmailError('Please Enter the valid email address');
    } else {
      setEmailError('');
    }
  };

  const handleResetPassword = () => {
    let valid = true;

    if (email === '') {
      setEmailError('Email is required');
      valid = false;
    } else if (!emailregex.test(email)) {
      setEmailError('Invalid email format');
      valid = false;
    } else {
      setEmailError('');
    }

    if (valid) {
      ForgetApiData();
    } else {
      Alert.alert('Please enter correct details');
    }
  };

  async function ForgetApiData() {
    const formData = new FormData();
    formData.append('email', email);

    try {
      let result = await axios.post(
        'http://staging.php-dev.in:8844/trainingapp/api/users/forgot',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log('The data', result?.data);
      if (result.status === 200) {
        Alert.alert('New password sent on email');
      }
    } catch (error) {
      console.log('Error', error.message);

      if (error.response.status === 401) {
        Alert.alert('Invalid Email');
      } else {
        Alert.alert('Please try again later.');
      }
    }
  }

  return (
    <View style={{marginVertical: 120, marginHorizontal: 13}}>
      <View style={{flexDirection: 'column'}}>
        <Text style={{color: '#777777', fontSize: 14}}>
          Lost your password? Please enter your email address.
        </Text>

        <Text style={{color: '#777777', fontSize: 14, marginTop: 10}}>
          You will receive a link to create a new password via email.
        </Text>
      </View>

      <View style={{flexDirection: 'row', marginTop: 25}}>
        <Text style={{fontSize: 16, color: 'black', fontWeight: '400'}}>
          Username or email{' '}
        </Text>
        <Text style={{color: 'red', marginLeft: 4, fontSize: 15}}>*</Text>
      </View>

      <View
        style={{
          marginTop: 10,
          flexDirection: 'row',
          borderWidth: 2,
          borderRadius: 8,
          borderColor: 'grey',
        }}>
        <Icon
          style={{marginTop: 12, marginLeft: 6}}
          name={'email'}
          size={23}
          color={'grey'}></Icon>
        <TextInput
          value={email}
          onChangeText={text => setEmail(text)}
          onBlur={validateEmail}
          style={{height: 47, width: '85%', marginLeft: 10}}></TextInput>
      </View>
      {emailError ? (
        <Text style={{color: 'red', fontSize: 14, marginTop: 3, marginLeft: 5}}>
          {emailError}
        </Text>
      ) : null}

      <TouchableOpacity
        onPress={handleResetPassword}
        style={{
          backgroundColor: '#2E6BC6',
          marginTop: 25,
          marginHorizontal: 70,
          borderRadius: 10,
          padding: 9,
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 19,
            color: 'white',
            fontFamily: 'RobotoMono-SemiBold',
          }}>
          Reset Password
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotpasswordScreen;
