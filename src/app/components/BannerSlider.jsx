import React, { useEffect, useState } from "react";
import { toggleListMovie } from "../features/moviesSlice.js";
import { ChevronLeft, ChevronRight, Heart, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "../../styles/banner-slider.scss";

function getMovieImg(movie) {
    return `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`;
};

export const BannerSlider = ({movies}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [slide, setSlide] = useState(0);

    const nextSlide = () => {
        setSlide(slide === movies.length - 1 ? 0 : slide + 1);
    };

    const prevSlide = () => {
        setSlide(slide === 0 ? movies.length - 1 : slide - 1);
    };

    useEffect(() => {
        const id = setInterval(() => setSlide(s => (s + 1) % movies.length), 6000);
        return () => clearInterval(id);
    }, [movies.length])

    return (
        <div className="banner-slider">
            <ChevronLeft size={22} className="arrow arrow-left" onClick={prevSlide}/>
           {movies.map((movie, index) => (
            <div className={slide === index ? "slide" : " slide slide-hidden"} key={movie.id}>
                <img src={getMovieImg(movie)} alt={movie.title}  className="img-banner"/>
                <div className="banner-content">
                    <h2>{movie.title}</h2>
                    <p>{movie.overview}</p>
                    <div className="button-actions">
                        <button type="button" onClick={() => navigate(`/${movie.id}`)}><Info size={18} style={{marginRight: 8}}/>View Details</button>
                        <button type="button" onClick={() => dispatch(toggleListMovie(movie))}><Heart size={18} style={{marginRight: 8}} />Add To Wishlist</button>
                    </div>
                </div>
            </div>
           ))}
           <ChevronRight size={22} className="arrow arrow-right" onClick={nextSlide}/>
           <span className="indicators">
            {movies.map((_, index) => (
                <button key={index} onClick={() => setSlide(index)} className={slide === index ? "indicator" : "indicator indicator-inactive"}></button>
            ))}
           </span>
        </div>
    );
};