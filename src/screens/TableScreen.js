import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TableScreen = props => {
  const [output, setoutput] = useState([]);
  const [page, setPage] = useState(1);

  const [showSeeMore, setShowSeeMore] = useState(false);

  console.log('>>>>>output :', output);

  async function ShowTables() {
    try {
      const accessToken = await EncryptedStorage.getItem('access_token');

      if (accessToken) {
        let result = await axios.get(
          `http://staging.php-dev.in:8844/trainingapp/api/products/getList?product_category_id=1&page=${page}`,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );

        setoutput(prevOutput => [...prevOutput, ...result.data.data]);
        setPage(prevPage => prevPage + 1);
      } else {
        Alert.alert('Error');
      }
    } catch (error) {
      console.log(error.response ? error.response.data : error.message);
    }
  }

  useEffect(() => {
    ShowTables();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <FlatList
        data={output}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              if (item.id === 1) {
                props.navigation.navigate('TableDetails', {id: item.id});
              } else if (item.id === 2) {
                props.navigation.navigate('ChairDetails', {id: item.id});
              }
            }}
            style={{
              borderWidth: 1,
              height: 380,
              width: 350,
              marginTop: 30,
              alignSelf: 'center',
              borderRadius: 12,
              backgroundColor: 'white',
              borderColor: '#ddd',
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.1,
              shadowRadius: 5,
              elevation: 4,
            }}>
            <Image
              style={{
                height: 150,
                width: 250,
                alignSelf: 'center',
                marginTop: 24,
              }}
              source={{uri: item.product_images}}></Image>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 16,
              }}>
              <Text
                style={{
                  fontSize: 17,
                  color: 'black',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginBottom: 13,
                }}>
                {item.name}
              </Text>

              <Icon
                style={{paddingLeft: 50}}
                name="remove-red-eye"
                size={21}></Icon>
              <Text
                style={{fontSize: 14, marginLeft: 5, fontWeight: '600'}}>{`${
                item.view_count * 0.5
              }k`}</Text>
            </View>

            <StarRatingDisplay
              style={{alignSelf: 'center'}}
              starSize={25}
              rating={item.rating}></StarRatingDisplay>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={{marginTop: 10, marginHorizontal: 25, fontSize: 16}}>
              {item.description}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                marginTop: 10,
              }}>
              <Text
                style={{
                  color: '#A4A4A4',
                  fontWeight: 'black',
                  marginTop: 2,
                  fontSize: 17,
                  textDecorationLine: 'line-through',
                  paddingHorizontal: 10,
                }}>{`₹${item.cost}`}</Text>
              <Text
                style={{
                  color: '#2E6BC6',
                  fontWeight: 'bold',
                  fontSize: 19,
                }}>{`₹${item.cost}`}</Text>

              <Text
                style={{
                  paddingHorizontal: 10,
                  color: '#2E6BC6',
                  fontWeight: 'bold',
                  fontSize: 15,
                }}>
                (0% off)
              </Text>
            </View>
          </TouchableOpacity>
        )}
        onEndReached={() => setShowSeeMore(true)}
        onScroll={() => setShowSeeMore(false)}
      />

      {showSeeMore ? (
        <TouchableOpacity
          onPress={() => ShowTables()}
          style={{alignSelf: 'center', marginVertical: 15}}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: '#2E6BC6'}}>
            See More
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default TableScreen;
