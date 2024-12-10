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
import AddressScreen from '../screens/AddressScreen';
import SplashScreen from '../screens/SplashScreen';

const Stack = createNativeStackNavigator();

const Stacknavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={SplashScreen}></Stack.Screen>
        <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
        <Stack.Screen name="Register" component={SignupScreen}></Stack.Screen>
        <Stack.Screen
          options={{headerShown: true}}
          name="Forgot Password"
          component={ForgotpasswordScreen}></Stack.Screen>
        <Stack.Screen name="HomeScreen" component={MyTabs}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Stacknavigation;
