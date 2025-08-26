import React from "react";

export const Navbar = () => {
    return (
        <div className="container-header">
            <div className="logo">
                <img src="" alt="" />
            </div>
            <nav>
                <ul className="nav-menu">
                    <li className="nav-group">
                        <span className="nav-label">Movies</span>
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
                <button type="button">Wishlist</button>
            </div>
        </div>
    );
};