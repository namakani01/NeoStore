import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Logo from '../components/Logo';
import {SafeAreaView} from 'react-native-safe-area-context';
import {styles} from '../assests/styles/Externalstyle';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {Dimensions} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../assests/styles/Metrics';

const HomeScreen = props => {
  const data = [
    {
      id: 1,
      image:
        'https://www.ikea.com/images/a-sunny-neutral-toned-bedroom-with-a-kleppstad-bed-covered-i-90f96ca7b3020af7b8625ab888bbfc86.jpg',
    },
    {
      id: 2,
      image:
        'https://www.ikea.com/cz/en/images/products/pax-wardrobe-combination-white__0937316_pe793636_s5.jpg?f=s',
    },
    {
      id: 3,
      image:
        'https://www.estre.in/cdn/shop/files/2-min_5666e024-8513-4cf2-9914-01c3775203f1_533x.jpg?v=1710229425',
    },
    {
      id: 4,
      image:
        'https://www.estre.in/cdn/shop/files/2-min-1_0035c655-d0e7-4c27-a0c4-0d70b67551cf.jpg?v=1710413752',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={{marginTop: verticalScale(15)}}>
        <Logo />
      </View>

      <View style={{marginTop: verticalScale(12)}}>
        <SwiperFlatList
          autoplay
          autoplayLoop
          autoplayDelay={2.1}
          showPagination
          paginationStyleItem={{
            height: verticalScale(10),
            width: horizontalScale(10),
            padding: verticalScale(5),
            marginTop: verticalScale(3),
          }}
          data={data}
          renderItem={({item}) => (
            <Image
              style={{
                height: verticalScale(250),
                width: Dimensions.get('screen').width,
              }}
              source={{uri: item.image}}></Image>
          )}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: verticalScale(35),
        }}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Table')}
          style={{
            padding: verticalScale(25),
            width: horizontalScale(110),
            height: verticalScale(110),
            borderRadius: moderateScale(60),
            backgroundColor: '#F2F2F2',
          }}>
          <Image
            style={{height: verticalScale(65), width: horizontalScale(65)}}
            source={require('../assests/images/table.png')}></Image>
          <Text
            style={{
              marginTop: verticalScale(30),
              textAlign: 'center',
              fontSize: moderateScale(16),
              color: 'black',
              fontWeight: '400',
            }}>
            Table
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate('Chair')}
          style={{
            padding: verticalScale(25),
            width: horizontalScale(110),
            height: verticalScale(110),
            borderRadius: moderateScale(60),
            backgroundColor: '#F2F2F2',
          }}>
          <Image
            style={{height: verticalScale(65), width: horizontalScale(65)}}
            source={require('../assests/images/chair.png')}></Image>
          <Text
            style={{
              marginTop: verticalScale(30),
              textAlign: 'center',
              fontSize: moderateScale(16),
              color: 'black',
              fontWeight: '400',
            }}>
            Chairs
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: verticalScale(68),
        }}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Sofa')}
          style={{
            padding: verticalScale(25),
            width: horizontalScale(110),
            height: verticalScale(110),
            borderRadius: moderateScale(60),
            backgroundColor: '#F2F2F2',
          }}>
          <Image
            style={{height: verticalScale(65), width: horizontalScale(65)}}
            source={require('../assests/images/sofa.png')}></Image>
          <Text
            style={{
              marginTop: verticalScale(30),
              textAlign: 'center',
              fontSize: moderateScale(16),
              color: 'black',
              fontWeight: '400',
            }}>
            Sofa
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate('Beds')}
          style={{
            padding: verticalScale(25),
            width: horizontalScale(110),
            height: verticalScale(110),
            borderRadius: moderateScale(60),
            backgroundColor: '#F2F2F2',
          }}>
          <Image
            style={{height: verticalScale(65), width: horizontalScale(65)}}
            source={require('../assests/images/bed.png')}></Image>
          <Text
            style={{
              marginTop: verticalScale(30),
              textAlign: 'center',
              fontSize: moderateScale(16),
              color: 'black',
              fontWeight: '400',
            }}>
            Beds
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
