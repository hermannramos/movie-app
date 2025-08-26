import { createSlice } from "@reduxjs/toolkit";
import { fetchPopularMovies } from "./moviesThunks.js";

const initialState = {
    popularMovies: [],
};

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPopularMovies.fulfilled, (state, action) => {
                state.popularMovies = action.payload;
            })
    }
});

export default moviesSlice.reducer;