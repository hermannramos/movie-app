import { createSlice } from "@reduxjs/toolkit";
import { fetchPopularMovies, fetchPlayingNowMovies, fetchTopRatedMovies, fetchMovieDetails, fetchMovieCredits } from "./moviesThunks.js";

const initialState = {
    popularMovies: [],
    nowPlayingMovies: [],
    topRatedMovies: [],
    movieDetails: null,
    movieCredits: null,
    wishList: [],
};

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        toggleListMovie(state, action) {
            const movie = action.payload;
            const index = state.wishList.findIndex((m) => m.id === movie.id);
            if(index >= 0){
                state.wishList.splice(index, 1);
            } else {
                state.wishList.push({
                    id: movie.id,
                    title: movie.title,
                    poster_path: movie.poster_path,
                    release_date: movie.release_date,
                });
            }
        },
        removeFromList(state, action) {
            const movieId = action.payload;
            state.wishList = state.wishList.filter((m) => m.id !== movieId);
        },
        clearList(state){
            state.wishList = [];
        },
    },
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

export const { toggleListMovie, removeFromList, clearList, hydrateList } = moviesSlice.actions;
export default moviesSlice.reducer;