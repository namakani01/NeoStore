import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../assests/styles/Metrics';

const SofaScreen = props => {
  const [output, setoutput] = useState([]);
  // console.log('>>>>> output :', output);

  async function ShowSofa() {
    try {
      const accessToken = await EncryptedStorage.getItem('access_token');

      if (accessToken) {
        let result = await axios.get(
          `http://staging.php-dev.in:8844/trainingapp/api/products/getList?product_category_id=3`,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );

        setoutput(result?.data?.data);
      } else {
        Alert.alert('Error');
      }
    } catch (error) {
      console.log(error.response ? error.response.data : error.message);
    }
  }

  useEffect(() => {
    ShowSofa();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <FlatList
        data={output}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('ProductDetails', {id: item.id})
            }
            style={{
              borderWidth: 1,
              height: verticalScale(340),
              width: horizontalScale(300),
              marginTop: verticalScale(30),
              alignSelf: 'center',
              borderRadius: moderateScale(12),
              backgroundColor: 'white',
              borderColor: '#ddd',
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.1,
              shadowRadius: 5,
              elevation: 4,
              marginBottom: verticalScale(12),
            }}>
            <Image
              style={{
                height: verticalScale(153),
                width: horizontalScale(222),
                alignSelf: 'center',
                marginTop: verticalScale(15),
              }}
              source={{uri: item.product_images}}></Image>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: verticalScale(15),
              }}>
              <Text
                style={{
                  fontSize: moderateScale(14.7),
                  color: 'black',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginBottom: verticalScale(10),
                }}>
                {item.name}
              </Text>

              <Icon
                style={{paddingLeft: horizontalScale(40)}}
                name="remove-red-eye"
                size={20}></Icon>
              <Text
                style={{
                  fontSize: moderateScale(14),
                  marginLeft: horizontalScale(5),
                  fontWeight: '600',
                }}>{`${item.view_count * 0.005}k`}</Text>
            </View>

            <StarRatingDisplay
              style={{alignSelf: 'center'}}
              starSize={22.6}
              rating={item.rating}></StarRatingDisplay>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={{
                marginTop: verticalScale(10),
                textAlign: 'left',
                marginHorizontal: horizontalScale(25),
                fontSize: moderateScale(14.3),
                color: '#2E2E2E',
              }}>
              {item.description}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                marginTop: verticalScale(10),
              }}>
              <Text
                style={{
                  color: '#A4A4A4',
                  fontWeight: 'black',
                  marginTop: verticalScale(1.5),
                  fontSize: moderateScale(15.8),
                  textDecorationLine: 'line-through',
                  paddingHorizontal: horizontalScale(10),
                }}>{`₹${item.cost}`}</Text>
              <Text
                style={{
                  color: '#2E6BC6',
                  fontWeight: 'bold',
                  fontSize: moderateScale(16.8),
                }}>{`₹${item.cost}`}</Text>

              <Text
                style={{
                  paddingHorizontal: horizontalScale(10),
                  color: '#2E6BC6',
                  fontWeight: 'bold',
                  fontSize: moderateScale(13.5),
                }}>
                (0% off)
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default SofaScreen;
