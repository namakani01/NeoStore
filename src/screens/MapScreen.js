import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import React from 'react';
import Icon1 from 'react-native-vector-icons/Entypo';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../assests/styles/Metrics';

const data = [
  {
    id: 1,
    name: 'SkyLand Store',
    address: '6335 Edgewood Road Reister, MD 21136',
  },
  {
    id: 2,
    name: 'WoodMount Store',
    address: '9437 Pin Oak Drive South Plainfield, NJ 07080',
  },

  {
    id: 3,
    name: 'Natufur Store',
    address: '3798 Pennsylvania Avenue Brandon, FL 33510',
  },
  {
    id: 4,
    name: 'Lavander Store',
    address: '3798 Pennsylvania Avenue Brandon, FL 33510',
  },

  {
    id: 5,
    name: 'Furnimatt Store',
    address: '7346 Hanover Court Arlington, MA 02474',
  },
];

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 19.037751628607193,
          longitude: 72.8543828907181,
          latitudeDelta: 0.0825,
          longitudeDelta: 0.0411,
        }}>
        <Marker
          coordinate={{
            latitude: 19.06256253767152,
            longitude: 72.90382528864903,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          title="SkyLand Store"
          description="6335 Edgewood Road Reister, MD 21136"></Marker>
        <Marker
          coordinate={{
            latitude: 19.120961483546996,
            longitude: 73.00613546733383,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          title="WoodMount Store"
          description="9437 Pin Oak Drive South Plainfield, NJ 07080"></Marker>
        <Marker
          coordinate={{
            latitude: 19.128097718822165,
            longitude: 72.89077902425298,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          title="Natufur Store"
          description="3798 Pennsylvania Avenue Brandon, FL 33510"></Marker>
        <Marker
          coordinate={{
            latitude: 19.041815318235244,
            longitude: 72.8671860680074,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          title="Lavander Store"
          description="3798 Pennsylvania Avenue Brandon, FL 33510"></Marker>
      </MapView>
      <Marker
        coordinate={{
          latitude: 19.07474310011587,
          longitude: 72.86928969165734,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        title="Furnimatt Store"
        description="7346 Hanover Court Arlington, MA 02474"></Marker>

      <FlatList
        data={data}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                height: verticalScale(2),
                backgroundColor: '#ddd',
                marginTop: verticalScale(10),
              }}></View>
          );
        }}
        renderItem={({item}) => (
          <TouchableOpacity style={{marginTop: verticalScale(20)}}>
            <View
              style={{
                flexDirection: 'row',
                marginLeft: horizontalScale(10),
              }}>
              <Icon1
                style={{marginTop: verticalScale(5)}}
                name="location"
                size={20}
                color="black"></Icon1>
              <Text
                style={{
                  marginLeft: horizontalScale(20),
                  fontSize: moderateScale(15.4),
                  color: 'black',
                }}>
                {item.name}
              </Text>
            </View>
            <Text
              style={{
                marginLeft: horizontalScale(50),
                marginTop: verticalScale(4),
                fontSize: moderateScale(15.4),
                color: 'black',
              }}>
              {item.address}
            </Text>
          </TouchableOpacity>
        )}></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
  },

  map: {
    height: verticalScale(280),
    width: Dimensions.get('screen').width,
  },
});

export default MapScreen;
