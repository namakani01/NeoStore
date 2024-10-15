import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Fontisto';

const ForgotpasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

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

  return (
    <View style={{marginVertical: 100  , marginHorizontal : 13}}>
      <View style={{flexDirection: 'column'}}>
        <Text style={{color: '#777777', fontSize: 14}}>
          Lost your password? Please enter your email address.
        </Text>

        <Text style={{color: '#777777', fontSize: 14,marginTop  :10}}>You will receive a link to create a new password via email.</Text>
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
