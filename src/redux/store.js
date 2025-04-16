import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice';
import currencyResucer from './currencySlice';
import colorResucer from './colorSlice';
import searchResucer from './searchSlice'

const store = configureStore({
    reducer: {
        cart: cartReducer,
        money: currencyResucer,
        color: colorResucer,
        search: searchResucer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;