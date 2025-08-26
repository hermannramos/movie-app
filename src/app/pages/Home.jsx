import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularMovies, fetchPlayingNowMovies } from "../features/moviesThunks";

const Home = () => {
    const dispatch = useDispatch();
    const popularMovies = useSelector((state) => state.movies.popularMovies);
    const nowPlayingMovies = useSelector((state) => state.movies.nowPlayingMovies);

    useEffect(() => {
        dispatch(fetchPopularMovies(10));
        dispatch(fetchPlayingNowMovies(5));
    }, [dispatch]);

    return (
        <div className="home-container">
            <h2>Popular Movies</h2>
            <div className="movies-popular-container">
                {popularMovies.map((movie) => (
                    <div className="movie-item" key={movie.id}>
                        <h4>{movie.title}</h4>
                    </div>
                ))}
            </div>
            <h2>Now Playing Movies</h2>
            <div className="movies-popular-container">
                {nowPlayingMovies.map((movie) => (
                    <div className="movie-item" key={movie.id}>
                        <h4>{movie.title}</h4>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default Home;