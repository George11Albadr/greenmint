document.addEventListener("DOMContentLoaded", function() {

    const loadMealsButton = document.getElementById("loadMealsButton");
    loadMealsButton.addEventListener("click", loadMeals);

    function loadMeals() {
        const resultsContainer = document.getElementById('meal-results');

        const apiUrl = "https://themealdb.p.rapidapi.com/latest.php"; // Cambiado a la URL de ejemplo que diste
        const headers = {
            "X-RapidAPI-Key": "5b3cf7f271mshb9dda7e5179c4f6p12f7c6jsn75247d38fbfc",
            "X-RapidAPI-Host": "themealdb.p.rapidapi.com"
        };

        fetch(apiUrl, {
            method: "GET",
            headers: headers
        })
            .then(response => response.json())
            .then(data => {
                let output = '<h3>Comidas:</h3>';
                if(data && data.meals && data.meals.length) {
                    data.meals.slice(0, 10).forEach(meal => {
                        output += `<p>${meal.strMeal}</p>`;
                    });
                } else {
                    output += '<p>No se encontraron comidas</p>';
                }
                resultsContainer.innerHTML = output;
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                resultsContainer.innerHTML = '<p>Ocurrió un error al cargar las comidas</p>';
            });
    }
});
