import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import MyTabs from './route';
import ForgotpasswordScreen from '../screens/forgotpasswordScreen';
import ChangePassword from '../screens/ChangePassword';
import UpdateDetails from '../screens/UpdateDetails';
import TableScreen from '../screens/TableScreen';
import ChairDetails from '../screens/ChairDetails';
import ChairScreen from '../screens/ChairScreen';
import SofaScreen from '../screens/SofaScreen';
import BedsScreen from '../screens/BedsScreen';
import ProductDetails from '../screens/ProductDetails';

const Stack = createNativeStackNavigator();

const Stacknavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
        <Stack.Screen name="Register" component={SignupScreen}></Stack.Screen>
        <Stack.Screen
          options={{headerShown: true}}
          name="Forgot Password"
          component={ForgotpasswordScreen}></Stack.Screen>
        <Stack.Screen name="HomeScreen" component={MyTabs}></Stack.Screen>
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}></Stack.Screen>
        <Stack.Screen
          name="UpdateDetails"
          component={UpdateDetails}></Stack.Screen>
        <Stack.Screen name="Table" component={TableScreen}></Stack.Screen>
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}></Stack.Screen>
        <Stack.Screen
          name="ChairDetails"
          component={ChairDetails}></Stack.Screen>
        <Stack.Screen name="Chair" component={ChairScreen}></Stack.Screen>
        <Stack.Screen name="Sofa" component={SofaScreen}></Stack.Screen>
        <Stack.Screen name="Beds" component={BedsScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Stacknavigation;
