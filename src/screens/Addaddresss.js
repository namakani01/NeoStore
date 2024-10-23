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

const Add_Address = props => {
  // console.log("props",props.route.params.item)

  const dispatch = useDispatch();

  const [checked, setChecked] = useState();
  const [radiobuttonError, setRadioButtonError] = useState('');

  const [houseno, setHouseno] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');

  const [housenoError, setHousenoError] = useState('');
  const [streetError, setStreetError] = useState('');
  const [cityError, setCityError] = useState('');
  const [stateError, setStateError] = useState('');
  const [pincodeError, setPincodeError] = useState('');

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

    if (checked === '') {
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
        checked: checked,
      };
      dispatch(addAddress(addressobject));
      props.navigation.navigate('Address');
    } else {
      Alert.alert('Please fill all the fields');
    }
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{marginHorizontal: 12, borderWidth: 2}}>
        <Image
          style={{height: '12%', width: '50%', alignSelf: 'center'}}
          source={require('../assests/images/address.jpg')}></Image>
        <Text
          style={{
            fontSize: 15,
            marginTop: 10,
            fontWeight: '400',
            color: 'black',
          }}>
          House No. / Building Name
        </Text>

        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            borderWidth: 3,
            borderRadius: 8,
            borderColor: '#ccc',
          }}>
          <Icon
            style={{marginTop: 12, marginLeft: 5}}
            name={'home'}
            size={23}
            color={'grey'}></Icon>
          <TextInput
            value={houseno}
            onChangeText={text => setHouseno(text)}
            style={{height: 47, width: '85%', marginLeft: 10}}></TextInput>
        </View>
        {housenoError ? (
          <Text
            style={{color: 'red', fontSize: 14, marginTop: 3, marginLeft: 5}}>
            {housenoError}
          </Text>
        ) : null}

        <Text
          style={{
            fontSize: 15,
            marginTop: 10,
            fontWeight: '400',
            color: 'black',
          }}>
          Street Address
        </Text>

        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            borderWidth: 3,
            borderRadius: 8,
            borderColor: '#ccc',
          }}>
          <Icon
            style={{marginTop: 12, marginLeft: 5}}
            name={'address'}
            size={23}
            color={'grey'}></Icon>
          <TextInput
            value={street}
            onChangeText={text => setStreet(text)}
            style={{height: 47, width: '85%', marginLeft: 10}}></TextInput>
        </View>
        {streetError ? (
          <Text
            style={{color: 'red', fontSize: 14, marginTop: 3, marginLeft: 5}}>
            {streetError}
          </Text>
        ) : null}

        <Text
          style={{
            fontSize: 15,
            marginTop: 10,
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
            style={{marginTop: 12, marginLeft: 5}}
            name={'city'}
            size={23}
            color={'grey'}></Icon1>
          <TextInput
            value={city}
            onChangeText={text => setCity(text)}
            style={{height: 47, width: '85%', marginLeft: 10}}></TextInput>
        </View>
        {cityError ? (
          <Text
            style={{color: 'red', fontSize: 14, marginTop: 3, marginLeft: 5}}>
            {cityError}
          </Text>
        ) : null}

        <Text
          style={{
            fontSize: 15,
            marginTop: 10,
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
            style={{marginTop: 12, marginLeft: 5}}
            name={'pine-tree'}
            size={23}
            color={'grey'}></Icon1>
          <TextInput
            value={state}
            onChangeText={text => setState(text)}
            style={{height: 47, width: '85%', marginLeft: 10}}></TextInput>
        </View>
        {stateError ? (
          <Text
            style={{color: 'red', fontSize: 14, marginTop: 3, marginLeft: 5}}>
            {stateError}
          </Text>
        ) : null}

        <Text
          style={{
            fontSize: 15,
            marginTop: 10,
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
            style={{marginTop: 12, marginLeft: 5}}
            name={'pin'}
            size={23}
            color={'grey'}></Icon1>
          <TextInput
            value={pincode}
            onChangeText={text => setPincode(text)}
            keyboardType="numeric"
            maxLength={6}
            style={{height: 47, width: '85%', marginLeft: 10}}></TextInput>
        </View>
        {pincodeError ? (
          <Text
            style={{color: 'red', fontSize: 14, marginTop: 3, marginLeft: 5}}>
            {pincodeError}
          </Text>
        ) : null}

        <Text
          style={{
            fontSize: 15,
            marginTop: 10,
            fontWeight: '400',
            color: 'black',
          }}>
          Select Address Type :
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 10,
          }}>
          <RadioButton
            color="#2E6BC6"
            value="Home"
            status={checked === 'Home' ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked('Home'), setRadioButtonError('');
            }}></RadioButton>
          <Text
            style={{
              fontSize: 15,
              marginTop: 5,
              fontWeight: '400',
              color: 'black',
            }}>
            Home
          </Text>
          <RadioButton
            color="#2E6BC6"
            value="Office"
            status={checked === 'Office' ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked('Office'), setRadioButtonError('');
            }}></RadioButton>
          <Text
            style={{
              fontSize: 15,
              marginTop: 5,
              fontWeight: '400',
              color: 'black',
            }}>
            Office
          </Text>

          <RadioButton
            color="#2E6BC6"
            value="other"
            status={checked === 'Other' ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked('Other'), setRadioButtonError('');
            }}></RadioButton>
          <Text
            style={{
              fontSize: 15,
              marginTop: 5,
              fontWeight: '400',
              color: 'black',
            }}>
            Other
          </Text>
        </View>

        {radiobuttonError ? (
          <Text
            style={{color: 'red', fontSize: 14, marginTop: 3, marginLeft: 5}}>
            {radiobuttonError}
          </Text>
        ) : null}

        <TouchableOpacity
          onPress={() => handleSubmit()}
          style={{
            backgroundColor: '#2E6BC6',
            padding: 8,
            marginTop: 20,
            borderRadius: 7,
            marginHorizontal: 60,
          }}>
          <Text style={{fontSize: 17, color: 'white', textAlign: 'center'}}>
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Add_Address;
