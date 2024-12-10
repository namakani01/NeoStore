import {
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';
import {useSelector} from 'react-redux';
import StarRating from 'react-native-star-rating-widget';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../assests/styles/Metrics';

const OrderDetails = props => {
  // console.log(props.route.params.orderId);

  const cartCount = useSelector(state => state.cart.cartCount);

  const [orderDetails, setOrderDetails] = useState([]);
  const [openmodal, setopenmodal] = useState(false);
  const [rating, setRating] = useState(0);
  const [id, setId] = useState('');

  // console.log(id);

  // console.log(rating);

  // console.log('details', orderDetails);

  async function getOrderDetails() {
    try {
      const accessToken = await EncryptedStorage.getItem('access_token');

      if (accessToken) {
        // const formData = new FormData();
        // formData.append('order_id', props.route.params.orderId);

        let result = await axios.get(
          `http://staging.php-dev.in:8844/trainingapp/api/orderDetail?order_id=${props.route.params.orderId}`,

          {
            headers: {
              'Content-Type': 'multipart/form-data',
              access_token: accessToken,
            },
          },
        );
        // console.log('Order Detail', result?.data?.data);
        setOrderDetails(result?.data?.data);
      } else {
        Alert.alert('Error');
      }
    } catch (error) {
      console.log(error.response ? error.response.data : error.message);
    }
  }

  async function setProductRating() {
    try {
      const accessToken = await EncryptedStorage.getItem('access_token');
      // console.log(id, rating);

      const formData = new FormData();

      formData.append('product_id', id);
      formData.append('rating', rating);

      if (accessToken) {
        let result = await axios.post(
          `http://staging.php-dev.in:8844/trainingapp/api/products/setRating`,
          formData,

          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        console.log('Products rating', result?.data);
        Alert.alert('Rating Successful');
        setopenmodal(false);
      } else {
        Alert.alert('Error');
      }
    } catch (error) {
      console.log(
        'hhhhh',
        error.response ? error.response.data : error.message,
      );
    }
  }

  const handleRating = id => {
    setopenmodal(true);
    setRating(0);
    setId(Number(id));
  };

  const submitRating = () => {
    setProductRating();
  };

  useEffect(() => {
    getOrderDetails();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Text
        style={{
          fontSize: moderateScale(16),
          textAlign: 'left',
          marginLeft: horizontalScale(10),
          color: 'black',
          marginTop: verticalScale(12),
        }}>
        Order Summary
      </Text>

      <View
        style={{
          borderWidth: 1,
          height: verticalScale(100),
          width: horizontalScale(340),
          marginTop: verticalScale(15),
          alignSelf: 'center',
          borderRadius: moderateScale(12),
          backgroundColor: 'white',
          borderColor: '#ddd',
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 4,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row'}}>
          <Image
            style={{
              height: verticalScale(25),
              width: horizontalScale(25),
              marginLeft: horizontalScale(20),
              alignSelf: 'center',
            }}
            source={require('../assests/images/order.png')}></Image>

          <View
            style={{
              flexDirection: 'column',
              marginLeft: horizontalScale(25),
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: moderateScale(15),
                textAlign: 'left',
                color: 'black',
                fontWeight: '300',
                marginBottom: verticalScale(10),
              }}>
              {`Order Id : ${orderDetails.id}`}
            </Text>
            <Text
              style={{
                fontSize: moderateScale(15),
                textAlign: 'left',
                color: 'black',
                fontWeight: '300',
              }}>
              {`Order Total : ₹${orderDetails.cost}`}
            </Text>
          </View>
        </View>
      </View>

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
          marginTop: 15,
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
        <View
          style={{
            flexDirection: 'row',
            marginTop: verticalScale(30),
            width: horizontalScale(325),
            // backgroundColor: 'red',
          }}>
          <Image
            style={{
              height: verticalScale(30),
              width: horizontalScale(30),
              marginLeft: horizontalScale(20),
              marginTop: verticalScale(5),
            }}
            source={require('../assests/images/truck.png')}></Image>
          <Text
            style={{
              textAlign: 'auto',
              fontSize: moderateScale(15),
              marginLeft: horizontalScale(22),
              marginTop: verticalScale(7),
              color: 'black',
              fontWeight: '300',
            }}>
            {orderDetails.address}
          </Text>
        </View>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text
          style={{
            fontSize: moderateScale(16),
            color: 'black',
            marginTop: verticalScale(20),
            marginLeft: horizontalScale(10),
          }}>
          Cart Summary
        </Text>
      </View>

      <FlatList
        data={orderDetails.order_details}
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
              marginTop: verticalScale(20),
              marginLeft: horizontalScale(10),
            }}>
            <Image
              style={{height: verticalScale(100), width: horizontalScale(115)}}
              resizeMode="contain"
              source={{uri: item.prod_image}}></Image>

            <View style={{flexDirection: 'column'}}>
              <Text
                style={{
                  fontSize: moderateScale(14),
                  fontWeight: '500',
                  color: 'black',
                  marginLeft: horizontalScale(15),
                }}>
                {item.prod_name}
              </Text>

              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontSize: moderateScale(14),
                    marginLeft: horizontalScale(15),
                    marginTop: verticalScale(10),
                    color: 'black',
                  }}>
                  Quantity :
                </Text>
                <Text
                  style={{
                    fontSize: moderateScale(15),
                    marginLeft: horizontalScale(15),
                    marginTop: verticalScale(10),
                    color: 'black',
                  }}>
                  {item.quantity}
                </Text>
                <TouchableOpacity onPress={() => handleRating(item.product_id)}>
                  <Text
                    style={{
                      fontSize: moderateScale(15.5),
                      marginLeft: horizontalScale(105),
                      marginTop: verticalScale(10),
                      fontWeight: 'bold',
                      color: '#2E6BC6',
                    }}>
                    Rate
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontSize: moderateScale(15),
                    marginLeft: horizontalScale(15),
                    marginTop: verticalScale(10),
                    color: 'black',
                  }}>
                  Subtotal :
                </Text>
                <Text
                  style={{
                    fontSize: moderateScale(15),
                    marginLeft: horizontalScale(15),
                    marginTop: verticalScale(10),
                    color: 'black',
                  }}>{`₹${item.total}`}</Text>
              </View>
            </View>
          </View>
        )}
      />

      <Modal visible={openmodal} transparent={true}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            marginVertical: verticalScale(270),
            marginHorizontal: horizontalScale(35),
            borderRadius: 10,
            borderColor: '#ddd',
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 4,
          }}>
          <Text
            style={{
              fontSize: moderateScale(17),
              textAlign: 'center',
              color: 'black',
            }}>
            Rate Product
          </Text>

          <Text
            style={{
              textAlign: 'center',
              color: 'black',
              marginTop: verticalScale(15),
              fontSize: moderateScale(18),
            }}>{`Rating :  ${rating} / 5`}</Text>

          <StarRating
            style={{
              // marginLeft: horizontalScale(50),
              marginTop: verticalScale(15),
              alignSelf: 'center',
            }}
            starSize={27}
            rating={rating}
            onChange={setRating}
          />

          <View
            style={{
              flexDirection: 'row',
              width: '75%',
              marginTop: verticalScale(30),
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => setopenmodal(false)}
              style={{
                backgroundColor: 'grey',
                padding: horizontalScale(7),
                borderRadius: moderateScale(8),
              }}>
              <Text style={{fontSize: moderateScale(16), color: 'white'}}>
                Close
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => submitRating()}
              style={{
                backgroundColor: '#2E6BC6',
                padding: horizontalScale(7),
                borderRadius: moderateScale(8),
              }}>
              <Text style={{fontSize: moderateScale(16), color: 'white'}}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default OrderDetails;
