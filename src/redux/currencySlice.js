import { createSlice } from "@reduxjs/toolkit";

const currency = 'TWD'
const initialState = { currency };
const currencySlice = createSlice({
    name:'money',
    initialState,
    reducers:{
        updateCurrency: (state, action) => {
            state.currency = action.payload;
          },
    },
});

export const selectCurrency = (state) => state.money.currency;
export const { updateCurrency } = currencySlice.actions;
export default currencySlice.reducer; 