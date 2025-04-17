import { createSlice } from "@reduxjs/toolkit";


const initialState = { searchHistory:[] };
const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        newHistory: (state, action) => {
            const keyword = action.payload;
            state.searchHistory.unshift(keyword);
            if (state.searchHistory.length > 5) {
                state.searchHistory = state.searchHistory.slice(0, 5);
              }
        },
        clearHistory: (state, action) => {
            state.searchHistory = [];
        },
    },
});

export const selectSearchHistory = (state) => state.search.searchHistory;
export const { newHistory, clearHistory } = searchSlice.actions;
export default searchSlice.reducer; 