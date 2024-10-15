import {View, Text, SafeAreaView, Image} from 'react-native';
import React from 'react';
import MyTabs from './src/routes/route';
import SignupScreen from './src/screens/SignupScreen';
import LoginScreen from './src/screens/LoginScreen';
import Stacknavigation from './src/routes/stacknavigation';
import ForgotpasswordScreen from './src/screens/forgotpasswordScreen';
import UserprofileScreen from './src/screens/UserprofileScreen';
import Storage from './src/screens/Storage';
import UpdateDetails from './src/screens/UpdateDetails';

const App = () => {
  return (
    // <MyTabs></MyTabs>
    // <SignupScreen></SignupScreen>
    // <LoginScreen></LoginScreen>
    // <Stacknavigation></Stacknavigation>
    // <ForgotpasswordScreen></ForgotpasswordScreen>
    // <UserprofileScreen></UserprofileScreen>
    <UpdateDetails></UpdateDetails>
    // <Storage></Storage>
  );
};

export default App;
