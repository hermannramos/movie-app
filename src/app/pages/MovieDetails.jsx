import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleListMovie } from "../features/moviesSlice.js";
import {  useParams } from "react-router-dom";
import { fetchMovieDetails, fetchMovieCredits } from "../features/moviesThunks.js";
import "../../styles/movie-details.scss";

const MovieDetails = () => {
    const dispatch = useDispatch();
    const { movieId } = useParams();

    const movie = useSelector((state) => state.movies.movieDetails);
    const credits = useSelector((state) => state.movies.movieCredits);

    
    useEffect(() => {
        dispatch(fetchMovieDetails(movieId))
        dispatch(fetchMovieCredits(movieId))
    }, [dispatch, movieId]);
    
    if(!movie) return null;
    
    const castList = Array.isArray(credits?.cast) ? credits.cast.slice(0, 10) : [];
    const genres = Array.isArray(movie.genres) ? movie.genres.slice(0, 3).map(g => g.name).join (", ") : "";
    const director = credits?.crew?.find((c) => c.job === "Director");
    const producer = credits?.crew?.find((c) => c.job === "Producer");

    return (
        <div className="movie-container">
            <div className="movie-details" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})` }}>
                <div className="poster-image">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                </div>
                <div className="movie-info">
                    <div className="movie-content">
                        <div className="movie-header">
                            <h1>{movie.title}</h1>
                            <div className="extra-data">
                                <h4>{movie.release_date}</h4>
                                <h4>{movie.runtime} min</h4>
                                <h4>{genres}</h4>
                            </div>
                        </div>
                        <div className="movie-overview">
                            <h2>Sinopsis</h2>
                            <p>{movie.overview}</p>
                            <div className="movie-creators">
                                <div className="director">
                                    <p>{director?.name || ""}</p>
                                    <h4>Director</h4>
                                </div>
                                <div className="producer">
                                    <p>{producer?.name || ""}</p>
                                    <h4>Productor</h4>
                                </div>
                            </div>
                        </div>
                        <div className="details-button-actions">
                            <button type="button" onClick={() => dispatch(toggleListMovie(movie))}>Add to Wishlist</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="extra-movie-info">
                <div className="actors-gallery">
                    {castList.map((actor) => (
                        <div className="actor-card" key={actor.cast_id}>
                            <img src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`} alt={actor.name} />
                            <div className="actor-info">
                                <h5>{actor.name}</h5>
                                <p>{actor.character}</p>
                            </div>
                        </div>
                    ))}
                </div>
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