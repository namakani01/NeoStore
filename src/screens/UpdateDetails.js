import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import DatePicker from 'react-native-date-picker';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';
import moment from 'moment';

import Icon1 from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import Icon4 from 'react-native-vector-icons/Fontisto';
import Icon5 from 'react-native-vector-icons/SimpleLineIcons';
import Icon6 from 'react-native-vector-icons/Fontisto';

import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../assests/styles/Metrics';

const UpdateDetails = () => {
  var emailregex = /[a-zA-Z0-9\.\-_]+[@]+[a-z]+[\.]+[a-z]{2,3}/;

  const [image, setImage] = useState(
    'https://gratisography.com/wp-content/uploads/2024/03/gratisography-funflower-800x525.jpg',
  );

  const [date, setDate] = useState(moment().toDate());
  const [formattedate, setFormattedDate] = useState('');
  const [open, setOpen] = useState(false);
  const [check, setCheck] = useState(false);

  const [firstname, setFirstname] = useState('');

  const [lastname, setLastname] = useState('');

  const [email, setEmail] = useState('');

  const [phonenumber, setPhonenumber] = useState('');

  const [firtnameError, setFirstnameError] = useState('');
  const [lastnameError, setLastnameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phonenumberError, setPhonenumberError] = useState('');

  const Picture = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      setImage(`data:${image.mime};base64,${image.data}`);
    });
  };

  async function FetchUserDetails() {
    try {
      const accessToken = await EncryptedStorage.getItem('access_token');
      // console.log('Retrieved Token:', accessToken);

      if (accessToken) {
        let result = await axios.get(
          'http://staging.php-dev.in:8844/trainingapp/api/users/getUserData',
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              access_token: accessToken,
            },
          },
        );
        // console.log(result.data);
        const userData = result.data.data?.user_data;
        setFirstname(userData.first_name);
        setLastname(userData.last_name);
        setEmail(userData.email);
        setPhonenumber(userData.phone_no);

        const dob = userData.dob;
        setFormattedDate(dob);
        setDate(moment(dob, 'DD-MM-YYYY').toDate());

        if (userData.profile_pic) {
          setImage(userData.profile_pic);
        }
        setCheck(true);
      } else {
        Alert.alert('Error.');
      }
    } catch (error) {
      console.log(error.response ? error.response.data : error.message);
    }
  }

  useEffect(() => {
    FetchUserDetails();
  }, []);

  async function UpdateUserDetails() {
    const formData = new FormData();
    formData.append('first_name', firstname);
    formData.append('last_name', lastname);
    formData.append('email', email);
    formData.append('profile_pic', image);
    formData.append('dob', formattedate);
    formData.append('phone_no', phonenumber);

    try {
      const accessToken = await EncryptedStorage.getItem('access_token');
      // console.log('Retrieved Token:', accessToken);

      if (accessToken) {
        let result = await axios.post(
          'http://staging.php-dev.in:8844/trainingapp/api/users/update',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              access_token: accessToken,
            },
          },
        );
        // console.log('>>>>', result?.data);
        setImage(result?.data?.data?.profile_pic);
        Alert.alert('User details updated successfully');
      } else {
        Alert.alert('Error');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleConfirm = selectedDate => {
    setOpen(false);
    setDate(selectedDate);
    const formatted = moment(selectedDate).format('DD/MM/YYYY');
    setFormattedDate(formatted);
    setCheck(true);
  };

  const handleUpdateDetails = () => {
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

    if (phonenumber === '') {
      setPhonenumberError('Phone Number is required');
      valid = false;
    } else if (phonenumber.length < 10) {
      setPhonenumberError('Please enter 10 digit phone number');
      valid = false;
    } else {
      setPhonenumberError('');
    }

    if (valid) {
      UpdateUserDetails();
    } else {
      Alert.alert('Please enter correct details');
    }
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      <SafeAreaView>
        <View
          style={{
            marginHorizontal: horizontalScale(12),
            marginTop: verticalScale(20),
          }}>
          <View>
            <Image
              style={{
                height: verticalScale(100),
                width: horizontalScale(100),
                borderRadius: moderateScale(70),
                padding: horizontalScale(54),
                alignSelf: 'center',
                borderWidth: 2,
                borderColor: 'grey',
              }}
              source={{uri: image}}
            />
          </View>

          <View
            style={{
              position: 'absolute',
              marginLeft: horizontalScale(195),
              marginTop: verticalScale(65),
            }}>
            <TouchableOpacity
              onPress={Picture}
              style={{
                height: verticalScale(40),
                width: horizontalScale(40),
                borderRadius: moderateScale(40),
                backgroundColor: 'white',
                alignSelf: 'center',
              }}>
              <Icon1
                style={{
                  alignSelf: 'center',
                  marginTop: verticalScale(10),
                  marginLeft: horizontalScale(4),
                }}
                name="camera"
                size={21}></Icon1>
            </TouchableOpacity>
          </View>

          <Text
            style={{
              fontSize: moderateScale(14),
              fontWeight: '400',
              color: 'black',
              marginTop: verticalScale(10),
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
            <Icon2
              style={{
                marginTop: verticalScale(10),
                marginLeft: horizontalScale(7),
              }}
              name="user"
              size={21}></Icon2>

            <TextInput
              value={firstname}
              onChangeText={text => setFirstname(text)}
              style={{
                marginLeft: horizontalScale(7),
                height: verticalScale(40),
                // borderWidth: 2,
                width: '80%',
              }}></TextInput>
          </View>
          {firtnameError ? (
            <Text
              style={{
                color: 'red',
                fontSize: moderateScale(13),
                marginTop: verticalScale(4),
                marginLeft: horizontalScale(5),
              }}>
              {firtnameError}
            </Text>
          ) : null}

          <Text
            style={{
              fontSize: moderateScale(14),
              fontWeight: '400',
              color: 'black',
              marginTop: verticalScale(10),
            }}>
            Last Name
          </Text>

          <View
            style={{
              marginTop: verticalScale(10),
              flexDirection: 'row',
              // backgroundColor: 'red',
              borderWidth: 3,
              borderRadius: moderateScale(8),
              borderColor: '#ccc',
            }}>
            <Icon3
              style={{
                marginTop: verticalScale(11),
                marginLeft: horizontalScale(7),
              }}
              name="address-card"
              size={21}></Icon3>
            <TextInput
              value={lastname}
              onChangeText={text => setLastname(text)}
              style={{
                marginLeft: horizontalScale(7),
                height: verticalScale(40),
                width: '80%',
                // borderWidth: 2,
              }}></TextInput>
          </View>
          {lastnameError ? (
            <Text
              style={{
                color: 'red',
                fontSize: moderateScale(13),
                marginTop: verticalScale(4),
                marginLeft: horizontalScale(5),
              }}>
              {lastnameError}
            </Text>
          ) : null}

          <Text
            style={{
              fontSize: moderateScale(14),
              fontWeight: '400',
              color: 'black',
              marginTop: verticalScale(10),
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
            <Icon4
              style={{
                marginTop: verticalScale(11),
                marginLeft: horizontalScale(7),
              }}
              name="email"
              size={21}></Icon4>

            <TextInput
              value={email}
              onChangeText={text => setEmail(text)}
              style={{
                marginLeft: horizontalScale(7),
                height: verticalScale(40),
                width: '80%',
                // borderWidth: 2,
              }}></TextInput>
          </View>
          {emailError ? (
            <Text
              style={{
                color: 'red',
                fontSize: moderateScale(13),
                marginTop: verticalScale(3),
                marginLeft: horizontalScale(5),
              }}>
              {emailError}
            </Text>
          ) : null}

          <Text
            style={{
              fontSize: moderateScale(14),
              fontWeight: '400',
              color: 'black',
              marginTop: verticalScale(10),
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
            <Icon5
              style={{
                marginTop: verticalScale(11),
                marginLeft: horizontalScale(7),
              }}
              name={'phone'}
              size={21}
              color={'grey'}></Icon5>
            <TextInput
              value={phonenumber}
              onChangeText={text => setPhonenumber(text)}
              keyboardType="numeric"
              style={{
                marginLeft: horizontalScale(7),
                height: verticalScale(40),
                width: '80%',
                // borderWidth: 2,
              }}></TextInput>
          </View>
          {phonenumberError ? (
            <Text
              style={{
                color: 'red',
                fontSize: moderateScale(13),
                marginTop: verticalScale(3),
                marginLeft: horizontalScale(5),
              }}>
              {phonenumberError}
            </Text>
          ) : null}

          <Text
            style={{
              fontSize: moderateScale(14),
              fontWeight: '400',
              color: 'black',
              marginTop: verticalScale(10),
            }}>
            Date of Birth
          </Text>
          <View
            style={{
              marginTop: verticalScale(10),
              borderWidth: 3,
              borderColor: '#ccc',
              borderRadius: moderateScale(8),
              padding: horizontalScale(10),
              // backgroundColor: 'red',
            }}>
            <TouchableOpacity onPress={() => setOpen(true)}>
              <View style={{flexDirection: 'row'}}>
                <Icon6 name="date" size={20} color={'grey'}></Icon6>
                <Text
                  style={{
                    marginLeft: horizontalScale(17),
                    color: 'black',
                    fontWeight: '400',
                    fontSize: moderateScale(14),
                  }}>
                  {check ? formattedate : 'Select Date of Birth'}
                </Text>
              </View>
              <DatePicker
                modal
                mode="date"
                open={open}
                date={date}
                onConfirm={handleConfirm}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={handleUpdateDetails}
            style={{
              backgroundColor: '#2E6BC6',
              marginTop: verticalScale(30),
              padding: horizontalScale(5),
              marginHorizontal: horizontalScale(105),
              borderRadius: moderateScale(10),
            }}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                padding: horizontalScale(4),
                fontSize: moderateScale(14.4),
                fontFamily: 'RobotoMono-SemiBold',
              }}>
              Save Changes
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default UpdateDetails;
