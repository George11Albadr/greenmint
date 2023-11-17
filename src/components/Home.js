import React, { useState } from 'react';
import axios from 'axios';
import './Home.css';

function Home() {
    const [nutritionData, setNutritionData] = useState([]);

    const fetchNutritionData = async () => {
        try {
            const response = await axios.request({
                method: 'GET',
                url: 'https://edamam-food-and-grocery-database.p.rapidapi.com/api/food-database/v2/parser',
                params: {
                    'nutrition-type': 'cooking',
                    'category[0]': 'generic-foods',
                    'health[0]': 'alcohol-free'
                },
                headers: {
                    'X-RapidAPI-Key': '8835a57351mshe0ee50057aaacf7p1b6ac9jsned99d1b8caa2',
                    'X-RapidAPI-Host': 'edamam-food-and-grocery-database.p.rapidapi.com'
                }
            });
            console.log('Nutrition Data:', response.data);
            setNutritionData(response.data.hints.slice(0, 10));
        } catch (error) {
            console.error("Error fetching nutrition data", error);
        }
    };



    return (
        <div>
            <h1>Nutrición</h1>
            <div className='search-container'>
                {/* Remove the input field for search term */}
                <button onClick={fetchNutritionData}>Buscar</button>
            </div>
            <div id="nutrition-data-container">
                {nutritionData.length > 0 && (
                    <div>
                        <h3>Datos de Nutrición</h3>
                        <ul>
                            {nutritionData.slice(0, 10).map((data, index) => (
                                <li key={index}>
                                    <p>Categoría: {data.food.category}</p>
                                    <img src={data.food.image} alt={data.food.label} />
                                    <p>Label: {data.food.label}</p>
                                    <p>Nutrientes: ENERC_KCAL: {data.food.nutrients.ENERC_KCAL},
                                        PROCNT: {data.food.nutrients.PROCNT}, FAT: {data.food.nutrients.FAT},
                                        CHOCDF: {data.food.nutrients.CHOCDF}, FIBTG: {data.food.nutrients.FIBTG}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;
