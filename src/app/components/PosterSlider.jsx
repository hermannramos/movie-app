import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Heart, Info } from "lucide-react";
import "../../styles/poster-carousel.scss";

function getImgMovie(movie) {
  return `https://image.tmdb.org/t/p/w342${movie.poster_path}`;
}

export const PosterSlider = ({ movies }) => {
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

  return (
    <div className="poster-slider">
        <h2>Popular Movies</h2>
      <ChevronLeft size={22} className="arrow arrow-left" onClick={prevSlide} />
      <div className="poster-row">
        {itemsToShow.map((movie) => (
          <div className="carousel" key={movie.id}>
            <img src={getImgMovie(movie)} alt={movie.title} className="poster-carousel" />
            <div className="carousel-content">
              <h3>{movie.title}</h3>
              <div className="button-actions">
                <button type="button"><Info size={18} /></button>
                <button type="button"><Heart size={18} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ChevronRight size={22} className="arrow arrow-right" onClick={nextSlide} />
    </div>
  );
};

