import { createSlice } from "@reduxjs/toolkit";

const initialState = {cartItems:[]};
const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addCartItems: (state, action) =>{
            const item = action.payload;
            const existingItem = state.cartItems.find(x => x.id === item.id && x.variantID === item.variantID);
            if(existingItem){
                existingItem.qty += item.qty;
            }else{
                state.cartItems.push({
                    ...item,
                    qty: item.qty,
                  });
            }
        },
        updateQty: (state, action) => {
            const { id, variantID, qty } = action.payload;
            const item = state.cartItems.find(i => i.id === id && i.variantID === variantID);
            if (item) {
              const newQty = Number(qty);
              if (!isNaN(newQty)) {
                item.qty = Math.max(1, Math.min(newQty, item.stock)); // 限制數量不能小於 1 或大於庫存
              }
            }
          },
          removeItem: (state, action) => {
            const { id, variantID } = action.payload;
            state.cartItems = state.cartItems.filter(
              item => !(item.id === id && item.variantID === variantID)
            );
          },
    },
});

export const selectCartItems = (state) => state.cart.cartItems;
export const { addCartItems, updateQty, removeItem } = cartSlice.actions;
export default cartSlice.reducer; 