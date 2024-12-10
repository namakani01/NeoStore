import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {setCartCount} from '../redux/cartSlice';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../assests/styles/Metrics';

const Checkout = props => {
  //   console.log('props', props);

  const {selectedAddress} = props.route.params;

  const data = useSelector(state => state.address);
  //   console.log(data);

  const cartTotal = useSelector(state => state.cartTotal.cartTotal);

  const cartCount = useSelector(state => state.cart.cartCount);

  const dispatch = useDispatch();

  const [output, setOutput] = useState([]);
  //   console.log(output);

  async function CartSummary() {
    try {
      const accessToken = await EncryptedStorage.getItem('access_token');
      // console.log(accessToken);

      if (accessToken) {
        let result = await axios.get(
          'http://staging.php-dev.in:8844/trainingapp/api/cart',
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              access_token: accessToken,
            },
          },
        );
        // console.log('cart items', result?.data?.data);
        setOutput(result?.data?.data || []);
        // dispatch(setCartTotal(result?.data?.total));
      } else {
        Alert.alert('Error');
      }
    } catch (error) {
      console.log(error.response ? error.response.data : error.message);
    }
  }

  async function PlaceOrder() {
    const addressString = `${selectedAddress.houseno}, ${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.pincode}`;

    // console.log(typeof addressString);

    try {
      const accessToken = await EncryptedStorage.getItem('access_token');
      // console.log('accessToken', accessToken);

      if (accessToken) {
        const formData = new FormData();
        formData.append('address', addressString);

        let result = await axios.post(
          `http://staging.php-dev.in:8844/trainingapp/api/order`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              access_token: accessToken,
            },
          },
        );

        // console.log('The order data', result?.data);/
        Alert.alert('Order placed successfully');
        dispatch(setCartCount(0));
        props.navigation.navigate('HomeStack');
      } else {
        Alert.alert('Error');
      }
    } catch (error) {
      console.log(error.response ? error.response.data : error.message);
    }
  }

  useEffect(() => {
    CartSummary();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Text
        style={{
          fontSize: moderateScale(16),
          color: 'black',
          marginLeft: horizontalScale(10),
          marginTop: verticalScale(10),
        }}>
        Delivery Details
      </Text>
      <View
        style={{
          borderWidth: 1,
          height: verticalScale(100),
          width: horizontalScale(340),
          marginTop: verticalScale(10),
          alignSelf: 'center',
          borderRadius: moderateScale(12),
          backgroundColor: 'white',
          borderColor: '#ddd',
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 4,
        }}>
        <Text
          style={{
            fontSize: moderateScale(15),
            textAlign: 'left',
            marginLeft: horizontalScale(20),
            marginTop: verticalScale(20),
            color: 'black',
            fontWeight: '320',
          }}>{`${selectedAddress.houseno}, ${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.pincode}`}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: verticalScale(12),
          // backgroundColor: 'red',
        }}>
        <Text
          style={{
            fontSize: moderateScale(16),
            color: 'black',
            marginLeft: horizontalScale(10),
          }}>
          Cart Summary
        </Text>

        <Text
          style={{
            fontSize: moderateScale(16),
            color: 'black',
            marginRight: horizontalScale(12),
          }}>
          Total Items : {cartCount}
        </Text>
      </View>
      <FlatList
        data={output}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                height: verticalScale(2),
                backgroundColor: '#ccc',
                marginTop: verticalScale(10),
              }}></View>
          );
        }}
        renderItem={({item}) => (
          <View
            style={{
              flexDirection: 'row',
              marginTop: verticalScale(22),
              marginLeft: horizontalScale(10),
            }}>
            <Image
              style={{height: 105, width: 125}}
              resizeMode="contain"
              source={{uri: item.product.product_images}}></Image>

            <View style={{flexDirection: 'column'}}>
              <Text
                style={{
                  fontSize: moderateScale(14.5),
                  fontWeight: '500',
                  color: 'black',
                  marginLeft: horizontalScale(12),
                }}>
                {item.product.name}
              </Text>

              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontSize: moderateScale(14.5),
                    marginLeft: horizontalScale(12),
                    marginTop: verticalScale(10),
                    color: 'black',
                  }}>
                  Qunatity :
                </Text>
                <Text
                  style={{
                    fontSize: moderateScale(14.8),
                    marginLeft: horizontalScale(12),
                    marginTop: verticalScale(10),
                    color: 'black',
                  }}>
                  {item.quantity}
                </Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontSize: moderateScale(14.5),
                    marginLeft: horizontalScale(15),
                    marginTop: verticalScale(10),
                    color: 'black',
                  }}>
                  Subtotal :
                </Text>
                <Text
                  style={{
                    fontSize: moderateScale(14.8),
                    marginLeft: horizontalScale(12),
                    marginTop: verticalScale(10),
                    color: 'black',
                  }}>{`₹${item.product.sub_total}`}</Text>
              </View>
            </View>
          </View>
        )}
      />
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
          onPress={() => PlaceOrder()}
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
            Click to place the order
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Checkout;
