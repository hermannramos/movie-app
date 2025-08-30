import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BannerSlider } from "../components/BannerSlider.jsx";
import { fetchPopularMovies, fetchPlayingNowMovies } from "../features/moviesThunks";
import "../../styles/home.scss";

const Home = () => {
    const dispatch = useDispatch();
    const nowPlayingMovies = useSelector((state) => state.movies.nowPlayingMovies);

    useEffect(() => {
        dispatch(fetchPopularMovies(10));
        dispatch(fetchPlayingNowMovies(5));
    }, [dispatch]);

    return (
        <div className="home-container">
            {nowPlayingMovies.length > 0 && (
                <BannerSlider movies={nowPlayingMovies} />
            )}
        </div>
    )
};

export default Home;