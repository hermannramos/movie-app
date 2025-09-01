import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useParams } from "react-router-dom";
import { fetchMovieDetails } from "../features/moviesThunks.js";
import "../../styles/movie-details.scss";

const MovieDetails = () => {
    const dispatch = useDispatch();
    const { movieId } = useParams();

    const movie = useSelector((state) => state.movies.movieDetails);

    useEffect(() => {
        dispatch(fetchMovieDetails(movieId))
    }, [dispatch, movieId]);
    
    if(!movie) return null;

    return (
        <div className="movie-container">
            <div className="movie-details">
                <div className="poster-image">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                </div>
                <div className="movie-info">
                    <div className="movie-content">
                        <h1>{movie.title}</h1>
                        <p>{movie.overview}</p>
                    </div>
                    <div className="button-actions">
                        <button type="button">Add to Wishlist</button>
                    </div>
                </div>
            </div>
            <div className="extra-movie-info">
                <div className="actors-gallery"></div>
                <div className="movie-sidebar">
                    <div className="extra-details">
                        <h4>Título original</h4>
                        <p>{movie.original_title}</p>
                    </div>
                    <div className="extra-details">
                        <h4>Presupuesto</h4>
                        <p>${movie.budget}</p>
                    </div>
                    <div className="extra-details">
                        <h4>Idioma Original</h4>
                        <p>{movie.original_language}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;