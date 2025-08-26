import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPopularMovies = createAsyncThunk("movies/fetchPopularMovies", async(limit=10) => {
    const response = await fetch(`/api/movies/popular?limit=${limit}`);
    if(!response.ok){
        throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    return data.results || [];
});

export const fetchPlayingNowMovies = createAsyncThunk("movies/fetchPlayingNowMovies", async(limit=5) => {
    const response = await fetch(`/api/movies/now_playing?limit=${limit}`);
    if(!response.ok){
        throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    return data.results || [];
});