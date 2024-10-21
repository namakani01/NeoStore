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
import Icon from 'react-native-vector-icons/AntDesign';

const CartScreen = () => {
  const [output, setOutput] = useState([]);

  const calculateTotal = () => {
    return output.reduce((total, item) => total + item.product.sub_total, 0);
  };

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
        setOutput(result?.data?.data);
      } else {
        Alert.alert('Error');
      }
    } catch (error) {
      console.log(error.response ? error.response.data : error.message);
    }
  }

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
                    style={{fontSize: 17, color: 'black', fontWeight: 'bold'}}>
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
                    justifyContent: 'space-around',
                    marginTop: 20,
                  }}>
                  <Text style={{fontSize: 17}}>{item.quantity}</Text>
                  <Text style={{fontSize: 17}}>×</Text>

                  <Text
                    style={{
                      fontSize: 17,
                      color: '#2E6BC6',
                      fontWeight: 'bold',
                    }}>
                    {`₹${item.product.cost}`}
                  </Text>
                </View>
              </View>
            </View>
          );
        }}></FlatList>

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
    </View>
  );
};

export default CartScreen;
