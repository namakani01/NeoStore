import {View , TextInput } from 'react-native'
import Icon1 from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/FontAwesome5';

import Icon3 from 'react-native-vector-icons/Fontisto';
import Icon4 from 'react-native-vector-icons/Feather';
import Icon5 from 'react-native-vector-icons/SimpleLineIcons';
import Icon6 from 'react-native-vector-icons/SimpleLineIcons';

import Icon7 from 'react-native-vector-icons/FontAwesome';


import React from 'react'




const InputBox = (props) => {
    console.log(props)
    const Icon2 = <Icon2 name = {props.props.name}></Icon2>

  return (
    <View style={{marginTop: 10, flexDirection: 'row', borderWidth: 2,borderRadius : 8,borderColor:'grey'}}>
    <Icon1
      style={{marginTop: 12, marginLeft: 5}}
      name={'user'}
      size={23}
      color={'orange'}></Icon1>
   <TextInput style={{height: 47, width: '85%', marginLeft: 10}}></TextInput>
  </View>
  )
}

export default InputBox