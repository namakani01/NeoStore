import { View, Image} from 'react-native'
import React from 'react'

const Logo = () => {
  return (
    <View>
      <Image style = {{height : 30 , width : '57%',alignSelf : 'center'}}source={require('../assests/images/NeoStore-Logo.png')}></Image>
      </View>
  )
}

export default Logo