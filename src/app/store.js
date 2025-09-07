import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./features/moviesSlice.js";

export const store = configureStore({
    reducer: {
        movies: moviesReducer,
    }
});

if(typeof window !== "undefined" && typeof localStorage !== "undefined") {
    let lastWishlist = store.getState().movies?.wishlist;
    
    store.subscribe(() => {
        try {
            const currentWishlist = store.getState().movies?.wishlist;
            if (currentWishlist !== lastWishlist){
                lastWishlist = currentWishlist;
                localStorage.setItem("wishlist", JSON.stringify(currentWishlist || []));
            }
        } catch { /* empty */ }
    });
};
