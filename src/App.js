// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Menu from './components/Menu';  // Asegúrate de tener este import
import Search from './components/Search';
import Meal from './components/Meal';
import './App.css';

function App() {
    return (
        <Router>
            <div>
                <Header />
                <Routes>
                    <Route path="/" element={<></>}/>
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/meal" element={<Meal />} />

                </Routes>
            </div>
        </Router>
    );
}

export default App;