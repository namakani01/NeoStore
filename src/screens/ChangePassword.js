import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Entypo';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../assests/styles/Metrics';

const ChangePassword = props => {
  var passwordregex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]*$/;

  const [secure1, setSecure1] = useState(false);
  const [secure2, setSecure2] = useState(false);
  const [secure3, setSecure3] = useState(false);

  const [currentpassword, setCurrentPassword] = useState('');
  const [newpassword, setNewPassword] = useState('');
  const [confirmnewpassword, setConfirmNewPassword] = useState('');

  const [currentpasswordError, setCurrentPasswordError] = useState('');
  const [newpasswordError, setNewPasswordError] = useState('');
  const [confirmpasswordError, setConfirmPasswordError] = useState('');

  const validatecurrentpassword = () => {
    if (!currentpassword) {
      setCurrentPasswordError('Current Password is required.');
    } else if (!passwordregex.test(currentpassword)) {
      setCurrentPasswordError(
        'A minimum 8 characters password contains a combination of uppercase and lowercase letter and number are required.',
      );
    } else {
      setCurrentPasswordError('');
    }
  };

  const validatenewpassword = () => {
    if (!newpassword) {
      setNewPasswordError('New Password is required.');
    } else if (!passwordregex.test(newpassword)) {
      setNewPasswordError(
        'A minimum 8 characters password contains a combination of uppercase and lowercase letter and number are required.',
      );
    } else if (currentpassword === newpassword) {
      setNewPasswordError('Current password and old password cannot be same');
    } else {
      setNewPasswordError('');
    }
  };

  const validateConfirmNewpassword = () => {
    if (!confirmnewpassword) {
      setConfirmPasswordError('Confirm New Password is required.');
    } else if (newpassword !== confirmnewpassword) {
      setConfirmPasswordError(
        'The  New password and Confirm new password should be same.',
      );
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleSaveChanges = () => {
    let valid = true;

    if (currentpassword === '') {
      setCurrentPasswordError('Current Pasword is requird');
      valid = false;
    } else if (!passwordregex.test(currentpassword)) {
      setCurrentPasswordError('Please enter correct password.');
      valid = false;
    } else {
      setCurrentPasswordError('');
    }

    if (newpassword === '') {
      setNewPasswordError('New Pasword is requird');
      valid = false;
    } else if (!passwordregex.test(newpassword)) {
      setNewPasswordError('Please enter correct password.');
      valid = false;
    } else {
      setNewPasswordError('');
    }

    if (confirmnewpassword === '') {
      setConfirmPasswordError('Confirm New Pasword is requird');
      valid = false;
    } else if (newpassword !== confirmnewpassword) {
      setConfirmPasswordError(
        'The New password and Confirm new password should be same.',
      );
      valid = false;
    } else {
      setConfirmPasswordError('');
    }

    if (valid) {
      ChangePassword();
    } else {
      Alert.alert('Please enter correct details');
    }
  };

  async function ChangePassword() {
    const formData = new FormData();
    formData.append('old_password', currentpassword);
    formData.append('password', newpassword);
    formData.append('confirm_password', confirmnewpassword);

    try {
      const accessToken = await EncryptedStorage.getItem('access_token');

      if (accessToken) {
        let result = await axios.post(
          'http://staging.php-dev.in:8844/trainingapp/api/users/change',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              access_token: accessToken,
            },
          },
        );
        console.log(result.data);
        Alert.alert('Password updated successfully');
        props.navigation.navigate('Profile');
      } else {
        Alert.alert('Error not able to change password');
      }
    } catch (error) {
      console.log(error.response ? error.response.data : error.message);
    }
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', backgroundColor: 'white'}}>
      <View>
        <View
          style={{
            marginLeft: horizontalScale(45),
            backgroundColor: 'white',
            position: 'absolute',
            zIndex: 99,
          }}>
          <Text style={{color: 'black', fontSize: moderateScale(16.5)}}>
            {' '}
            Password change{' '}
          </Text>
        </View>

        <View
          style={{
            borderWidth: 3,
            height: verticalScale(410),
            borderRadius: moderateScale(10),
            borderColor: '#ccc',
            marginHorizontal: horizontalScale(16),
            marginTop: verticalScale(10),
          }}>
          <Text
            style={{
              marginTop: verticalScale(25),
              marginLeft: horizontalScale(20),
              color: 'black',
              fontWeight: '400',
              fontSize: moderateScale(14),
            }}>
            Current password
          </Text>

          <View
            style={{
              borderWidth: 3,
              borderColor: '#ccc',
              flexDirection: 'row',
              marginTop: verticalScale(10),
              borderRadius: moderateScale(8),
              marginHorizontal: horizontalScale(20),
              // backgroundColor: 'red',
            }}>
            <TextInput
              onChangeText={text => setCurrentPassword(text)}
              onBlur={validatecurrentpassword}
              secureTextEntry={secure1}
              style={{
                // borderWidth: 2,
                height: verticalScale(40),
                width: '75%',
              }}></TextInput>
            {secure1 === false ? (
              <TouchableOpacity
                onPress={() => setSecure1(!secure1)}
                style={{
                  marginTop: verticalScale(10),
                  marginLeft: horizontalScale(25),
                }}>
                <Icon name="eye" size={21} color="grey"></Icon>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => setSecure1(!secure1)}
                style={{
                  marginTop: verticalScale(10),
                  marginLeft: horizontalScale(25),
                }}>
                <Icon1 name="eye-with-line" size={21} color="grey"></Icon1>
              </TouchableOpacity>
            )}
          </View>
          {currentpasswordError ? (
            <Text
              style={{
                color: 'red',
                fontSize: moderateScale(12.5),
                marginTop: verticalScale(4),
                marginLeft: horizontalScale(21),
              }}>
              {currentpasswordError}
            </Text>
          ) : null}

          <Text
            style={{
              marginTop: verticalScale(13),
              marginLeft: horizontalScale(20),
              color: 'black',
              fontWeight: '400',
              fontSize: moderateScale(14),
            }}>
            New password
          </Text>
          <View
            style={{
              borderWidth: 3,
              borderColor: '#ccc',
              flexDirection: 'row',
              marginTop: verticalScale(10),
              borderRadius: moderateScale(8),
              marginHorizontal: horizontalScale(20),
              // backgroundColor: 'red',
            }}>
            <TextInput
              onChangeText={text => setNewPassword(text)}
              onBlur={validatenewpassword}
              secureTextEntry={false}
              style={{
                // borderWidth: 2,
                height: verticalScale(40),
                width: '75%',
              }}></TextInput>
            {secure2 === false ? (
              <TouchableOpacity
                onPress={() => setSecure2(!secure2)}
                style={{
                  marginTop: verticalScale(10),
                  marginLeft: horizontalScale(25),
                }}>
                <Icon name="eye" size={21} color="grey"></Icon>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => setSecure2(!secure2)}
                style={{
                  marginTop: verticalScale(10),
                  marginLeft: horizontalScale(25),
                }}>
                <Icon1 name="eye-with-line" size={21} color="grey"></Icon1>
              </TouchableOpacity>
            )}
          </View>
          {newpasswordError ? (
            <Text
              style={{
                fontSize: moderateScale(12.5),
                marginTop: verticalScale(4),
                marginLeft: horizontalScale(21),
                color: 'red',
              }}>
              {newpasswordError}
            </Text>
          ) : null}

          <Text
            style={{
              marginTop: verticalScale(13),
              marginLeft: horizontalScale(20),
              color: 'black',
              fontWeight: '400',
              fontSize: moderateScale(14),
            }}>
            Confirm new password
          </Text>
          <View
            style={{
              borderWidth: 3,
              borderColor: '#ccc',
              flexDirection: 'row',
              marginTop: verticalScale(10),
              borderRadius: moderateScale(8),
              marginHorizontal: horizontalScale(20),
              // backgroundColor: 'red',
            }}>
            <TextInput
              onChangeText={text => setConfirmNewPassword(text)}
              onBlur={validateConfirmNewpassword}
              secureTextEntry={false}
              style={{
                // borderWidth: 2,
                height: verticalScale(40),
                width: '75%',
              }}></TextInput>
            {secure3 === false ? (
              <TouchableOpacity
                onPress={() => setSecure3(!secure3)}
                style={{
                  marginTop: verticalScale(10),
                  marginLeft: horizontalScale(25),
                }}>
                <Icon name="eye" size={21} color="grey"></Icon>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => setSecure3(!secure3)}
                style={{
                  marginTop: verticalScale(10),
                  marginLeft: horizontalScale(25),
                }}>
                <Icon1 name="eye-with-line" size={21} color="grey"></Icon1>
              </TouchableOpacity>
            )}
          </View>
          {confirmpasswordError ? (
            <Text
              style={{
                fontSize: moderateScale(12.5),
                marginTop: verticalScale(4),
                marginLeft: horizontalScale(21),
                color: 'red',
              }}>
              {confirmpasswordError}
            </Text>
          ) : null}

          <TouchableOpacity
            onPress={handleSaveChanges}
            style={{
              backgroundColor: '#2E6BC6',
              marginTop: verticalScale(25),
              marginHorizontal: horizontalScale(100),
              borderRadius: moderateScale(10),
              padding: horizontalScale(5),
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: moderateScale(15),
                color: 'white',
                fontFamily: 'RobotoMono-SemiBold',
                padding: horizontalScale(4),
              }}>
              Save Changes
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ChangePassword;
