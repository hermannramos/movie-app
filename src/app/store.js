import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./features/moviesSlice.js";

export const store = configureStore({
    reducer: {
        movies: moviesReducer,
    }
});

store.subscribe(() => {
    try {
        const { wishlist } = store.getState().movies;
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    } catch { /* empty */ }
});