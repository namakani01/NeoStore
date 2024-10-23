import {View, Text, SafeAreaView, Image} from 'react-native';
import MyTabs from './src/routes/route';
import SignupScreen from './src/screens/SignupScreen';
import LoginScreen from './src/screens/LoginScreen';
import ForgotpasswordScreen from './src/screens/forgotpasswordScreen';
import UserprofileScreen from './src/screens/UserprofileScreen';
import Storage from './src/screens/Storage';
import UpdateDetails from './src/screens/UpdateDetails';

import React from 'react';
import Stacknavigation from './src/routes/stacknavigation';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor} from './src/redux/store';
import {store} from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Stacknavigation></Stacknavigation>
      </PersistGate>
    </Provider>

    // <MyTabs></MyTabs>
    // <SignupScreen></SignupScreen>
    // <LoginScreen></LoginScreen>
    // <ForgotpasswordScreen></ForgotpasswordScreen>
    // <UserprofileScreen></UserprofileScreen>
    // <UpdateDetails></UpdateDetails>
    // <Storage></Storage>
  );
};

export default App;
