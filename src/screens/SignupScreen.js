import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import Logo from '../components/Logo';
import Icon1 from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/FontAwesome5';

import Icon3 from 'react-native-vector-icons/Fontisto';
import Icon4 from 'react-native-vector-icons/Feather';
import Icon5 from 'react-native-vector-icons/SimpleLineIcons';
import Icon6 from 'react-native-vector-icons/SimpleLineIcons';

import Icon7 from 'react-native-vector-icons/FontAwesome';

import Icon8 from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage'





import {RadioButton} from 'react-native-paper';

const SignupScreen = props => {
  var emailregex = /[a-zA-Z0-9\.\-_]+[@]+[a-z]+[\.]+[a-z]{2,3}/;
  var passwordregex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]*$/;

  const [checked, setChecked] = useState('');
  const [genderError, setGenderError] = useState(''); 

  const [secure, setSecure] = useState(false);

  const [firstname, setFirstname] = useState('');

  const [lastname, setLastname] = useState('');

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [confirmpassword, setConfirmpassword] = useState('');

  const [phonenumber, setPhonenumber] = useState('');

  const [firtnameError, setFirstnameError] = useState('');
  const [lastnameError, setLastnameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmpasswordError, setConfirmPasswordError] = useState('');
  const [phonenumberError, setPhonenumberError] = useState('');


 

  const validateFirstname = () => {
    if (!firstname) {
      setFirstnameError('First Name is required');
    } else if (firstname.length < 3) {
      setFirstnameError('First Name should be greater than 3');
    } else {
      setFirstnameError('');
    }
  };

  const validateLastname = () => {
    if (!lastname) {
      setLastnameError('Last Name is required');
    } else if (lastname.length < 3) {
      setLastnameError('Last Name should be greater than 3');
    } else {
      setLastnameError('');
    }
  };

  const validateEmail = () => {
    if (!email) {
      setEmailError('Email is required.');
    } else if (!emailregex.test(email)) {
      setEmailError('Please Enter the valid email address');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = () => {
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

  const validateConfirmPassword = () => {
    if (!confirmpassword) {
      setConfirmPasswordError('ConfirmPassword is required.');
    } else if (password !== confirmpassword) {
      setConfirmPasswordError('Password should match');
    } else {
      setConfirmPasswordError('');
    }
  };

  const validatePhoneNumber = () => {
    if (!phonenumber) {
      setPhonenumberError('Phone Number is required');
    } else if (phonenumber.length < 10) {
      setPhonenumberError('Please enter 10 digit phone number');
    } else {
      setPhonenumberError('');
    }
  };

  const validateGender = () => {
    if (!checked) {
      setGenderError('Please select a gender');
    } else {
      setGenderError('');
    }
  };

  const handleRegister = () => {
    let valid = true;

    if (firstname === '') {
      setFirstnameError('First Name is required');
      valid = false;
    } else if (firstname.length < 3) {
      setFirstnameError('First Name must be greater than 3 charcaters');
    } else {
      setFirstnameError('');
    }

    if (lastname === '') {
      setLastnameError('Last Name is required');
      valid = false;
    } else if (lastname.length < 3) {
      setLastnameError('Last Name must be greater than 3 characters');
    } else {
      setLastnameError('');
    }

    if (email === '') {
      setEmailError('Email is required');
      valid = false;
    } else if (!emailregex.test(email)) {
      setEmailError('Invalid email format');
      valid = false;
    } else {
      setEmailError('');
    }

    if (password === '') {
      setPasswordError('Pasword is requird');
      valid = false;
    } else if (!passwordregex.test(password)) {
      setPasswordError(
        'A minimum 8 characters password contains a combination of uppercase and lowercase letter and number are required.',
      );
    } else {
      setPasswordError('');
    }

    if (confirmpassword === '') {
      setConfirmPasswordError('Confirm Password is required');
      valid = false;
    } else if (password !== confirmpassword) {
      setConfirmPasswordError('Passwords do not match');
      valid = false;
    } else {
      setConfirmPasswordError('');
    }

    if (phonenumber === '') {
      setPhonenumberError('Phone Number is required');
      valid = false;
    } else if (phonenumber.length < 10) {
      setPhonenumberError('Please enter 10 digit phone number');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (checked === '') {
      setGenderError('Gender is required');
      valid = false;
    } else {
      setGenderError('');
    }

    if (valid) {
      postApiData();
    } else {
      Alert.alert('Please enter correct details');
    }
  };



  async function postApiData() {
    const formData = new FormData();
    formData.append('first_name', firstname);
    formData.append('last_name', lastname);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('confirm_password', confirmpassword);
    formData.append('gender', checked);
    formData.append('phone_no', phonenumber);

    try {
      let result = await axios.post(
        'http://staging.php-dev.in:8844/trainingapp/api/users/register',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log('The data', result?.data, result?.data?.data?.access_token);
      const accessToken = result?.data?.data?.access_token;
      if (accessToken) {
        await EncryptedStorage.setItem('access_token', accessToken);
        Alert.alert('Registration successful');
      } else {
        Alert.alert('Token not found');
      }

    } catch (error) {
      console.log(error.response ? error?.response.data : error?.message);
    }
  }
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Logo />
        </View>

        <View
          style={{
            height: '100%',
            borderWidth: 2,
            marginTop: 20,
            marginHorizontal: 15,
            paddingHorizontal: 10,
            elevation: 2,
            borderColor: '#E0E0E0',
          }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: '630',
              color: 'black',
              fontFamily: 'RobotoMono-SemiBold',
              marginTop: 7,
            }}>
            Create Account
          </Text>

          <Text
            style={{
              fontSize: 15,
              marginTop: 10,
              fontWeight: '400',
              color: 'black',
            }}>
            First Name
          </Text>

          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              borderWidth: 3,
              borderRadius: 8,
              borderColor: '#ccc',
            }}>
            <Icon1
              style={{marginTop: 12, marginLeft: 5}}
              name={'user'}
              size={23}
              color={'grey'}></Icon1>
            <TextInput
              value={firstname}
              onChangeText={text => setFirstname(text)}
              onBlur={validateFirstname}
              style={{height: 47, width: '85%', marginLeft: 10}}></TextInput>
          </View>
          {firtnameError ? (
            <Text
              style={{color: 'red', fontSize: 14, marginTop: 3, marginLeft: 5}}>
              {firtnameError}
            </Text>
          ) : null}

          <Text
            style={{
              fontSize: 15,
              marginTop: 10,
              fontWeight: '400',
              color: 'black',
            }}>
            Last Name
          </Text>

          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              borderWidth: 3,
              borderRadius: 8,
              borderColor: '#ccc',
            }}>
            <Icon2
              style={{marginTop: 12, marginLeft: 5}}
              name={'address-card'}
              size={23}
              color={'grey'}></Icon2>
            <TextInput
              value={lastname}
              onChangeText={text => setLastname(text)}
              onBlur={validateLastname}
              style={{height: 47, width: '85%', marginLeft: 10}}></TextInput>
          </View>
          {lastnameError ? (
            <Text
              style={{color: 'red', fontSize: 14, marginTop: 3, marginLeft: 5}}>
              {lastnameError}
            </Text>
          ) : null}

          <Text
            style={{
              fontSize: 15,
              marginTop: 10,
              fontWeight: '400',
              color: 'black',
            }}>
            Email
          </Text>

          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              borderWidth: 3,
              borderRadius: 8,
              borderColor: '#ccc',
            }}>
            <Icon3
              style={{marginTop: 12, marginLeft: 6}}
              name={'email'}
              size={23}
              color={'grey'}></Icon3>
            <TextInput
              value={email}
              onChangeText={text => setEmail(text)}
              onBlur={validateEmail}
              style={{height: 47, width: '85%', marginLeft: 10}}></TextInput>
          </View>
          {emailError ? (
            <Text
              style={{color: 'red', fontSize: 14, marginTop: 3, marginLeft: 5}}>
              {emailError}
            </Text>
          ) : null}

          <Text
            style={{
              fontSize: 15,
              marginTop: 10,
              fontWeight: '400',
              color: 'black',
            }}>
            Password
          </Text>

          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              borderWidth: 3,
              borderRadius: 8,
              borderColor: '#ccc',
            }}>
            <Icon4
              style={{marginTop: 12, marginLeft: 5}}
              name={'lock'}
              size={23}
              color={'grey'}></Icon4>
            <TextInput
              value={password}
              onChangeText={text => setPassword(text)}
              onBlur={validatePassword}
              secureTextEntry={secure}
              style={{
                height: 47,
                marginLeft: 10,
                width: '74%',
              }}></TextInput>

            {secure === false ? (
              <TouchableOpacity
                style={{marginTop: 12, marginLeft: 12}}
                onPress={() => setSecure(!secure)}>
                <Icon7 name={'eye'} size={23} color={'grey'}></Icon7>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{marginTop: 12, marginLeft: 3}}
                onPress={() => setSecure(!secure)}>
                <Icon8
                  name={'eye-with-line'}
                  size={23}
                  color={'grey'}></Icon8>
              </TouchableOpacity>
            )}
          </View>
          {passwordError ? (
            <Text
              style={{color: 'red', fontSize: 14, marginTop: 3, marginLeft: 5}}>
              {passwordError}
            </Text>
          ) : null}

          <Text
            style={{
              fontSize: 15,
              marginTop: 10,
              fontWeight: '400',
              color: 'black',
            }}>
            Confirm Password
          </Text>

          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              borderWidth: 3,
              borderRadius: 8,
              borderColor: '#ccc',
            }}>
            <Icon5
              style={{marginTop: 12, marginLeft: 5}}
              name={'lock'}
              size={23}
              color={'grey'}></Icon5>
            <TextInput
              value={confirmpassword}
              onChangeText={text => setConfirmpassword(text)}
              onBlur={validateConfirmPassword}
              style={{height: 47, width: '85%', marginLeft: 10}}></TextInput>
          </View>
          {confirmpasswordError ? (
            <Text
              style={{color: 'red', fontSize: 14, marginTop: 3, marginLeft: 5}}>
              {confirmpasswordError}
            </Text>
          ) : null}

          <Text
            style={{
              fontSize: 15,
              marginTop: 10,
              fontWeight: '400',
              color: 'black',
            }}>
            Phone Number
          </Text>

          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              borderWidth: 3,
              borderRadius: 8,
              borderColor: '#ccc',
            }}>
            <Icon6
              style={{marginTop: 12, marginLeft: 5}}
              name={'phone'}
              size={24}
              color={'grey'}></Icon6>
            <TextInput
              keyboardType={'numeric'}
              value={phonenumber}
              onChangeText={text => setPhonenumber(text)}
              maxLength={10}
              onBlur={validatePhoneNumber}
              style={{height: 47, width: '85%', marginLeft: 10}}></TextInput>
          </View>
          {phonenumberError ? (
            <Text
              style={{color: 'red', fontSize: 14, marginTop: 3, marginLeft: 5}}>
              {phonenumberError}
            </Text>
          ) : null}

          <Text
            style={{
              fontSize: 15,
              marginTop: 10,
              fontWeight: '400',
              color: 'black',
            }}>
            Select Your Gender :
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: 10,
            }}>
            <RadioButton
              value="M"
              status={checked === 'Male' ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked('Male'), setGenderError('');
              }}></RadioButton>
            <Text
              style={{
                fontSize: 15,
                marginTop: 5,
                fontWeight: '400',
                color: 'black',
              }}>
              Male
            </Text>
            <RadioButton
              value="F"
              status={checked === 'Female' ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked('Female'), setGenderError('');
              }}></RadioButton>
            <Text
              style={{
                fontSize: 15,
                marginTop: 5,
                fontWeight: '400',
                color: 'black',
              }}>
              Female
            </Text>
          </View>
          {genderError ? (
            <Text
              style={{color: 'red', fontSize: 14, marginTop: 3, marginLeft: 5}}>
              {genderError}
            </Text>
          ) : null}

          <TouchableOpacity
            onPress={handleRegister}
            style={{
              backgroundColor: '#2E6BC6',
              marginTop: 25,
              marginHorizontal: 70,
              borderRadius: 10,
              padding: 6,
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                color: 'white',
                fontFamily: 'RobotoMono-SemiBold',
              }}>
              Register
            </Text>
          </TouchableOpacity>

          <View
            style={{flexDirection: 'row', alignSelf: 'center', marginTop: 20}}>
            <Text style={{fontSize: 15, fontFamily: 'RobotoMono-SemiBold'}}>
              Already have an account?
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Login')}>
              <Text
                style={{
                  fontSize: 15,
                  marginLeft: 10,
                  fontFamily: 'RobotoMono-SemiBold',
                  color: 'grey',
                }}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignupScreen;
