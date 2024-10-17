import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen'
import MyTabs from './route'
import ForgotpasswordScreen from '../screens/forgotpasswordScreen'
import ChangePassword from '../screens/ChangePassword'
import UpdateDetails from '../screens/UpdateDetails'
import TableScreen from '../screens/TableScreen'
import TableDetails from '../screens/TableDetails'
import ChairDetails from '../screens/ChairDetails'

const Stack = createNativeStackNavigator()

const Stacknavigation = () => {

  return (
<NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown  : false}}>
        <Stack.Screen name = 'Login' component={LoginScreen}></Stack.Screen>
        <Stack.Screen name = 'Register' component={SignupScreen}></Stack.Screen>
        <Stack.Screen options={{headerShown : true}} name = 'Forgot Password' component={ForgotpasswordScreen}></Stack.Screen>
        <Stack.Screen name = 'HomeScreen' component={MyTabs}></Stack.Screen>
        <Stack.Screen name = 'ChangePassword' component={ChangePassword}></Stack.Screen>
        <Stack.Screen name = 'UpdateDetails' component={UpdateDetails}></Stack.Screen>
        <Stack.Screen name = 'Table' component={TableScreen}></Stack.Screen>
        <Stack.Screen name = 'TableDetails'  component={TableDetails}></Stack.Screen>
        <Stack.Screen name = 'ChairDetails' component={ChairDetails}></Stack.Screen>
    </Stack.Navigator>
</NavigationContainer>
  )
}

export default Stacknavigation