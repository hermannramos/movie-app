import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularMovies } from "../features/moviesThunks";

const Home = () => {
    const dispatch = useDispatch();
    const popularMovies = useSelector((state) => state.movies.popularMovies);

    useEffect(() => {
        dispatch(fetchPopularMovies(10));
    }, [dispatch]);

    return (
        <div className="home-container">
            <h2>Popular Movies</h2>
            <div className="movies-container">
                {popularMovies.map((movie) => (
                    <div className="movie-item" key={movie.id}>
                        <h4>{movie.title}</h4>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default Home;