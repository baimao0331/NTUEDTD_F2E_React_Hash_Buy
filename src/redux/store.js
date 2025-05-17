import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice';
import currencyReducer from './currencySlice';
import colorReducer from './colorSlice';
import searchReducer from './searchSlice';
import authReducer from './authSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        money: currencyReducer,
        color: colorReducer,
        search: searchReducer,
        auth: authReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;