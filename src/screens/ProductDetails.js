import {View, Text, Image, TouchableOpacity,Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {Dimensions} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Icon1 from 'react-native-vector-icons/FontAwesome6';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {ActivityIndicator} from 'react-native-paper';

const ProductDetails = props => {
  // console.log('###'  ,props.route.params.id)

  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(1);

  // console.log('output', output);

  // console.log('The count', count);

  async function FetchProductDetails() {
    setLoading(true);
    try {
      const accessToken = await EncryptedStorage.getItem('access_token');

      if (accessToken) {
        let result = await axios.get(
          `http://staging.php-dev.in:8844/trainingapp/api/products/getDetail?product_id=${props.route.params.id}`,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        // console.log('The data', result?.data.data);
        setOutput(result?.data?.data);
        setLoading(false);
      } else {
        Alert.alert('No token found, please log in again.');
      }
    } catch (error) {
      setLoading(false);
      console.log(error.response ? error.response.data : error.message);
    }
  }

  useEffect(() => {
    FetchProductDetails();
  }, []);

  async function handleAddtoCart() {
    const formData = new FormData();

    formData.append('product_id', props.route.params.id);
    formData.append('quantity', count);

    try {
      const accessToken = await EncryptedStorage.getItem('access_token');

      if (accessToken) {
        let result = await axios.post(
          `http://staging.php-dev.in:8844/trainingapp/api/addToCart`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              access_token: accessToken,
            },
          },
        );
        console.log('The Add to  cart data', result?.data);
        Alert.alert('Product added to cart successfully');
      } else {
        Alert.alert('Added to cart.');
      }
    } catch (error) {
      console.log(error.response ? error.response.data : error.message);
    }
  }

  return loading ? (
    <ActivityIndicator />
  ) : (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{backgroundColor: 'red'}}>
        <SwiperFlatList
          showPagination
          paginationActiveColor="grey"
          paginationDefaultColor="#ccc"
          paginationStyleItem={{
            height: 10,
            width: 10,
            padding: 5,
            marginTop: 3,
          }}
          data={output.product_images}
          renderItem={({item}) => (
            <Image
              style={{height: 290, width: Dimensions.get('screen').width}}
              source={{uri: item.image}}></Image>
          )}
        />
      </View>

      <View style={{marginTop: 15, marginLeft: 15}}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: 'Helvetica-Bold',
            color: '#333333',
            marginBottom: 7,
          }}>
          {output.name}
        </Text>

        <Text
          style={{
            fontSize: 18,
            color: '#2E6BC6',
            fontFamily: 'Helvetica-Bold',
            fontWeight: 'bold',
          }}>{`₹${output.cost}`}</Text>
      </View>

      <View
        style={{
          marginTop: 13,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <View
          style={{
            borderWidth: 2,
            borderColor: '#ccc',
            width: 125,
            height: 45,
            borderRadius: 8,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => {
              if (count <= 1) {
                setCount(1);
              } else {
                setCount(count - 1);
              }
            }}
            style={{
              borderEndColor: '#ccc',
              borderEndWidth: 2,
              justifyContent: 'center',
              padding: 7,
            }}>
            <Icon name="minus" size={19} color="#585858"></Icon>
          </TouchableOpacity>
          <Text style={{fontSize: 22, marginTop: 3, color: '#585858'}}>
            {count}
          </Text>

          <TouchableOpacity
            onPress={() => {
              if (count >= 10) {
                setCount(10);
              } else {
                setCount(count + 1);
              }
            }}
            style={{
              borderLeftWidth: 2,
              borderColor: '#ccc',
              justifyContent: 'center',
              padding: 7,
            }}>
            <Icon1 name="plus" size={19} color="#585858"></Icon1>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => handleAddtoCart()}
          style={{
            backgroundColor: '#2E6BC6',
            borderRadius: 8,
            paddingHorizontal: 20,
            paddingVertical: 14,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 15,
              textAlign: 'center',
            }}>
            ADD TO CART
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: '#242424',
            paddingHorizontal: 20,
            justifyContent: 'center',
            paddingVertical: 14,
            borderRadius: 8,
          }}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
            BUY NOW
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginTop: 20,
          justifyContent: 'space-between',
          marginLeft: 15,
          width: '90%',
          borderWidth: 2,
          borderTopColor: 'white',
          borderLeftWidth: 0,
          borderRightWidth: 0,
          borderBottomColor: '#ccc',
          paddingBottom: 17,
        }}>
        <Text style={{fontSize: 17, fontWeight: 'bold'}}>Share: </Text>
        <Icon2 name="facebook" size={20}></Icon2>
        <Icon2 name="twitter" size={20}></Icon2>
        <Icon2 name="pinterest" size={20}></Icon2>
        <Icon2 name="linkedin" size={20}></Icon2>
        <Icon2 name="telegram" size={20}></Icon2>
      </View>

      <View
        style={{
          marginTop: 30,
          borderWidth: 2,
          borderTopColor: '#ccc',
          borderLeftWidth: 0,
          borderRightWidth: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
          paddingBottom: 25,
          width: '90%',
          marginLeft: 15,
        }}>
        <Text
          style={{
            marginTop: 10,
            fontFamily: 'Helvetica',
            fontWeight: '600',
            color: 'black',
            fontSize: 17,
          }}>
          Guaranteed Safe Checkout
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 15,
          }}>
          <View
            style={{
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: '#ccc',
              width: 50,
            }}>
            <Image
              style={{height: 30, width: 30, alignSelf: 'center'}}
              source={require('../assests/images/social.png')}></Image>
          </View>

          <View
            style={{
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: '#ccc',
              width: 50,
            }}>
            <Image
              style={{height: 30, width: 30, alignSelf: 'center'}}
              source={require('../assests/images/visa.png')}></Image>
          </View>

          <View
            style={{
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: '#ccc',
              width: 50,
            }}>
            <Image
              style={{height: 30, width: 30, alignSelf: 'center'}}
              source={require('../assests/images/apple-pay.png')}></Image>
          </View>

          <View
            style={{
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: '#ccc',
              width: 50,
            }}>
            <Image
              style={{height: 30, width: 30, alignSelf: 'center'}}
              source={require('../assests/images/google-pay.png')}></Image>
          </View>
        </View>
      </View>

      <View style={{marginTop: 10, marginLeft: 15}}>
        <Text style={{fontSize: 17, color: 'black'}}>Description</Text>
        <Text style={{marginTop: 13, fontSize: 15}}>{output.description}</Text>
      </View>

      <View style={{marginTop: 10, marginLeft: 15}}>
        <Text style={{fontSize: 17, color: 'black'}}>Reviews</Text>
        <StarRatingDisplay
          style={{marginTop: 10}}
          color="#FAAC58"
          starSiz={24}
          rating={output.rating}></StarRatingDisplay>
      </View>
    </View>
  );
};

export default ProductDetails;
