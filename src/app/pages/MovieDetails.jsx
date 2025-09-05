import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleListMovie } from "../features/moviesSlice.js";
import { useParams } from "react-router-dom";
import { fetchMovieDetails, fetchMovieCredits } from "../features/moviesThunks.js";
import { Star } from "lucide-react";
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

    const rating = Math.round((movie.vote_average || 0) * 10) / 10;
    const budgetUSD = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
    }).format(movie.budget || 0);
    const language = (movie.original_language || "").toUpperCase();

    return (
        <div className="movie-container">
            <div className="movie-details" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})` }}>
                <div className="poster-image">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                </div>
                <div className="movie-info">
                    <div className="movie-content">
                        <div className="movie-header">
                            <div className="rating-badge">
                                <Star size={16} fill="#FFD700" stroke="#FFD700" />
                                <span>{rating}</span>
                            </div>
                            <h1>{movie.title}</h1>
                            <div className="extra-data">
                                <span className="meta-pill">{movie.release_date}</span>
                                <span className="meta-sep">•</span>
                                <span className="meta-pill">{movie.runtime} min</span>
                                {genres && (
                                <>
                                    <span className="meta-sep">•</span>
                                    <span className="meta-pill">{genres}</span>
                                </>
                                )}
                            </div>
                        </div>
                        <div className="movie-overview">
                            <h2>Sinopsis</h2>
                            <p>{movie.overview}</p>
                            <div className="movie-creators">
                                <div className="director">
                                    <h4>Director</h4>
                                    <p>{director?.name || ""}</p>
                                </div>
                                <div className="producer">
                                    <h4>Productor</h4>
                                    <p>{producer?.name || ""}</p>
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
                        <p>{budgetUSD}</p>
                    </div>
                    <div className="extra-details">
                        <h4>Idioma Original</h4>
                        <p>{language}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;