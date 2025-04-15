import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice';
import currencyResucer from './currencySlice';
import colorResucer from './colorSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        money: currencyResucer,
        color:colorResucer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;