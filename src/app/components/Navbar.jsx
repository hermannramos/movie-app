import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { removeFromList } from "../features/moviesSlice.js";
import "../../styles/navbar.scss";
import { useDispatch, useSelector } from "react-redux";

function getMovieImg(path){
    return `https://image.tmdb.org/t/p/w92${path}`;
};

export const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const wishListMovies = useSelector((state) => state.movies.wishList);

    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [wishListOpen, setWishListOpen] = useState(false);

    useEffect(() => {
        if(searchQuery.trim().length < 2){
            setSearchResults([]);
            return;
        }
        const debounceTimerId = setTimeout(async() => {
            try{
                const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
                if (!response.ok) return;
                const data = await response.json();
                setSearchResults(Array.isArray(data.results) ? data.results : []);
            } catch {
                setSearchResults([]);
            }
        }, 300);
        return () => clearTimeout(debounceTimerId);
    }, [searchQuery]);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSelect = (movieId) => {
        setSearchQuery("");
        setSearchResults([]);
        navigate(`/${movieId}`);
        setWishListOpen(false);
    };


    return (
        <div className="container-header">
            <div className="logo">
                <img src="" alt="" />
            </div>
            <nav>
                <ul className="nav-menu">
                    <li className="nav-group">
                        <span className="nav-label" tabIndex={0}>Movies</span>
                        <ul className="nav-sublist">
                            <li>Popular</li>
                            <li>Top Rated</li>
                            <li>Upcoming</li>
                        </ul>
                    </li>
                    <li className="nav-group">
                        <span className="nav-label">TV Series</span>
                        <ul className="nav-sublist">
                            <li>On The Air</li>
                            <li>Popular</li>
                            <li>Top Rated</li>
                        </ul>
                    </li>
                </ul>
            </nav>
            <div className="header-actions">
                <div className="search-box">
                    <input type="text" className="search-input" placeholder="Buscar película..."  value={searchQuery} onChange={handleSearch}/>
                    {searchQuery && searchResults.length > 0 && (
                        <div className="search-dropdown">
                            {searchResults.map((movie) => (
                                <button type="button" key={movie.id} className="search-item" onClick={() => handleSelect(movie.id)}>
                                    <img src={getMovieImg(movie.poster_path)} alt={movie.title} />
                                    <div className="search-item-texts">
                                        <span className="search-title">{movie.title}</span>
                                        <span className="search-year">{movie.release_date}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                <div className="wishlist-box">
                    <button type="button" onClick={() => setWishListOpen((v) => !v)} className="wishlist-button">Wishlist ({wishListMovies.length})</button>
                    {wishListOpen && wishListMovies.length > 0 && (
                        <div className="wishlist-dropdown">
                            {wishListMovies.map((movie) => (
                                <div className="wishlist-item" key={movie.id}>
                                    <button type="button" className="wishlist-thumb" onClick={() => handleSelect(movie.id)}>
                                        <img src={getMovieImg(movie.poster_path)} alt={movie.title} />
                                    </button>
                                    <div className="wishlist-texts" onClick={() => handleSelect(movie.id)}>
                                        <span className="wishlist-title">{movie.title}</span>
                                        <span className="wishlist-year">{movie.release_date}</span>
                                    </div>
                                    <button type="button" onClick={() => dispatch(removeFromList(movie.id))}>X</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};