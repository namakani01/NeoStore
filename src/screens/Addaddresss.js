import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import {RadioButton} from 'react-native-paper';
import {nanoid} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import {addAddress} from '../redux/reducer';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../assests/styles/Metrics';

const Add_Address = props => {
  const dispatch = useDispatch();

  const [houseno, setHouseno] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [addresstype, setAddresstype] = useState('');

  // console.log(addresstype);

  const [housenoError, setHousenoError] = useState('');
  const [streetError, setStreetError] = useState('');
  const [cityError, setCityError] = useState('');
  const [stateError, setStateError] = useState('');
  const [pincodeError, setPincodeError] = useState('');
  const [radiobuttonError, setRadioButtonError] = useState('');

  const handleSubmit = () => {
    let valid = true;

    if (houseno === '') {
      setHousenoError('Required');
      valid = false;
    } else {
      setHousenoError('');
    }

    if (street === '') {
      setStreetError('Required');
      valid = false;
    } else {
      setStreetError('');
    }

    if (city === '') {
      setCityError('Required');
      valid = false;
    } else {
      setCityError('');
    }

    if (state === '') {
      setStateError('Required');
      valid = false;
    } else {
      setStateError('');
    }

    if (pincode === '') {
      setPincodeError('Required');
      valid = false;
    } else if (pincode.length < 6) {
      setPincodeError('Pincode should be 6 digit');
      valid = false;
    } else {
      setPincodeError('');
    }

    if (addresstype === '') {
      setRadioButtonError('Required');
      valid = false;
    } else {
      setRadioButtonError('');
    }

    if (valid) {
      const addressobject = {
        id: nanoid(),
        houseno: houseno,
        street: street,
        city: city,
        state: state,
        pincode: pincode,
        addresstype: addresstype,
      };
      dispatch(addAddress(addressobject));
      props.navigation.navigate('Address');
    } else {
      Alert.alert('Please fill all the fields');
    }
  };

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View
        style={{
          marginHorizontal: horizontalScale(12),
          marginBottom: verticalScale(80),
          flex: 1,
        }}>
        <Image
          style={{
            height: verticalScale(110),
            width: horizontalScale(130),
            alignSelf: 'center',
          }}
          source={require('../assests/images/add.jpg')}
          resizeMode="cover"></Image>
        <Text
          style={{
            fontSize: moderateScale(14),
            marginTop: verticalScale(10),
            fontWeight: '400',
            color: 'black',
          }}>
          House No. / Building Name
        </Text>

        <View
          style={{
            marginTop: verticalScale(10),
            flexDirection: 'row',
            borderWidth: 3,
            borderRadius: moderateScale(8),
            borderColor: '#ccc',
          }}>
          <Icon
            style={{
              marginTop: verticalScale(12),
              marginLeft: horizontalScale(7),
            }}
            name={'home'}
            size={20}
            color={'grey'}></Icon>
          <TextInput
            value={houseno}
            onChangeText={text => setHouseno(text)}
            style={{
              height: verticalScale(40),
              width: '80%',
              marginLeft: horizontalScale(10),
              // borderWidth: 2,
            }}></TextInput>
        </View>
        {housenoError ? (
          <Text
            style={{
              color: 'red',
              fontSize: moderateScale(13),
              marginTop: verticalScale(3),
              marginLeft: horizontalScale(5),
            }}>
            {housenoError}
          </Text>
        ) : null}

        <Text
          style={{
            fontSize: moderateScale(14),
            marginTop: verticalScale(10),
            fontWeight: '400',
            color: 'black',
          }}>
          Street Address
        </Text>

        <View
          style={{
            marginTop: verticalScale(10),
            flexDirection: 'row',
            borderWidth: 3,
            borderRadius: moderateScale(8),
            borderColor: '#ccc',
          }}>
          <Icon
            style={{
              marginTop: verticalScale(12),
              marginLeft: horizontalScale(8),
            }}
            name={'address'}
            size={20}
            color={'grey'}></Icon>
          <TextInput
            value={street}
            onChangeText={text => setStreet(text)}
            style={{
              height: verticalScale(40),
              width: '80%',
              marginLeft: horizontalScale(10),
              // borderWidth: 2,
            }}></TextInput>
        </View>
        {streetError ? (
          <Text
            style={{
              color: 'red',
              fontSize: moderateScale(13),
              marginTop: verticalScale(3),
              marginLeft: horizontalScale(5),
            }}>
            {streetError}
          </Text>
        ) : null}

        <Text
          style={{
            fontSize: moderateScale(14),
            marginTop: verticalScale(10),
            fontWeight: '400',
            color: 'black',
          }}>
          City
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
            style={{
              marginTop: verticalScale(12),
              marginLeft: horizontalScale(7),
            }}
            name={'city'}
            size={20}
            color={'grey'}></Icon1>
          <TextInput
            value={city}
            onChangeText={text => setCity(text)}
            style={{
              height: verticalScale(40),
              width: '80%',
              marginLeft: horizontalScale(10),
              // borderWidth: 2,
            }}></TextInput>
        </View>
        {cityError ? (
          <Text
            style={{
              color: 'red',
              fontSize: moderateScale(13),
              marginTop: verticalScale(3),
              marginLeft: horizontalScale(5),
            }}>
            {cityError}
          </Text>
        ) : null}

        <Text
          style={{
            fontSize: moderateScale(14),
            marginTop: verticalScale(10),
            fontWeight: '400',
            color: 'black',
          }}>
          State
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
            style={{
              marginTop: verticalScale(12),
              marginLeft: horizontalScale(7),
            }}
            name={'pine-tree'}
            size={20}
            color={'grey'}></Icon1>
          <TextInput
            value={state}
            onChangeText={text => setState(text)}
            style={{
              height: verticalScale(40),
              width: '80%',
              marginLeft: horizontalScale(10),
              // borderWidth: 2,
            }}></TextInput>
        </View>
        {stateError ? (
          <Text
            style={{
              color: 'red',
              fontSize: moderateScale(13),
              marginTop: verticalScale(3),
              marginLeft: horizontalScale(5),
            }}>
            {stateError}
          </Text>
        ) : null}

        <Text
          style={{
            fontSize: moderateScale(14),
            marginTop: verticalScale(10),
            fontWeight: '400',
            color: 'black',
          }}>
          Pincode
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
            style={{
              marginTop: verticalScale(12),
              marginLeft: horizontalScale(7),
            }}
            name={'pin'}
            size={20}
            color={'grey'}></Icon1>
          <TextInput
            value={pincode}
            onChangeText={text => setPincode(text)}
            keyboardType="numeric"
            maxLength={6}
            style={{
              height: verticalScale(40),
              width: '80%',
              marginLeft: horizontalScale(10),
              // borderWidth: 2,
            }}></TextInput>
        </View>
        {pincodeError ? (
          <Text
            style={{
              color: 'red',
              fontSize: moderateScale(13),
              marginTop: verticalScale(3),
              marginLeft: horizontalScale(5),
            }}>
            {pincodeError}
          </Text>
        ) : null}

        <Text
          style={{
            fontSize: moderateScale(14),
            marginTop: verticalScale(10),
            fontWeight: '400',
            color: 'black',
          }}>
          Select Address Type :
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: verticalScale(12),
          }}>
          <RadioButton
            color="#2E6BC6"
            value="Home"
            status={addresstype === 'Home' ? 'checked' : 'unchecked'}
            onPress={() => {
              setAddresstype('Home'), setRadioButtonError('');
            }}></RadioButton>
          <Text
            style={{
              fontSize: moderateScale(14),
              marginTop: verticalScale(5),
              fontWeight: '400',
              color: 'black',
            }}>
            Home
          </Text>
          <RadioButton
            color="#2E6BC6"
            value="Office"
            status={addresstype === 'Office' ? 'checked' : 'unchecked'}
            onPress={() => {
              setAddresstype('Office'), setRadioButtonError('');
            }}></RadioButton>
          <Text
            style={{
              fontSize: moderateScale(14),
              marginTop: verticalScale(5),
              fontWeight: '400',
              color: 'black',
            }}>
            Office
          </Text>

          <RadioButton
            color="#2E6BC6"
            value="other"
            status={addresstype === 'Other' ? 'checked' : 'unchecked'}
            onPress={() => {
              setAddresstype('Other'), setRadioButtonError('');
            }}></RadioButton>
          <Text
            style={{
              fontSize: moderateScale(14),
              marginTop: verticalScale(5),
              fontWeight: '400',
              color: 'black',
            }}>
            Other
          </Text>
        </View>

        {radiobuttonError ? (
          <Text
            style={{
              color: 'red',
              fontSize: moderateScale(13),
              marginTop: verticalScale(3),
              marginLeft: horizontalScale(5),
            }}>
            {radiobuttonError}
          </Text>
        ) : null}

        <TouchableOpacity
          onPress={() => handleSubmit()}
          style={{
            backgroundColor: '#2E6BC6',
            padding: horizontalScale(7.5),
            marginTop: verticalScale(20),
            borderRadius: moderateScale(7),
            marginHorizontal: horizontalScale(85),
          }}>
          <Text
            style={{
              fontSize: moderateScale(15.4),
              color: 'white',
              textAlign: 'center',
              fontWeight: 500,
            }}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Add_Address;
