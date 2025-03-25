const apiURL = 'https://dummyjson.com/recipes';
const searchInput = document.getElementById('searchInput');
const recipesContainer = document.getElementById('recipesContainer');
let recipes = [];

fetch(apiURL)
    .then(response => response.json())
    .then(data => {
        recipes = data.recipes; 
        displayRecipes(recipes);
    })
    .catch(error => console.error("შეცდომა API-დან მონაცემების მიღებისას:", error));

function displayRecipes(recipesList) {
    recipesContainer.innerHTML = ''; 
    recipesList.forEach(recipe => {
        const recipeElement = document.createElement('div');
        recipeElement.classList.add('recipe');
        recipeElement.innerHTML = `
            <h3>${recipe.name}</h3>
            <p><strong>ინგრედიენტები:</strong> ${recipe.ingredients.join(', ')}</p>
            <img src="${recipe.image}" alt="${recipe.name}" width="200">
        `;
        recipesContainer.appendChild(recipeElement);
    });
}

searchInput.addEventListener('keyup', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredRecipes = recipes.filter(recipe => 
        recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchTerm))
    );
    displayRecipes(filteredRecipes);
});
