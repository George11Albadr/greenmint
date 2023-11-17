import React, { useState } from 'react';
import axios from 'axios';

function CategorySearch() {
    const [category, setCategory] = useState('');
    const [categoryMeals, setCategoryMeals] = useState([]);

    const fetchMealsByCategory = async () => {
        const apiUrl = `https://themealdb.p.rapidapi.com/filter.php?c=${category}`;

        try {
            const response = await axios.get(apiUrl, {
                headers: {
                    'X-RapidAPI-Key': '5b3cf7f271mshb9dda7e5179c4f6p12f7c6jsn75247d38fbfc',
                    'X-RapidAPI-Host': 'themealdb.p.rapidapi.com'
                }
            });

            const meals = response.data.meals || [];
            setCategoryMeals(meals);

            // Loggear cada comida y todos sus atributos en la consola
            meals.forEach(meal => {
                console.log(meal);
            });

        } catch (error) {
            console.error("Error fetching meals by category", error);
        }
    };

    return (
        <div>
            <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Introduce una categoría (ej. Seafood)"
            />
            <button onClick={fetchMealsByCategory}>Buscar por categoría</button>
            <div>
                {categoryMeals.map(meal => (
                    <div key={meal.idMeal} className="meal-container">
                        <p className="meal-text">
                            <strong>{meal.strMeal}</strong>
                            <span className="meal-id">{meal.idMeal}</span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategorySearch;