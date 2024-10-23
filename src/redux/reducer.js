import {createSlice} from '@reduxjs/toolkit';

const initialState = [];
const AddressSlice = createSlice({
  name: 'address',
  initialState: initialState,
  reducers: {
    addAddress: (initialState, action) => {
      initialState.push(action.payload);
    },

    deleteAddress: (initialState, action) => {
      return initialState.filter(value => value.id !== action.payload);
    },
  },
});

export const {addAddress , deleteAddress} = AddressSlice.actions;
export default AddressSlice.reducer;
