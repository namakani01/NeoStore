import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  cartTotal: 0,
};

const cartTotalSlice = createSlice({
  name: 'cartTotal',
  initialState,
  reducers: {
    setCartTotal: (state, action) => {
      state.cartTotal = action.payload;
    },
  },
});

export const {setCartTotal} = cartTotalSlice.actions;
export default cartTotalSlice.reducer;
