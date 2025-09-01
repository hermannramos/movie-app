import { createSlice } from "@reduxjs/toolkit";
import { fetchPopularMovies, fetchPlayingNowMovies, fetchTopRatedMovies, fetchMovieDetails, fetchMovieCredits } from "./moviesThunks.js";

const initialState = {
    popularMovies: [],
    nowPlayingMovies: [],
    topRatedMovies: [],
    movieDetails: null,
    movieCredits: null,
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
            })
            .addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
                state.topRatedMovies = action.payload;
            })
            .addCase(fetchMovieDetails.fulfilled, (state, action) => {
                state.movieDetails = action.payload;
            })
            .addCase(fetchMovieCredits.fulfilled, (state, action) => {
                state.movieCredits = action.payload;
            })
    },
});

export default moviesSlice.reducer;