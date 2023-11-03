import React, { useState } from 'react';
import axios from 'axios';
import './Meal.css';

function Meal() {
    const [mealId, setMealId] = useState('');
    const [mealDetails, setMealDetails] = useState(null);
    const [translatedInstructions, setTranslatedInstructions] = useState(null);

    const fetchMealById = async () => {
        const apiUrl = `https://themealdb.p.rapidapi.com/lookup.php?i=${mealId}`;

        try {
            const response = await axios.get(apiUrl, {
                headers: {
                    'X-RapidAPI-Key': '5b3cf7f271mshb9dda7e5179c4f6p12f7c6jsn75247d38fbfc',
                    'X-RapidAPI-Host': 'themealdb.p.rapidapi.com'
                }
            });

            setMealDetails(response.data.meals[0]);
        } catch (error) {
            console.error("Error fetching meal details", error);
        }
    };

    const translateInstructions = async () => {
        const encodedParams = new URLSearchParams();
        encodedParams.set('q', mealDetails.strInstructions);
        encodedParams.set('target', 'es');
        encodedParams.set('source', 'en');

        const options = {
            method: 'POST',
            url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': '5b3cf7f271mshb9dda7e5179c4f6p12f7c6jsn75247d38fbfc',
                'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
            },
            data: encodedParams,
        };

        try {
            const response = await axios.request(options);
            setTranslatedInstructions(response.data.data.translations[0].translatedText);
        } catch (error) {
            console.error("Error translating instructions", error);
        }
    };

    return (
        <div>
            <h2>Detalles de la Comida</h2>
            <input
                value={mealId}
                onChange={(e) => setMealId(e.target.value)}
                placeholder="Introduce el ID de la comida"
            />
            <button onClick={fetchMealById}>Buscar</button>
            {mealDetails && (
                <div>
                    <h3>{mealDetails.strMeal}</h3>
                    <img src={mealDetails.strMealThumb} alt={mealDetails.strMeal} />
                    <p>{translatedInstructions || mealDetails.strInstructions}</p>
                    <button onClick={translateInstructions}>Traducir</button>
                </div>
            )}
        </div>
    );
}

export default Meal;