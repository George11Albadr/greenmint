import React, { useState, useEffect } from 'react';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';
import Navbar from './Navbar';
import './App.css';

const API_URL = 'http://www.omdbapi.com?apikey=b0f0728c';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`)
        const data = await response.json();

        setMovies(data.Search);
    };

    useEffect(() => {
        searchMovies('Any');
    }, []);

    if (movies?.length > 0) {
        return (
            <div className={'app'}>
                <Navbar />

                <h1>PopcornTime</h1>

                <div className={'search'}>
                    <input
                        placeholder={'Look out for movies...'}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <img
                        src={SearchIcon}
                        alt='search'
                        onClick={() => searchMovies(searchTerm)}
                    />
                </div>
                {
                    <div className={'container'}>
                        {movies.map((movie) => (
                            <MovieCard movie={movie}/>
                        ))}
                    </div>
                }
            </div>
        );
    } else {
        return (
            <div className={'app'}>
                <Navbar />

                <h1>PopcornTime</h1>

                <div className={'search'}>
                    <input
                        placeholder={'Look out for movies...'}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <img
                        src={SearchIcon}
                        alt='search'
                        onClick={() => searchMovies(searchTerm)}
                    />
                </div>

                {
                    <div className={'empty'}>
                        <h2>No Movies Found</h2>
                    </div>
                }
            </div>
        );
    }
};

export default App;
