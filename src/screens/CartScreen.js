import {View,Image} from 'react-native';
import React from 'react';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { Dimensions } from 'react-native';

const CartScreen = () => {
  const data = [
    {
      id: 1,
      image:
        'https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      id: 2,
      image:
        'https://images.pexels.com/photos/135940/pexels-photo-135940.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ];

  return (
    <View>
      <SwiperFlatList
        data={data}
        renderItem={({item}) => (
          <View>
            <Image style = {{height : 250 , width : Dimensions.get('screen').width}} source={{uri:item.image}}></Image>
          </View>
        )}></SwiperFlatList>
    </View>
  );
};

export default CartScreen;
