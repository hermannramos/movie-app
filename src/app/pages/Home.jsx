import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularMovies, fetchPlayingNowMovies } from "../features/moviesThunks";
import "../../styles/home.scss";

const Home = () => {
    const dispatch = useDispatch();
    // const popularMovies = useSelector((state) => state.movies.popularMovies);
    const nowPlayingMovies = useSelector((state) => state.movies.nowPlayingMovies);
    const heroMovie = nowPlayingMovies && nowPlayingMovies[0];
    const heroImage = 
        heroMovie?.backdrop_path
        ? `https://image.tmdb.org/t/p/w1280${heroMovie.backdrop_path}`
        : (heroMovie?.poster_path ? `https://image.tmdb.org/t/p/w780${heroMovie.poster_path}` : '');


    useEffect(() => {
        dispatch(fetchPopularMovies(10));
        dispatch(fetchPlayingNowMovies(5));
    }, [dispatch]);

    return (
        <div className="home-container">
            {heroMovie && (
                <section className="banner">
                    <div className="banner-bg" style={{backgroundImage: `url(${heroImage})`}} />
                    <div className="banner-content">
                        <h1 className="banner-title">{heroMovie.title}</h1>
                        <p className="banner-overview">{heroMovie.overview}</p>
                        <div className="banner-actions">
                            <button type="button">Ver detalles</button>
                            <button></button>
                        </div>
                    </div>
                </section>
            )}
        </div>
    )
};

export default Home;