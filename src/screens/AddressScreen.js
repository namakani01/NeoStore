import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Feather';
import React, {useState} from 'react';
import {RadioButton} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {deleteAddress} from '../redux/reducer';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../assests/styles/Metrics';

const AddressScreen = props => {
  const cartTotal = useSelector(state => state.cartTotal.cartTotal);

  const dispatch = useDispatch();

  const [checked, setChecked] = useState();

  const data = useSelector(state => state);
  // console.log('data is', data);

  const handledelete = id => {
    dispatch(deleteAddress(id));
  };

  const handleProceedToCheckout = () => {
    if (checked) {
      const selectedAddress = data.address.find(item => item.id === checked);
      props.navigation.navigate('checkout', {selectedAddress});
    } else {
      alert('Please select an address');
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {data.address.length === 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: moderateScale(15), color: 'black'}}>
            Your Address List is Empty
          </Text>
          <Text
            style={{
              fontSize: moderateScale(15),
              color: 'black',
              marginTop: 10,
            }}>
            Please add a Address by clicking the + button.
          </Text>
          <Image
            style={{
              height: verticalScale(85),
              width: horizontalScale(85),
              marginTop: verticalScale(20),
            }}
            resizeMode="contain"
            source={require('../assests/images/pin.png')}></Image>
        </View>
      ) : (
        <>
          <FlatList
            data={data.address}
            renderItem={({item}) => (
              <View
                style={{
                  borderWidth: 1,
                  height: verticalScale(100),
                  width: horizontalScale(320),
                  marginTop: verticalScale(25),
                  alignSelf: 'center',
                  borderRadius: moderateScale(10),
                  backgroundColor: 'white',
                  borderColor: '#ddd',
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.1,
                  shadowRadius: 5,
                  elevation: 4,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginTop: verticalScale(10),
                  }}>
                  <RadioButton
                    color="#2E6BC6"
                    value={item.id}
                    status={checked === item.id ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setChecked(item.id);
                    }}></RadioButton>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: moderateScale(15),
                      color: 'black',
                      marginTop: verticalScale(3),
                    }}>
                    {item.addresstype}
                  </Text>

                  <TouchableOpacity
                    style={{marginLeft: horizontalScale(100)}}
                    onPress={() => props.navigation.navigate('Add_Address')}>
                    <Icon1 name="edit" size={20}></Icon1>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => handledelete(item.id)}>
                    <Icon name="delete" size={20}></Icon>
                  </TouchableOpacity>
                </View>
                <Text
                  style={{
                    fontSize: moderateScale(15),
                    textAlign: 'left',
                    marginLeft: horizontalScale(30),
                    marginTop: verticalScale(8),
                  }}>{`${item.houseno},${item.street},${item.city},${item.state}.${item.pincode}`}</Text>
              </View>
            )}></FlatList>

          <View
            style={{
              borderColor: '#ccc',
              borderWidth: 2,
              borderRadius: moderateScale(8),
              backgroundColor: '#F0F4F7',
              paddingVertical: verticalScale(10),
              paddingHorizontal: horizontalScale(15),
              marginHorizontal: horizontalScale(10),
              marginBottom: verticalScale(10),
            }}>
            <Text
              style={{
                fontSize: moderateScale(18),
                fontWeight: '500',
                color: 'black',
              }}>
              Cart Totals
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginRight: horizontalScale(10),
                marginTop: verticalScale(10),
              }}>
              <Text
                style={{
                  fontSize: moderateScale(15.9),
                  fontWeight: '400',
                  color: 'black',
                }}>
                Total
              </Text>

              <Text
                style={{
                  fontSize: moderateScale(18),
                  fontWeight: 'bold',
                  color: '#2E6BC6',
                }}>
                {`₹${cartTotal}`}
              </Text>
            </View>

            <TouchableOpacity
              onPress={handleProceedToCheckout}
              style={{
                backgroundColor: '#2E6BC6',
                marginTop: verticalScale(20),
                marginHorizontal: horizontalScale(50),
                marginBottom: verticalScale(10),
                borderRadius: moderateScale(7),
                paddingVertical: verticalScale(10),
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: moderateScale(14),
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                PROCEED
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default AddressScreen;
