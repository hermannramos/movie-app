import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BannerSlider } from "../components/BannerSlider.jsx";
import { PosterSlider } from "../components/PosterSlider.jsx";
import { fetchPopularMovies, fetchPlayingNowMovies } from "../features/moviesThunks";
import "../../styles/home.scss";

const Home = () => {
    const dispatch = useDispatch();
    const nowPlayingMovies = useSelector((state) => state.movies.nowPlayingMovies);
    const popularMovies = useSelector((state) => state.movies.popularMovies);

    useEffect(() => {
        dispatch(fetchPopularMovies(10));
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
                {popularMovies.length > 0 && (
                    <PosterSlider movies={popularMovies} />
                )}
            </div>
        </div>
    )
};

export default Home;