import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice';
import currencyReducer from './currencySlice';
import colorReducer from './colorSlice';
import searchReducer from './searchSlice';
import authReducer from './authSlice';
import { loadFromLocalStorage, saveToLocalStorage } from "../js/localStorage";

const preloadedState = loadFromLocalStorage();

const store = configureStore({
    reducer: {
        cart: cartReducer,
        money: currencyReducer,
        color: colorReducer,
        search: searchReducer,
        auth: authReducer,
    },preloadedState,
    devTools: process.env.NODE_ENV !== 'production',
});

store.subscribe(() => {
  const state = store.getState();
  saveToLocalStorage({
    cart: state.cart,
    auth: state.auth,
  });
});

export default store;