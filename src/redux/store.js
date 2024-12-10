import {configureStore} from '@reduxjs/toolkit';
import AddressReducer from '../redux/reducer';
import {persistStore, persistReducer} from 'redux-persist';
import EncryptedStorage from 'react-native-encrypted-storage';
import { combineReducers } from 'redux';
import CartReducer from '../redux/cartSlice'
import cartTotalReducer  from '../redux/cartTotalSlice'


const persistConfig = {
  key: 'root',
  storage: EncryptedStorage,
};

const rootReducer = combineReducers({
    address: AddressReducer, 
    cart: CartReducer, 
    cartTotal : cartTotalReducer,
  });

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (
    getDefaultMiddleware, // non- serilizer error
  ) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
