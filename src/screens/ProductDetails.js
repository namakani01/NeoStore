import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
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
import {useDispatch} from 'react-redux';
import {setCartCount} from '../redux/cartSlice';

import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../assests/styles/Metrics';

const ProductDetails = props => {
  // console.log('###'  ,props.route.params.id)

  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(1);

  const dispatch = useDispatch();

  const [productCategoryid, setProductCategoryid] = useState('');
  const [relatedProducts, setRelatedProducts] = useState('');

  // console.log('output', productCategoryid);

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
        setProductCategoryid(result?.data?.data?.product_category_id);
        setLoading(false);
      } else {
        Alert.alert('No token found, please log in again.');
      }
    } catch (error) {
      setLoading(false);
      console.log(error.response ? error.response.data : error.message);
    }
  }

  async function FetchRelatedProducts() {
    try {
      const result = await axios.get(
        `http://staging.php-dev.in:8844/trainingapp/api/products/getList?product_category_id=${productCategoryid}`,
      );
      // console.log('relatedproducts', result?.data?.data);
      const filteredProducts = result?.data?.data.filter(
        product => product.id !== props.route.params.id,
      );
      setRelatedProducts(filteredProducts);
      // setRelatedProducts(result?.data?.data);
    } catch (error) {
      console.error('Error fetching related products', error);
    }
  }

  useEffect(() => {
    FetchProductDetails();
  }, []);

  useEffect(() => {
    if (productCategoryid) {
      FetchRelatedProducts();
    }
  }, [productCategoryid]);

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
        dispatch(setCartCount(result?.data?.total_carts));
        props.navigation.navigate('Cart');
      } else {
        Alert.alert('Added to cart.');
      }
    } catch (error) {
      console.log(error.response ? error.response.data : error.message);
    }
  }

  return loading ? (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator color="#2E6BC6" size={'large'} />
    </View>
  ) : (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View>
          <SwiperFlatList
            showPagination
            paginationActiveColor="grey"
            paginationDefaultColor="#ccc"
            paginationStyleItem={{
              height: verticalScale(10),
              width: horizontalScale(10),
              padding: horizontalScale(3),
              marginTop: verticalScale(3),
            }}
            data={output.product_images}
            renderItem={({item}) => (
              <Image
                style={{
                  height: verticalScale(210),
                  width: Dimensions.get('screen').width,
                  resizeMode: 'contain',
                }}
                source={{uri: item.image}}></Image>
            )}
          />
        </View>

        <View
          style={{
            marginTop: verticalScale(10),
            marginLeft: horizontalScale(12),
            marginRight: horizontalScale(25),
            // backgroundColor: 'red',
          }}>
          <Text
            style={{
              fontSize: moderateScale(15),
              fontFamily: 'Helvetica-Bold',
              color: '#333333',
              marginBottom: verticalScale(7),
            }}>
            {output.name}
          </Text>

          <Text
            style={{
              fontSize: moderateScale(15.3),
              color: '#2E6BC6',
              fontFamily: 'Helvetica-Bold',
              fontWeight: 'bold',
            }}>{`₹${output.cost}`}</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginLeft: horizontalScale(12),
            marginRight: horizontalScale(25),
            marginTop: verticalScale(10),
            justifyContent: 'space-between',
            // backgroundColor: 'red',
          }}>
          <View
            style={{
              borderWidth: 2,
              borderColor: '#ccc',
              width: verticalScale(120),
              height: horizontalScale(40),
              borderRadius: moderateScale(8),
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
                padding: horizontalScale(7),
                opacity: count <= 1 ? 0.5 : 1,
              }}>
              <Icon
                name="minus"
                size={18}
                color={count <= 1 ? '#ccc' : '#585858'}></Icon>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: moderateScale(17),
                marginTop: verticalScale(5),
                color: 'black',
              }}>
              {count}
            </Text>

            <TouchableOpacity
              onPress={() => {
                if (count >= 8) {
                  setCount(8);
                } else {
                  setCount(count + 1);
                }
              }}
              style={{
                borderLeftWidth: 2,
                borderColor: '#ccc',
                justifyContent: 'center',
                padding: horizontalScale(7),
                opacity: count >= 8 ? 0.5 : 1,
              }}>
              <Icon1
                name="plus"
                size={18}
                color={count >= 8 ? '#ccc' : '#585858'}></Icon1>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => handleAddtoCart()}
            style={{
              backgroundColor: '#2E6BC6',
              borderRadius: moderateScale(10),
              paddingHorizontal: horizontalScale(10),
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: moderateScale(12),
                textAlign: 'center',
              }}>
              ADD TO CART
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: '#242424',
              paddingHorizontal: horizontalScale(10),
              justifyContent: 'center',
              borderRadius: moderateScale(10),
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: moderateScale(12),
              }}>
              BUY NOW
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: verticalScale(25),
            marginLeft: horizontalScale(12),
            width: '90%',
            borderWidth: 2,
            borderTopColor: 'white',
            borderLeftWidth: 0,
            borderRightWidth: 0,
            borderBottomColor: '#ccc',
            paddingBottom: verticalScale(30),
            // backgroundColor: 'red',
          }}>
          <Text style={{fontSize: moderateScale(14.5), fontWeight: 'bold'}}>
            Share:{' '}
          </Text>
          <Icon2 name="facebook" size={19}></Icon2>
          <Icon2 name="twitter" size={19}></Icon2>
          <Icon2 name="pinterest" size={19}></Icon2>
          <Icon2 name="linkedin" size={19}></Icon2>
          <Icon2 name="telegram" size={19}></Icon2>
        </View>

        <View
          style={{
            marginTop: verticalScale(12),
            borderWidth: 2,
            borderTopColor: '#ccc',
            borderLeftWidth: 0,
            borderRightWidth: 0,
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            paddingBottom: verticalScale(25),
            width: '90%',
            marginLeft: horizontalScale(12),
            // backgroundColor: 'red',
          }}>
          <Text
            style={{
              marginTop: verticalScale(22),
              fontFamily: 'Helvetica',
              fontWeight: '600',
              color: 'black',
              fontSize: moderateScale(14),
            }}>
            Guaranteed Safe Checkout
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: verticalScale(15),
            }}>
            <View
              style={{
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: '#ccc',
                width: horizontalScale(40),
              }}>
              <Image
                style={{
                  height: verticalScale(23),
                  width: horizontalScale(23),
                  alignSelf: 'center',
                }}
                source={require('../assests/images/social.png')}></Image>
            </View>

            <View
              style={{
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: '#ccc',
                width: horizontalScale(40),
              }}>
              <Image
                style={{
                  height: verticalScale(23.5),
                  width: horizontalScale(23.5),
                  alignSelf: 'center',
                }}
                source={require('../assests/images/visa.png')}></Image>
            </View>

            <View
              style={{
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: '#ccc',
                width: horizontalScale(40),
              }}>
              <Image
                style={{
                  height: verticalScale(23.5),
                  width: horizontalScale(23.5),
                  alignSelf: 'center',
                }}
                source={require('../assests/images/apple-pay.png')}></Image>
            </View>

            <View
              style={{
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: '#ccc',
                width: horizontalScale(40),
              }}>
              <Image
                style={{
                  height: verticalScale(23.5),
                  width: horizontalScale(23.5),
                  alignSelf: 'center',
                }}
                source={require('../assests/images/google-pay.png')}></Image>
            </View>
          </View>
        </View>

        <View
          style={{
            marginTop: verticalScale(11),
            marginLeft: horizontalScale(12.5),
            marginRight: horizontalScale(25),
            // backgroundColor: 'yellow',
          }}>
          <Text style={{fontSize: moderateScale(14.5), color: 'black'}}>
            Description
          </Text>
          <Text
            style={{
              marginTop: verticalScale(10),
              fontSize: moderateScale(14),
              color: '#2E2E2E',
              textAlign: 'left',
            }}>
            {output.description}
          </Text>
        </View>

        <View
          style={{
            marginTop: verticalScale(10),
            marginLeft: horizontalScale(12.5),
            // backgroundColor: 'red',
            marginRight: 25,
          }}>
          <Text style={{fontSize: moderateScale(14.5), color: 'black'}}>
            Reviews
          </Text>
          <StarRatingDisplay
            style={{marginTop: verticalScale(10)}}
            color="#FAAC58"
            starSize={22}
            rating={output.rating}></StarRatingDisplay>
        </View>

        <Text
          style={{
            marginTop: verticalScale(20),
            fontSize: moderateScale(14.5),
            marginLeft: horizontalScale(12.5),
            color: 'black',
          }}>
          Related Product
        </Text>

        <FlatList
          data={relatedProducts}
          numColumns={2}
          scrollEnabled={false}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                props.navigation.replace('ProductDetails', {id: item.id})
              }
              style={{
                borderWidth: 2,
                height: verticalScale(237),
                width: horizontalScale(170),
                margin: horizontalScale(7),
                borderRadius: moderateScale(12),
                backgroundColor: 'white',
                borderColor: '#ddd',
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.1,
                shadowRadius: 1,
                elevation: 4,
              }}>
              <Image
                style={{
                  height: verticalScale(135),
                  width: horizontalScale(135),
                  resizeMode: 'contain',
                  alignSelf: 'center',
                }}
                source={{uri: item.product_images}}></Image>

              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  fontSize: moderateScale(14),
                  color: 'black',
                  textAlign: 'center',
                }}>
                {item.name}
              </Text>

              <StarRatingDisplay
                style={{marginTop: verticalScale(8), alignSelf: 'center'}}
                starSize={19}
                rating={item.rating}></StarRatingDisplay>

              <Text
                style={{
                  marginTop: verticalScale(10),
                  fontSize: moderateScale(13.5),
                  color: 'black',
                  textAlign: 'center',
                }}>
                {`₹${item.cost}`}
              </Text>
            </TouchableOpacity>
          )}></FlatList>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetails;
