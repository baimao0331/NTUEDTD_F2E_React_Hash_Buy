import { createSlice } from "@reduxjs/toolkit";

const lightMode = window.matchMedia('(prefers-color-scheme: light)').matches;
console.log("初始lightMode",lightMode)
//const isDarkMode = !isDarkMode;

const initialState = { lightMode };
const colorSlice = createSlice({
    name:'color',
    initialState,
    reducers:{
        setColorMode: (state, action) => {
            state.lightMode = action.payload;
          },
    },
});

export const selectLightMode = (state) => state.color.lightMode;
export const { setColorMode } = colorSlice.actions;
export default colorSlice.reducer; 