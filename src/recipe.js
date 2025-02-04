import React, { useState, useEffect, useRef } from 'react'; // Import necessary hooks from React
import axios from 'axios';
import './recipe.css';

const API_URL = 'https://api.spoonacular.com/recipes/complexSearch';
const API_KEY = 'a1ace945d22742aba4236246f79ce278';

// Custom hook for fetching recipes
const useFetchRecipes = (searchTerm) => {
  const [recipes, setRecipes] = useState([]);

  const generateRandomTime = () => {
    const times = [30, 45, 60, 75, 90]; 
    return times[Math.floor(Math.random() * times.length)];
  };

  const generateRandomServings = () => {
    const servings = [2, 4, 6, 8]; 
    return servings[Math.floor(Math.random() * servings.length)];
  };

  useEffect(() => {
    if (searchTerm) {
      const fetchRecipes = async () => {
        try {
          const response = await axios.get(`${API_URL}`, {
            params: {
              apiKey: API_KEY,
              query: searchTerm,
              number: 10,
            },
          });
          const updatedRecipes = response.data.results.map((recipe) => ({
            ...recipe,
            readyInMinutes: generateRandomTime(),
            servings: generateRandomServings(),
          }));
          setRecipes(updatedRecipes);
        } catch (error) {
          console.error('Error fetching recipes:', error);
        }
      };
      fetchRecipes();
    }
  }, [searchTerm]);

  return recipes; 
};

function Recipe() {
  const [searchTerm, setSearchTerm] = useState(''); // useState for storing search term input
  const [favorites, setFavorites] = useState(() => {
    const savedFaves = localStorage.getItem('favorites');
    return savedFaves ? JSON.parse(savedFaves) : [];
  }); // useState for storing favorites

  const [viewFavorites, setViewFavorites] = useState(false); // useState to toggle between recipes and favorites view
  const searchInputRef = useRef(null); // useRef to manage input focus

  const recipes = useFetchRecipes(searchTerm); // Using the custom hook to fetch recipes

  
  useEffect(() => {
    searchInputRef.current.focus();
  }, []); 

  
  const addToFavorites = (recipe) => {
    if (!favorites.some((fav) => fav.id === recipe.id)) {
      const updatedFavorites = [...favorites, recipe];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  
  const removeFromFavorites = (id) => {
    const updatedFavorites = favorites.filter((recipe) => recipe.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };


  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Recipe Finder</h1>
        <div className="header-right">
          <input
            ref={searchInputRef} // Using useRef to set focus on this input element
            type="text"
            className="search-bar"
            placeholder="Search recipes by ingredients..."
            value={searchTerm} // Controlled input with useState
            onChange={(e) => setSearchTerm(e.target.value)} // Updating searchTerm with useState
          />
          <button className="view-faves-btn" onClick={() => setViewFavorites(!viewFavorites)}>
            {viewFavorites ? 'Back to Recipes' : 'My Faves'}
          </button>
        </div>
      </header>

      <div className="recipe-grid">
        {viewFavorites ? (
          favorites.length > 0 ? (
            favorites.map((recipe, index) => (
              <div key={index} className="recipe-card">
                <img src={recipe.image} alt={recipe.title} className="recipe-image" />
                <h3 className="recipe-title">{recipe.title}</h3>
                <button className="remove-fav-btn" onClick={() => removeFromFavorites(recipe.id)}>
                  Remove from Favorites
                </button>
                <div className="recipe-details">
                  <p><strong>Ready in:</strong> {recipe.readyInMinutes} mins</p>
                  <p><strong>Servings:</strong> {recipe.servings}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No favorites yet! Add some recipes to favorites.</p>
          )
        ) : (
          recipes.length > 0 ? (
            recipes.map((recipe, index) => (
              <div key={index} className="recipe-card">
                <img src={recipe.image} alt={recipe.title} className="recipe-image" />
                <h3 className="recipe-title">{recipe.title}</h3>
                <button className="add-fav-btn" onClick={() => addToFavorites(recipe)}>
                  Add to Favorites
                </button>
                <div className="recipe-details">
                  <p><strong>Ready in:</strong> {recipe.readyInMinutes} mins</p>
                  <p><strong>Servings:</strong> {recipe.servings}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No recipes found. Try searching for something else.</p>
          )
        )}
      </div>

      <footer className="app-footer">
        <p>Recipe Finder by <a href='https://www.linkedin.com/in/sirriayongwa/' target='blank'>Sirri Ayongwa</a> | © 2024 All rights reserved</p>
      </footer>
    </div>
  );
}

export default Recipe;
