import React, { useEffect, useState } from 'react';
import './App.css';

const API_KEY = 'e19e03487d104aa5813d4a625cd56c81';

export default function App() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    if (search.trim()) {
      fetchRecipes();
    }
  }, [search]);

  const fetchRecipes = async () => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${search}&number=12&addRecipeInformation=true&apiKey=${API_KEY}`
      );
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const viewRecipe = async (id) => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${API_KEY}`
      );
      const data = await response.json();
      setSelectedRecipe(data);
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    }
  };

  const closeModal = () => {
    setSelectedRecipe(null);
  };

  const toggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const addToFavorites = (recipe) => {
    if (!favorites.some(r => r.id === recipe.id)) {
      setFavorites([...favorites, recipe]);
    }
    closeModal();
  };

  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter(r => r.id !== id));
  };

  return (
    <div className="container">
      <div className="bg-element"></div>
      <div className="bg-element"></div>
      <div className="bg-element"></div>

      <header className="header">
        <div className="logo">🍳 Recipe Finder</div>
        <button className="faves-btn" onClick={toggleFavorites}>
          <span>❤️</span> My Favorites
        </button>
      </header>

      <main className="main-content">
        <h1 className="hero-title">Discover Amazing Recipes</h1>
        <p className="hero-subtitle">
          Find the perfect dish by searching ingredients, cuisine types, or dietary preferences
        </p>

        <div className="search-container">
          <div className="search-wrapper">
            <input
              type="text"
              className="search-input"
              placeholder="Search recipes by ingredients, cuisine, or name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && fetchRecipes()}
            />
            <button className="search-btn" onClick={fetchRecipes}>
              🔍
            </button>
          </div>
        </div>

        <div className="results-section">
          {results.length === 0 ? (
            <div className="no-results">
              {search ? `No recipes found for "${search}". Try a different search term!` :
                'Search something delicious!'}
            </div>
          ) : (
            <div className="results-grid">
              {results.map(recipe => (
                <div key={recipe.id} className="recipe-card" onClick={() => viewRecipe(recipe.id)}>
                  <div className="recipe-image">
                    <img src={recipe.image} alt={recipe.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div className="recipe-content">
                    <h3 className="recipe-title">{recipe.title}</h3>
                    <div className="recipe-meta">
                      <span>⏱️ {recipe.readyInMinutes} min</span>
                      <span>🍽️ {recipe.servings} servings</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Favorites Sidebar */}
      {showFavorites && (
  <div className="favorites-sidebar">
    <div className="sidebar-header">
      <h3>My Favorites</h3>
      <button className="close-sidebar-btn" onClick={toggleFavorites}>❌</button>
    </div>
    {favorites.length === 0 ? (
      <p className="empty-favs-msg">Nothing in favorites. Search a recipe and add now!</p>
    ) : (
      <ul className="favorites-list">
        {favorites.map((fav) => (
          <li key={fav.id} className="fav-item">
            <img src={fav.image} alt={fav.title} className="fav-thumb" />
            <span className="fav-title">{fav.title}</span>
            <button className="delete-icon" onClick={() => removeFromFavorites(fav.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    )}
  </div>
)}


      {/* Modal */}
      {selectedRecipe && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedRecipe.title}</h2>
            <img src={selectedRecipe.image} alt={selectedRecipe.title} style={{ width: '100%', borderRadius: '8px' }} />
            <p><strong>Preparation time:</strong> {selectedRecipe.readyInMinutes} mins</p>
            <p>{(selectedRecipe.readyInMinutes <= 20 ? 'Easy' : selectedRecipe.readyInMinutes <= 40 ? 'Medium' : 'Hard')}</p>
            <h3>Instructions</h3>
            <p dangerouslySetInnerHTML={{ __html: selectedRecipe.instructions || "No instructions available." }} />
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
              <button onClick={() => addToFavorites(selectedRecipe)}>❤️ Add to Favorites</button>
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}

      <footer className="footer">
        <p>
          &copy; 2024 Recipe Finder by
          <a href='https://www.linkedin.com/in/sirri-ayongwa/' target='_blank' rel="noreferrer"> Sirri Ayongwa</a>
          {' '}| Made with ❤️ for foodies
        </p>
      </footer>
    </div>
  );
}
