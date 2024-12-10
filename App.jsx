import React, {useEffect} from 'react';
import Stacknavigation from './src/routes/stacknavigation';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor} from './src/redux/store';
import {store} from './src/redux/store';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Stacknavigation></Stacknavigation>
      </PersistGate>
    </Provider>
  );
};

export default App;
