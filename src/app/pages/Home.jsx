import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BannerSlider } from "../components/BannerSlider.jsx";
import { PosterSlider } from "../components/PosterSlider.jsx";
import { RatingSlider } from "../components/RatingSlider.jsx";
import { fetchPopularMovies, fetchPlayingNowMovies, fetchTopRatedMovies } from "../features/moviesThunks.js";
import "../../styles/home.scss";


const Home = () => {
    const dispatch = useDispatch();
    const nowPlayingMovies = useSelector((state) => state.movies.nowPlayingMovies);
    const popularMovies = useSelector((state) => state.movies.popularMovies);
    const topRatedMovies = useSelector((state) => state.movies.topRatedMovies);

    useEffect(() => {
        dispatch(fetchPopularMovies(10));
        dispatch(fetchTopRatedMovies(10));
        dispatch(fetchPlayingNowMovies(5));
    }, [dispatch]);

    return (
        <div className="home-container">
            <div className="banner">
                {nowPlayingMovies.length > 0 && (
                    <BannerSlider movies={nowPlayingMovies} />
                )}
            </div>
            <div className="section-carousel">
                {topRatedMovies.length > 0 && (
                    <RatingSlider movies={topRatedMovies} />
                )}
            </div>
            <div className="section-carousel">
                {popularMovies.length > 0 && (
                    <PosterSlider movies={popularMovies} />
                )}
            </div>
        </div>
    )
};

export default Home;