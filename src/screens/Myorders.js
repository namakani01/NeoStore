import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../assests/styles/Metrics';

const Myorders = props => {
  // console.log(props)

  const [output, setOutput] = useState([]);

  async function getOrderList() {
    try {
      const accessToken = await EncryptedStorage.getItem('access_token');

      if (accessToken) {
        let result = await axios.get(
          'http://staging.php-dev.in:8844/trainingapp/api/orderList',
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              access_token: accessToken,
            },
          },
        );
        // console.log('Order list', result?.data);
        setOutput(result?.data?.data);
      } else {
        Alert.alert('Error');
      }
    } catch (error) {
      console.log(error.response ? error.response.data : error.message);
    }
  }

  useEffect(() => {
    getOrderList();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <FlatList
        data={output}
        renderItem={({item}) => (
          <View
            style={{
              borderWidth: 1,
              height: verticalScale(120),
              width: horizontalScale(325),
              marginTop: verticalScale(20),
              marginBottom: verticalScale(10),
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
                marginLeft: horizontalScale(15),
                marginTop: 10,
                color: 'black',
                fontWeight: '500',
                fontSize: moderateScale(15),
              }}>{`Order id : ${item.id}`}</Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: verticalScale(12),
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: 'black',
                  fontWeight: '400',
                  marginLeft: horizontalScale(15),
                  fontSize: moderateScale(14),
                }}>{`Date : ${item.created}`}</Text>
              <Text
                style={{
                  color: 'black',
                  fontWeight: '400',
                  fontSize: moderateScale(14),
                  marginRight: horizontalScale(15),
                }}>{`Cart Total : ₹${item.cost}`}</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: verticalScale(10),
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: moderateScale(14),
                  color: 'black',
                  fontWeight: '400',
                  marginLeft: horizontalScale(15),
                }}>
                Order Status : Delivered
              </Text>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('orderdetails', {orderId: item.id})
                }>
                <Text
                  style={{
                    fontSize: moderateScale(15),
                    color: 'black',
                    fontWeight: 'bold',
                    color: '#2E6BC6',
                    marginRight: horizontalScale(15),
                  }}>
                  View Order
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}></FlatList>
    </View>
  );
};

export default Myorders;
