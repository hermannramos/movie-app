import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import "../../styles/rated-carousel.scss";
import { useNavigate } from "react-router-dom";

function getImgMovie(movie){
    return `https://image.tmdb.org/t/p/w342${movie.poster_path}`;
};

export const RatingSlider = ({ movies }) => {
    const VISIBLE = 4;
    const navigate = useNavigate();
    const [slide, setSlide] = useState(0);

    const nextSlide = () => setSlide((slide) => (slide + 1) % movies.length);
    const prevSlide = () => setSlide((slide) => (slide - 1 + movies-length) % movies.length);

    const moviesToShow = Array.from({ length: Math.min(VISIBLE, movies.length) }, (_, i) => {
        const index = (slide + i) % movies.length;
        return movies[index];
    });

    return (
        <div className="rated-slider">
            <h2>Top Rated Movies</h2>
            <ChevronLeft size={22} className="arrow arrow-left" onClick={prevSlide} />
            <div className="rated-list">
                {moviesToShow.map((movie) => (
                    <div className="top-carousel" key={movie.id}>
                        <img src={getImgMovie(movie)} alt={movie.title} className="rated-poster"/>
                        <div className="rated-content">
                            <h4>{movie.title}</h4>
                            <div className="button-actions">
                                <button>{movie.vote_average}</button>
                                <button type="button" onClick={() => navigate(`/${movie.id}`)}><Info size={15} /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <ChevronRight size={22} className="arrow arrow-right" onClick={nextSlide} />
        </div>
    );
};