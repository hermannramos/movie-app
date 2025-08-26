import { createSlice } from "@reduxjs/toolkit";
import { fetchPopularMovies, fetchPlayingNowMovies } from "./moviesThunks.js";

const initialState = {
    popularMovies: [],
    nowPlayingMovies: [],
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

            .addCase(fetchPlayingNowMovies.fulfilled, (state, action) => {
                state.nowPlayingMovies = action.payload;
            });
    }
});

export default moviesSlice.reducer;