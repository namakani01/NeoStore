import {
  View,
  Image,
  FlatList,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {setCartCount} from '../redux/cartSlice';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/FontAwesome6';

const CartScreen = props => {
  const dispatch = useDispatch();

  const [output, setOutput] = useState([]);
  const [quantities, setQuantities] = useState({});

  const calculateTotal = () => {
    return output && output.length > 0
      ? output.reduce((total, item) => total + item.product.sub_total, 0)
      : 0;
  };

  const total = calculateTotal();

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

  const handleQuantity = (id, operation) => {
    let currentQuantity = quantities[id] || 1;

    let newQuantity = currentQuantity;

    if (operation === 'increment') {
      newQuantity += 1;
      EditcartItems(id, newQuantity);
    } else if (operation === 'decrement' && currentQuantity > 1) {
      EditcartItems(id, newQuantity);
      newQuantity -= 1;
    }

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
            style={{height: 250, width: 250}}
            source={require('../assests/images/empty-cart.png')}></Image>
          <Text style={{fontSize: 20, color: 'gray'}}>
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
                    height: 2,
                    backgroundColor: '#ccc',
                    marginTop: 10,
                  }}></View>
              );
            }}
            renderItem={({item}) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 20,
                    marginLeft: 10,
                  }}>
                  <Image
                    style={{height: 100, width: 130}}
                    source={{uri: item.product.product_images}}></Image>
                  <View style={{marginLeft: 15, width: '62%'}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          fontSize: 17,
                          color: 'black',
                          fontWeight: 'bold',
                        }}>
                        {item.product.name}
                      </Text>
                      <TouchableOpacity
                        onPress={() => Deleteproducts(item.product.id)}>
                        <Icon name="closecircleo" size={22}></Icon>
                      </TouchableOpacity>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 20,
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          fontSize: 17,
                        }}>
                        Price
                      </Text>
                      <Text
                        style={{
                          fontSize: 17,
                          marginRight: 10,
                          fontWeight: 'bold',
                        }}>
                        {`₹${item.product.cost}`}
                      </Text>
                    </View>

                    <View
                      style={{
                        height: 1,
                        width: '100%',
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderStyle: 'dashed',
                        borderRadius: 1,
                        marginTop: 4,
                      }}
                    />

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={{fontSize: 18, marginTop: 13}}>
                        Quantity
                      </Text>

                      <View
                        style={{
                          borderWidth: 2,
                          borderColor: '#ccc',
                          width: 90,
                          height: 34,
                          borderRadius: 8,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginTop: 10,
                        }}>
                        <TouchableOpacity
                          onPress={() =>
                            handleQuantity(item.product.id, 'decrement')
                          }
                          style={{
                            borderEndColor: '#ccc',
                            borderEndWidth: 2,
                            justifyContent: 'center',
                            padding: 7,
                          }}>
                          <Icon1 name="minus" size={12} color="#585858"></Icon1>
                        </TouchableOpacity>
                        <Text
                          style={{
                            fontSize: 15,
                            marginTop: 3,
                            color: '#585858',
                          }}>
                          {quantities[item.product.id] || 1}
                        </Text>

                        <TouchableOpacity
                          onPress={() =>
                            handleQuantity(item.product.id, 'increment')
                          }
                          style={{
                            borderLeftWidth: 2,
                            borderColor: '#ccc',
                            justifyContent: 'center',
                            padding: 7,
                          }}>
                          <Icon1 name="plus" size={12} color="#585858"></Icon1>
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View
                      style={{
                        height: 1,
                        width: '100%',
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderStyle: 'dashed',
                        borderRadius: 1,
                        marginTop: 10,
                      }}
                    />

                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 10,
                        justifyContent: 'space-between',
                      }}>
                      <Text style={{fontSize: 18}}>SubTotal</Text>
                      <Text
                        style={{
                          fontSize: 18,
                          marginRight: 10,
                          color: '#2E6BC6',
                          fontWeight: 'bold',
                        }}>{`₹${item.product.sub_total}`}</Text>
                    </View>
                  </View>
                </View>
              );
            }}></FlatList>

          <TouchableOpacity
            style={{
              backgroundColor: '#2E6BC6',
              padding: 7,
              marginBottom: 10,
              marginHorizontal: 10,
            }}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              Update Cart
            </Text>
          </TouchableOpacity>

          <View
            style={{
              borderColor: '#ccc',
              borderWidth: 3,
              justifyContent: 'flex-end',
              marginHorizontal: 10,
            }}>
            <View style={{marginLeft: 15}}>
              <Text style={{fontSize: 20, fontWeight: '500', color: 'black'}}>
                Cart Totals
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginRight: 15,
                }}>
                <Text
                  style={{
                    marginTop: 14,
                    fontSize: 17,
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  Total
                </Text>
                <Text
                  style={{
                    marginTop: 14,
                    fontSize: 17,
                    fontWeight: '500',
                    color: 'black',
                  }}>{`₹${calculateTotal()}`}</Text>
              </View>

              <TouchableOpacity
                onPress={() => props.navigation.navigate('Address', {total})}
                style={{
                  backgroundColor: '#2E6BC6',
                  marginTop: 24,
                  marginHorizontal: 50,
                  marginBottom: 10,
                  borderRadius: 7,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 19,
                    textAlign: 'center',
                    padding: 10,
                  }}>
                  Proceed To Checkout
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default CartScreen;
