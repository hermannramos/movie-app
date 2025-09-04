import React, { useEffect, useState } from "react";
import { toggleListMovie } from "../features/moviesSlice.js";
import { ChevronLeft, ChevronRight, Heart, Info } from "lucide-react";
import "../../styles/poster-carousel.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function getImgMovie(movie) {
  return `https://image.tmdb.org/t/p/w342${movie.poster_path}`;
};

export const PosterSlider = ({ movies }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const wishList = useSelector((state) => state.movies.wishList);

  const VISIBLE = 4;
  const [slide, setSlide] = useState(0);

  const nextSlide = () => setSlide((s) => (s + 1) % movies.length);
  const prevSlide = () => setSlide((s) => (s - 1 + movies.length) % movies.length);

  useEffect(() => {
    if (movies.length <= VISIBLE) return;
    const id = setInterval(() => setSlide((s) => (s + 1) % movies.length), 5000);
    return () => clearInterval(id);
  }, [movies.length]);

  const itemsToShow = Array.from({ length: Math.min(VISIBLE, movies.length) }, (_, i) => {
    const index = (slide + i) % movies.length;
    return movies[index];
  });

  const isInWishlist = (movie) => {
    return wishList.some((m) => m.id === movie.id);
  }

  return (
    <div className="poster-slider">
        <h2>Popular Movies</h2>
      <ChevronLeft size={22} className="arrow arrow-left" onClick={prevSlide} />
      <div className="poster-row">
        {itemsToShow.map((movie) => (
          <div className="carousel" key={movie.id}>
            <div className="poster-card">
              <img src={getImgMovie(movie)} alt={movie.title} className="poster-img" />
              <div className="poster-title">{movie.title}</div>
            </div>
            <div className="carousel-content">
              <div className="carousel-button-actions">
                <button type="button" onClick={() => navigate(`/${movie.id}`)}><Info size={15} /></button>
                <button type="button" onClick={() => dispatch(toggleListMovie(movie))} className={isInWishlist(movie) ? "wishlist active" : "wishlist"}><Heart size={15} fill={isInWishlist(movie) ? "currentColor" : "none"}/></button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ChevronRight size={22} className="arrow arrow-right" onClick={nextSlide} />
    </div>
  );
};