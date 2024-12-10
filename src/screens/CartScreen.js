import {
  View,
  Image,
  FlatList,
  Text,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {setCartCount} from '../redux/cartSlice';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/FontAwesome6';
import {setCartTotal} from '../redux/cartTotalSlice';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../assests/styles/Metrics';

const CartScreen = props => {
  const dispatch = useDispatch();

  const cartTotal = useSelector(state => state.cartTotal.cartTotal);

  // console.log("cart total" ,cartTotal)

  const [output, setOutput] = useState([]);
  const [quantities, setQuantities] = useState({});

  // const calculateTotal = () => {
  //   return output && output.length > 0
  //     ? output.reduce((total, item) => total + item.product.sub_total, 0)
  //     : 0;
  // };

  // const total = calculateTotal();
  // console.log(total)

  async function ListCartItems() {
    try {
      const accessToken = await EncryptedStorage.getItem('access_token');

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
        dispatch(setCartTotal(result?.data?.total));
      } else {
        Alert.alert('Error');
      }
    } catch (error) {
      console.log(error.response ? error.response.data : error.message);
    }
  }

  async function EditcartItems(id, quantity) {
    const formData = new FormData();
    formData.append('product_id', id);
    formData.append('quantity', quantity);

    try {
      const accessToken = await EncryptedStorage.getItem('access_token');

      if (accessToken) {
        let result = await axios.post(
          `http://staging.php-dev.in:8844/trainingapp/api/editCart`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              access_token: accessToken,
            },
          },
        );
        console.log('The cart edited data', result?.data);
        // Alert.alert('Successfull');
      } else {
        Alert.alert('Error');
      }
    } catch (error) {
      console.log(error.response ? error.response.data : error.message);
    }
  }

  const handleQuantity = (id, quantity, operation) => {
    let currentQuantity = quantity;

    let newQuantity = currentQuantity;

    if (operation === 'increment') {
      newQuantity += 1;
    } else if (operation === 'decrement' && currentQuantity > 1) {
      newQuantity -= 1;
    }
    EditcartItems(id, newQuantity);
    setQuantities({
      ...quantities,
      [id]: newQuantity,
    });
  };

  async function Deleteproducts(id) {
    const data = new FormData();
    data.append('product_id', id);

    try {
      const accessToken = await EncryptedStorage.getItem('access_token');

      if (accessToken) {
        let result = await axios.post(
          'http://staging.php-dev.in:8844/trainingapp/api/deleteCart',
          data,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              access_token: accessToken,
            },
          },
        );
        console.log('deleted item', result?.data?.data);
        dispatch(setCartCount(result?.data?.total_carts));

        Alert.alert('Deleted Successfully');
      } else {
        Alert.alert('Added to cart.');
      }
    } catch (error) {
      console.log(error.response ? error.response.data : error.message);
    }
  }

  useEffect(() => {
    ListCartItems();
  }, [output]);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {output?.length === 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            style={{height: verticalScale(200), width: horizontalScale(200)}}
            source={require('../assests/images/empty-cart.png')}></Image>
          <Text style={{fontSize: moderateScale(17), color: 'gray'}}>
            No products in the cart
          </Text>
        </View>
      ) : (
        <>
          <FlatList
            data={output}
            ItemSeparatorComponent={() => {
              return (
                <View
                  style={{
                    height: verticalScale(2),
                    backgroundColor: '#ddd',
                    marginTop: verticalScale(10),
                  }}></View>
              );
            }}
            renderItem={({item}) => {
              return (
                <SafeAreaView>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: verticalScale(15),
                      marginLeft: horizontalScale(10),
                    }}>
                    <Image
                      style={{
                        height: verticalScale(110),
                        width: horizontalScale(110),
                        resizeMode: 'contain',
                      }}
                      source={{uri: item.product.product_images}}></Image>
                    <View
                      style={{
                        marginLeft: horizontalScale(12),
                        width: horizontalScale(227),
                        // backgroundColor: 'yellow',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          // backgroundColor: 'red',
                        }}>
                        <Text
                          style={{
                            fontSize: moderateScale(14.7),
                            color: 'black',
                            fontWeight: 'bold',
                          }}>
                          {item.product.name}
                        </Text>
                        <TouchableOpacity
                          onPress={() => Deleteproducts(item.product.id)}>
                          <Icon name="closecircleo" size={19}></Icon>
                        </TouchableOpacity>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          marginTop: verticalScale(13.5),
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          style={{
                            fontSize: moderateScale(14.5),
                            color: 'black',
                            fontWeight: '400',
                          }}>
                          Price
                        </Text>
                        <Text
                          style={{
                            fontSize: moderateScale(14.5),
                            marginRight: horizontalScale(10),
                            color: 'black',
                            fontWeight: '400',
                          }}>
                          {`₹${item.product.cost}`}
                        </Text>
                      </View>

                      <View
                        style={{
                          height: verticalScale(1),
                          width: horizontalScale(220),
                          borderWidth: 1,
                          borderColor: '#ccc',
                          borderStyle: 'dashed',
                          borderRadius: moderateScale(1),
                          marginTop: verticalScale(4),
                        }}
                      />

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          style={{
                            fontSize: moderateScale(14.5),
                            marginTop: verticalScale(13),
                            color: 'black',
                            fontWeight: '400',
                          }}>
                          Quantity
                        </Text>

                        <View
                          style={{
                            borderWidth: 2,
                            borderColor: '#ccc',
                            width: horizontalScale(85),
                            height: verticalScale(30),
                            borderRadius: moderateScale(8),
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: verticalScale(10),
                          }}>
                          <TouchableOpacity
                            onPress={() =>
                              handleQuantity(
                                item.product.id,
                                item.quantity,
                                'decrement',
                              )
                            }
                            style={{
                              borderEndColor: '#ccc',
                              borderEndWidth: 2,
                              justifyContent: 'center',
                              padding: horizontalScale(7),
                            }}>
                            <Icon1 name="minus" size={12} color="black"></Icon1>
                          </TouchableOpacity>
                          <Text
                            style={{
                              fontSize: moderateScale(15),
                              marginTop: verticalScale(3),
                              color: 'black',
                            }}>
                            {item.quantity}
                          </Text>

                          <TouchableOpacity
                            onPress={() =>
                              handleQuantity(
                                item.product.id,
                                item.quantity,
                                'increment',
                              )
                            }
                            style={{
                              borderLeftWidth: 2,
                              borderColor: '#ccc',
                              justifyContent: 'center',
                              padding: verticalScale(7),
                            }}>
                            <Icon1
                              name="plus"
                              size={12.2}
                              color="black"></Icon1>
                          </TouchableOpacity>
                        </View>
                      </View>

                      <View
                        style={{
                          height: verticalScale(1),
                          width: horizontalScale(220),
                          borderWidth: 1,
                          borderColor: '#ccc',
                          borderStyle: 'dashed',
                          borderRadius: moderateScale(1),
                          marginTop: verticalScale(10),
                        }}
                      />

                      <View
                        style={{
                          flexDirection: 'row',
                          marginTop: verticalScale(10),
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          style={{
                            fontSize: moderateScale(14.5),
                            color: 'black',
                            fontWeight: '400',
                          }}>
                          SubTotal
                        </Text>
                        <Text
                          style={{
                            fontSize: moderateScale(14.8),
                            marginRight: 10,
                            color: '#2E6BC6',
                            fontWeight: 'bold',
                          }}>{`₹${item.product.sub_total}`}</Text>
                      </View>
                    </View>
                  </View>
                </SafeAreaView>
              );
            }}></FlatList>

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
                }}>{`₹${cartTotal}`}</Text>
            </View>

            <TouchableOpacity
              onPress={() => props.navigation.navigate('Address')}
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
                PROCEED TO CHECKOUT
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default CartScreen;
