import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Fontisto';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../assests/styles/Metrics';

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
    <View style={styles.container}>
      <View style={styles.innercontainer}>
        <View style={styles.textcontainer}>
          <Text style={styles.text1style}>
            Lost your password? Please enter your email address.
          </Text>

          <Text style={styles.text2style}>
            You will receive a link to create a new password via email.
          </Text>
        </View>

        <View style={{flexDirection: 'row', marginTop: verticalScale(25)}}>
          <Text
            style={{
              fontSize: moderateScale(15),
              color: 'black',
              fontWeight: '400',
            }}>
            Username or email
          </Text>
          <Text
            style={{
              color: 'red',
              marginLeft: horizontalScale(4),
              fontSize: moderateScale(15),
            }}>
            *
          </Text>
        </View>

        <View
          style={{
            marginTop: verticalScale(10),
            flexDirection: 'row',
            borderWidth: 2,
            borderRadius: moderateScale(8),
            borderColor: 'grey',
          }}>
          <Icon
            style={{
              marginTop: verticalScale(12),
              marginLeft: horizontalScale(8),
            }}
            name={'email'}
            size={21}
            color={'grey'}></Icon>
          <TextInput
            value={email}
            onChangeText={text => setEmail(text)}
            onBlur={validateEmail}
            style={{
              height: verticalScale(45),
              width: horizontalScale(220),
              marginLeft: horizontalScale(10),
              // borderWidth: 2,
            }}></TextInput>
        </View>
        {emailError ? (
          <Text
            style={{
              color: 'red',
              fontSize: moderateScale(13.5),
              marginTop: verticalScale(5),
              marginLeft: horizontalScale(5),
            }}>
            {emailError}
          </Text>
        ) : null}

        <TouchableOpacity
          onPress={handleResetPassword}
          style={{
            backgroundColor: '#2E6BC6',
            marginTop: verticalScale(25),
            marginHorizontal: horizontalScale(95),
            borderRadius: moderateScale(10),
            padding: horizontalScale(8),
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: moderateScale(15),
              color: 'white',
              fontFamily: 'RobotoMono-SemiBold',
            }}>
            Reset Password
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  innercontainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: horizontalScale(15.5),
  },

  textcontainer: {flexDirection: 'column'},

  text1style: {
    color: '#777777',
    fontSize: moderateScale(14),
  },

  text2style: {
    color: '#777777',
    fontSize: moderateScale(14),
    marginTop: verticalScale(10),
  },
});

export default ForgotpasswordScreen;
