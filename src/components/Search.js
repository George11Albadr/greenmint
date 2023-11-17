import React, { useState } from 'react';
import axios from 'axios';
import CategorySearch from './CategorySearch';
import './Search.css'

function Search() {
    const [term, setTerm] = useState(''); // Término de búsqueda
    const [meals, setMeals] = useState([]); // Resultados de la búsqueda

    const fetchMealsByTerm = async () => {
        const apiUrl = `https://themealdb.p.rapidapi.com/search.php?s=${term}`;

        try {
            console.log('Buscando comidas con término:', term);

            const response = await axios.get(apiUrl, {
                headers: {
                    'X-RapidAPI-Key': '5b3cf7f271mshb9dda7e5179c4f6p12f7c6jsn75247d38fbfc',
                    'X-RapidAPI-Host': 'themealdb.p.rapidapi.com'
                }
            });

            console.log('Resultados:', response.data.meals);
            setMeals(response.data.meals || []); // Si no hay resultados, usar un array vacío
        } catch (error) {
            console.error("Error fetching meals", error);
        }
    };

    return (
        <div>
            <h2>Buscar Comidas</h2>
            <input
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Introduce el nombre de la comida"
            />
            <button onClick={fetchMealsByTerm}>Buscar</button>
            <div>
                {meals.map(meal => (
                    <div key={meal.idMeal} className="meal-container">
                        <img src={meal.strMealThumb} alt={meal.strMeal} />
                        <div className="meal-text">
                            <p>{meal.strMeal}</p>
                            <span className="meal-id">ID: {meal.idMeal}</span>
                        </div>
                    </div>
                ))}
            </div>
            <CategorySearch/>
        </div>
    );
}

export default Search;
