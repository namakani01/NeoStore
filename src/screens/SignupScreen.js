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

import {RadioButton} from 'react-native-paper';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../assests/styles/Metrics';

const SignupScreen = props => {
  var emailregex = /[a-zA-Z0-9\.\-_]+[@]+[a-z]+[\.]+[a-z]{2,3}/;
  var passwordregex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]*$/;

  const [checked, setChecked] = useState('');
  const [genderError, setGenderError] = useState('');

  const [secure, setSecure] = useState(true);

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

      if (result.status === 200) {
        Alert.alert('Registeration Successful');
        props.navigation.navigate('Login');
      } else {
        Alert.alert('Error');
      }
    } catch (error) {
      if (error.response) {
        console.log('Error response:', error.response.data);

        if (error.response.status === 422) {
          Alert.alert('Email id already exist');
        } else {
          Alert.alert('Please try again later.');
        }
      } else {
        console.log('Error message:', error.message);
        Alert.alert('Please try again later.');
      }
    }
  }
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{marginTop: verticalScale(15)}}>
          <Logo />
        </View>

        <View
          style={{
            height: '91%',
            borderWidth: moderateScale(2),
            marginTop: verticalScale(20),
            marginHorizontal: horizontalScale(15),
            paddingHorizontal: horizontalScale(10),
            elevation: 2,
            borderColor: '#E0E0E0',
            marginBottom: verticalScale(50),
          }}>
          <Text
            style={{
              fontSize: moderateScale(20),
              fontWeight: '600',
              color: 'black',
              fontFamily: 'RobotoMono-SemiBold',
              marginTop: verticalScale(7),
            }}>
            Create Account
          </Text>

          <Text
            style={{
              fontSize: moderateScale(14),
              marginTop: verticalScale(10),
              fontWeight: '400',
              color: 'black',
            }}>
            First Name
          </Text>

          <View
            style={{
              marginTop: verticalScale(10),
              flexDirection: 'row',
              borderWidth: 3,
              borderRadius: moderateScale(8),
              borderColor: '#ccc',
            }}>
            <Icon1
              style={{
                marginTop: verticalScale(10.5),
                marginLeft: horizontalScale(6),
              }}
              name={'user'}
              size={23}
              color={'grey'}></Icon1>
            <TextInput
              value={firstname}
              onChangeText={text => setFirstname(text)}
              onBlur={validateFirstname}
              style={{
                height: verticalScale(43),
                width: horizontalScale(240),
                // borderWidth: 2,
                marginLeft: horizontalScale(10),
              }}></TextInput>
          </View>
          {firtnameError ? (
            <Text
              style={{
                color: 'red',
                fontSize: moderateScale(12.5),
                marginTop: verticalScale(3),
                marginLeft: horizontalScale(5),
              }}>
              {firtnameError}
            </Text>
          ) : null}

          <Text
            style={{
              fontSize: moderateScale(14),
              marginTop: verticalScale(10),
              fontWeight: '400',
              color: 'black',
            }}>
            Last Name
          </Text>

          <View
            style={{
              marginTop: verticalScale(10),
              flexDirection: 'row',
              borderWidth: 3,
              borderRadius: moderateScale(8),
              borderColor: '#ccc',
            }}>
            <Icon2
              style={{
                marginTop: verticalScale(10.5),
                marginLeft: horizontalScale(6),
              }}
              name={'address-card'}
              size={23}
              color={'grey'}></Icon2>
            <TextInput
              value={lastname}
              onChangeText={text => setLastname(text)}
              onBlur={validateLastname}
              style={{
                height: verticalScale(43),
                width: horizontalScale(240),
                // borderWidth: 2,
                marginLeft: horizontalScale(10),
              }}></TextInput>
          </View>
          {lastnameError ? (
            <Text
              style={{
                color: 'red',
                fontSize: moderateScale(12.5),
                marginTop: verticalScale(3),
                marginLeft: horizontalScale(5),
              }}>
              {lastnameError}
            </Text>
          ) : null}

          <Text
            style={{
              fontSize: moderateScale(14),
              marginTop: verticalScale(10),
              fontWeight: '400',
              color: 'black',
            }}>
            Email
          </Text>

          <View
            style={{
              marginTop: verticalScale(10),
              flexDirection: 'row',
              borderWidth: 3,
              borderRadius: moderateScale(8),
              borderColor: '#ccc',
            }}>
            <Icon3
              style={{
                marginTop: verticalScale(10.5),
                marginLeft: horizontalScale(6),
              }}
              name={'email'}
              size={23}
              color={'grey'}></Icon3>
            <TextInput
              value={email}
              onChangeText={text => setEmail(text)}
              onBlur={validateEmail}
              style={{
                height: verticalScale(43),
                width: horizontalScale(240),
                // borderWidth: 2,
                marginLeft: horizontalScale(10),
              }}></TextInput>
          </View>
          {emailError ? (
            <Text
              style={{
                color: 'red',
                fontSize: moderateScale(12.5),
                marginTop: verticalScale(3),
                marginLeft: horizontalScale(5),
              }}>
              {emailError}
            </Text>
          ) : null}

          <Text
            style={{
              fontSize: moderateScale(14),
              marginTop: verticalScale(10),
              fontWeight: '400',
              color: 'black',
            }}>
            Password
          </Text>

          <View
            style={{
              marginTop: verticalScale(10),
              flexDirection: 'row',
              borderWidth: 3,
              borderRadius: moderateScale(8),
              borderColor: '#ccc',
            }}>
            <Icon4
              style={{
                marginTop: verticalScale(10.5),
                marginLeft: horizontalScale(6),
              }}
              name={'lock'}
              size={23}
              color={'grey'}></Icon4>
            <TextInput
              value={password}
              onChangeText={text => setPassword(text)}
              onBlur={validatePassword}
              secureTextEntry={secure}
              style={{
                height: verticalScale(43),
                width: horizontalScale(230),
                // borderWidth: 2,
                marginLeft: horizontalScale(10),
              }}></TextInput>

            {secure === false ? (
              <TouchableOpacity
                style={{
                  marginTop: verticalScale(12),
                  marginLeft: horizontalScale(10),
                }}
                onPress={() => setSecure(!secure)}>
                <Icon7 name={'eye'} size={23} color={'grey'}></Icon7>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  marginTop: verticalScale(12),
                  marginLeft: horizontalScale(10),
                }}
                onPress={() => setSecure(!secure)}>
                <Icon8 name={'eye-with-line'} size={23} color={'grey'}></Icon8>
              </TouchableOpacity>
            )}
          </View>
          {passwordError ? (
            <Text
              style={{
                color: 'red',
                fontSize: moderateScale(12.5),
                marginTop: verticalScale(3),
                marginLeft: horizontalScale(5),
              }}>
              {passwordError}
            </Text>
          ) : null}

          <Text
            style={{
              fontSize: moderateScale(14),
              marginTop: verticalScale(10),
              fontWeight: '400',
              color: 'black',
            }}>
            Confirm Password
          </Text>

          <View
            style={{
              marginTop: verticalScale(10),
              flexDirection: 'row',
              borderWidth: 3,
              borderRadius: moderateScale(8),
              borderColor: '#ccc',
            }}>
            <Icon5
              style={{
                marginTop: verticalScale(10.5),
                marginLeft: horizontalScale(6),
              }}
              name={'lock'}
              size={23}
              color={'grey'}></Icon5>
            <TextInput
              value={confirmpassword}
              onChangeText={text => setConfirmpassword(text)}
              onBlur={validateConfirmPassword}
              style={{
                height: verticalScale(43),
                width: horizontalScale(240),
                // borderWidth: 2,
                marginLeft: horizontalScale(10),
              }}></TextInput>
          </View>
          {confirmpasswordError ? (
            <Text
              style={{
                color: 'red',
                fontSize: moderateScale(12.5),
                marginTop: verticalScale(3),
                marginLeft: horizontalScale(5),
              }}>
              {confirmpasswordError}
            </Text>
          ) : null}

          <Text
            style={{
              fontSize: moderateScale(14),
              marginTop: verticalScale(10),
              fontWeight: '400',
              color: 'black',
            }}>
            Phone Number
          </Text>

          <View
            style={{
              marginTop: verticalScale(10),
              flexDirection: 'row',
              borderWidth: 3,
              borderRadius: moderateScale(8),
              borderColor: '#ccc',
            }}>
            <Icon6
              style={{
                marginTop: verticalScale(10.5),
                marginLeft: horizontalScale(6),
              }}
              name={'phone'}
              size={23}
              color={'grey'}></Icon6>
            <TextInput
              keyboardType={'numeric'}
              value={phonenumber}
              onChangeText={text => setPhonenumber(text)}
              maxLength={10}
              onBlur={validatePhoneNumber}
              style={{
                height: verticalScale(43),
                width: horizontalScale(240),
                // borderWidth: 2,
                marginLeft: horizontalScale(10),
              }}></TextInput>
          </View>
          {phonenumberError ? (
            <Text
              style={{
                color: 'red',
                fontSize: moderateScale(12.5),
                marginTop: verticalScale(3),
                marginLeft: horizontalScale(5),
              }}>
              {phonenumberError}
            </Text>
          ) : null}

          <Text
            style={{
              fontSize: moderateScale(14),
              marginTop: verticalScale(10),
              fontWeight: '400',
              color: 'black',
            }}>
            Select Your Gender :
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: verticalScale(10),
            }}>
            <RadioButton
              value="M"
              status={checked === 'Male' ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked('Male'), setGenderError('');
              }}></RadioButton>
            <Text
              style={{
                fontSize: moderateScale(14),
                marginTop: verticalScale(5),
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
                fontSize: moderateScale(14),
                marginTop: verticalScale(5),
                fontWeight: '400',
                color: 'black',
              }}>
              Female
            </Text>
          </View>
          {genderError ? (
            <Text
              style={{
                color: 'red',
                fontSize: moderateScale(12.5),
                marginTop: verticalScale(3),
                marginLeft: horizontalScale(5),
              }}>
              {genderError}
            </Text>
          ) : null}

          <TouchableOpacity
            onPress={handleRegister}
            style={{
              backgroundColor: '#2E6BC6',
              marginTop: verticalScale(25),
              marginHorizontal: horizontalScale(98),
              borderRadius: moderateScale(10),
              padding: verticalScale(4),
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: moderateScale(17.5),
                color: 'white',
                fontFamily: 'RobotoMono-SemiBold',
                padding: verticalScale(4),
              }}>
              Register
            </Text>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              marginTop: verticalScale(20),
            }}>
            <Text
              style={{
                fontSize: moderateScale(14),
                fontFamily: 'RobotoMono-SemiBold',
              }}>
              Already have an account?
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Login')}>
              <Text
                style={{
                  fontSize: moderateScale(14),
                  marginLeft: horizontalScale(10),
                  fontFamily: 'RobotoMono-SemiBold',
                  color: 'black',
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
