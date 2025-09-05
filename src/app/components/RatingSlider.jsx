import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Info, Film } from "lucide-react";
import "../../styles/rated-carousel.scss";
import { useNavigate } from "react-router-dom";

function getImgMovie(movie){
    return `https://image.tmdb.org/t/p/w342${movie.poster_path}`;
};

export const RatingSlider = ({ movies }) => {
    const VISIBLE = 5;
    const navigate = useNavigate();
    const [slide, setSlide] = useState(0);

    const nextSlide = () => setSlide((slide) => (slide + 1) % movies.length);
    const prevSlide = () => setSlide((slide) => (slide - 1 + movies.length) % movies.length);

    const moviesToShow = Array.from({ length: Math.min(VISIBLE, movies.length) }, (_, i) => {
        const index = (slide + i) % movies.length;
        return {movie: movies[index], rank: index + 1};
    });

    return (
        <div className="rated-slider">
            <h2><Film size={30} style={{marginRight: 8, verticalAlign: "middle"}}/> Top Rated Movies</h2>
            <div className="rated-divider"></div>
            <div className="rated-list">
                {moviesToShow.map(({movie, rank}) => (
                    <div className="top-card" key={movie.id}>
                        <div className="rank-wrap">
                            <div className="rank-number">{rank}</div>
                        </div>
                        <div className="poster-wrap">
                            <img src={getImgMovie(movie)} alt={movie.title} className="rank-poster"/>
                        </div>
                        <div className="rank-gap"></div>
                        <div className="rated-title">{movie.title}</div>
                        <div className="rated-actions">
                            <button className="score">{Math.round(movie.vote_average * 10) / 10}</button>
                            <button type="button" onClick={() => navigate(`/${movie.id}`)}><Info size={15} /></button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="rated-arrows">
                <ChevronLeft size={22} className="rated-arrow rated-arrow-left" onClick={prevSlide} />
                <ChevronRight size={22} className="rated-arrow rated-arrow-right" onClick={nextSlide} />
            </div>
        </div>
    );
};