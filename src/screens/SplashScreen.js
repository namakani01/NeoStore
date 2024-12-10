import {View, Image, Text, StatusBar} from 'react-native';
import React, {useEffect} from 'react';

const SplashScreen = props => {
  useEffect(() => {
    setTimeout(() => {
      props.navigation.replace('Login');
    }, 3000);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        style={{height: 30, width: '65%'}}
        source={require('../assests/images/NeoStore-Logo.png')}></Image>

      <Text style={{marginTop: 20, fontSize: 17, color: 'black'}}>
        Shop the Best 🛒
      </Text>

      {/* <StatusBar backgroundColor={'white'}></StatusBar> */}
    </View>
  );
};

export default SplashScreen;
