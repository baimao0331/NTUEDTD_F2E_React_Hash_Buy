import { createSlice } from "@reduxjs/toolkit";


const initialState = { searchHistory:[] };
const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        newHistory: (state, action) => {
            const keyword = action.payload;
            state.searchHistory.push(keyword);
        },
        clearHistory: (state, action) => {
            searchHistory = [];
        },
    },
});

export const selectSearchHistory = (state) => state.search.searchHistory;
export const { newHistory, clearHistory } = searchSlice.actions;
export default searchSlice.reducer; 