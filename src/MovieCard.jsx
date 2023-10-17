import React from 'react';

const MovieCard = ({ movie }) => {
    const posterUrl = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400';

    return (
        <div className={'container'}>
            <div className={'movie'}>
                <div>
                    <p>{movie.Year}</p>
                </div>
                <div>
                    <img src={posterUrl} alt={movie.Title} fallback="https://via.placeholder.com/400" />
                </div>

                <div>
                    <span>{movie.Type}</span>
                    <h3>{movie.Title}</h3>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
