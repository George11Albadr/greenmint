import React, { useState } from 'react';
import axios from 'axios';

function Menu() {
    const [meals, setMeals] = useState([]);

    const fetchRandomMeals = async () => {
        const apiUrl = 'https://themealdb.p.rapidapi.com/randomselection.php';

        try {
            console.log('Buscando una selección aleatoria de comidas');

            const response = await axios.get(apiUrl, {
                headers: {
                    'X-RapidAPI-Key': '5b3cf7f271mshb9dda7e5179c4f6p12f7c6jsn75247d38fbfc',
                    'X-RapidAPI-Host': 'themealdb.p.rapidapi.com'
                }
            });

            console.log('Comidas:', response.data.meals);
            setMeals(response.data.meals);
        } catch (error) {
            console.error("Error fetching random meals", error);
        }
    };

    return (
        <div>
            <h2>Selección de opciones de Platillos</h2>
            <button onClick={fetchRandomMeals}>Cargar Comidas</button>
            <div>
                {meals.map(meal => (
                    <p key={meal.idMeal}>{meal.strMeal}</p>
                ))}
            </div>
        </div>
    );
}

export default Menu;