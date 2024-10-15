import { View, Text } from 'react-native'
import React, { startTransition, useState } from 'react'
import EncryptedStorage from 'react-native-encrypted-storage'


const Storage = () => {
const [tokenn, setToken] = useState('')

    const useToken = () => {
        return  (EncryptedStorage.getItem('access_token'))
   }
   const token = useToken();

   console.log('token is ' , token)
   setToken(token)
   console.log('tokenn----',tokenn)
  return (
    <View>
      <Text>Storage</Text>
    </View>
  )
}

export default Storage