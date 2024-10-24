// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import './recipe.css';

// const API_URL = 'https://api.spoonacular.com/recipes/complexSearch';
// const API_KEY = 'a1ace945d22742aba4236246f79ce278';

// function Recipe() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [recipes, setRecipes] = useState([]);
//   const [favorites, setFavorites] = useState(() => {
//     const savedFaves = localStorage.getItem('favorites');
//     return savedFaves ? JSON.parse(savedFaves) : [];
//   });
//   const [viewFavorites, setViewFavorites] = useState(false);
//   const searchInputRef = useRef(null);

//   // Fetch recipes from API based on search term
//   useEffect(() => {
//     if (searchTerm) {
//       fetchRecipes(searchTerm);
//     }
//   }, [searchTerm]);

//   const fetchRecipes = async (term) => {
//     try {
//       const response = await axios.get(`${API_URL}`, {
//         params: {
//           apiKey: API_KEY,
//           query: term,
//           number: 10
//         }
//       });
//       const updatedRecipes = response.data.results.map(recipe => ({
//         ...recipe,
//         readyInMinutes: generateRandomTime(),
//         servings: generateRandomServings()
//       }));
//       setRecipes(updatedRecipes);
//     } catch (error) {
//       console.error('Error fetching recipes:', error);
//     }
//   };

//   // Focus on search input on load
//   useEffect(() => {
//     searchInputRef.current.focus();
//   }, []);

//   // Handle adding a recipe to favorites
//   const addToFavorites = (recipe) => {
//     if (!favorites.some((fav) => fav.id === recipe.id)) {
//       const updatedFavorites = [...favorites, recipe];
//       setFavorites(updatedFavorites);
//       localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
//     }
//   };

//   // Handle removing a recipe from favorites
//   const removeFromFavorites = (id) => {
//     const updatedFavorites = favorites.filter((recipe) => recipe.id !== id);
//     setFavorites(updatedFavorites);
//     localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
//   };

//   // Generate random ready-in time and servings
//   const generateRandomTime = () => {
//     const times = [30, 45, 60, 75, 90]; // in minutes
//     return times[Math.floor(Math.random() * times.length)];
//   };

//   const generateRandomServings = () => {
//     const servings = [2, 4, 6, 8]; // number of servings
//     return servings[Math.floor(Math.random() * servings.length)];
//   };

//   return (
//     <div className="app-container">
//       <header className="app-header">
//         <h1>Recipe Finder</h1>
//         <div className="header-right">
//           <input
//             ref={searchInputRef}
//             type="text"
//             className="search-bar"
//             placeholder="Search recipes by ingredients..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <button className="view-faves-btn" onClick={() => setViewFavorites(!viewFavorites)}>
//             {viewFavorites ? 'Back to Recipes' : 'My Faves'}
//           </button>
//         </div>
//       </header>

//       <div className="recipe-grid">
//         {viewFavorites ? (
//           favorites.length > 0 ? (
//             favorites.map((recipe, index) => (
//               <div key={index} className="recipe-card">
//                 <img src={recipe.image} alt={recipe.title} className="recipe-image" />
//                 <h3 className="recipe-title">{recipe.title}</h3>
//                 <button className="remove-fav-btn" onClick={() => removeFromFavorites(recipe.id)}>
//                   Remove from Favorites
//                 </button>
//                 <div className="recipe-details">
//                   <p><strong>Ready in:</strong> {recipe.readyInMinutes} mins</p>
//                   <p><strong>Servings:</strong> {recipe.servings}</p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No favorites yet! Add some recipes to favorites.</p>
//           )
//         ) : (
//           recipes.length > 0 ? (
//             recipes.map((recipe, index) => (
//               <div key={index} className="recipe-card">
//                 <img src={recipe.image} alt={recipe.title} className="recipe-image" />
//                 <h3 className="recipe-title">{recipe.title}</h3>
//                 <button className="add-fav-btn" onClick={() => addToFavorites(recipe)}>
//                   Add to Favorites
//                 </button>
//                 <div className="recipe-details">
//                   <p><strong>Ready in:</strong> {recipe.readyInMinutes} mins</p>
//                   <p><strong>Servings:</strong> {recipe.servings}</p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No recipes found. Try searching for something else.</p>
//           )
//         )}
//       </div>

//       <footer className="app-footer">
//         <p>Powered by Recipe Finder | © 2024 All rights reserved</p>
//       </footer>
//     </div>
//   );
// }

// export default Recipe;
























// import React, { useState, useEffect, useRef } from 'react'; // Import necessary hooks from React
// import axios from 'axios';
// import './recipe.css';

// // API constants
// const API_URL = 'https://api.spoonacular.com/recipes/complexSearch';
// const API_KEY = 'a1ace945d22742aba4236246f79ce278';

// // Custom hook for fetching recipes
// const useFetchRecipes = (searchTerm) => {
//   const [recipes, setRecipes] = useState([]);

//   useEffect(() => {
//     // Fetch recipes only if a search term is provided
//     if (searchTerm) {
//       const fetchRecipes = async () => {
//         try {
//           const response = await axios.get(`${API_URL}`, {
//             params: {
//               apiKey: API_KEY,
//               query: searchTerm,
//               number: 10,
//             },
//           });
//           const updatedRecipes = response.data.results.map((recipe) => ({
//             ...recipe,
//             readyInMinutes: generateRandomTime(),
//             servings: generateRandomServings(),
//           }));
//           setRecipes(updatedRecipes);
//         } catch (error) {
//           console.error('Error fetching recipes:', error);
//         }
//       };
//       fetchRecipes();
//     }
//   }, [searchTerm]); // Effect runs whenever searchTerm changes

//   return recipes; // Return the fetched recipes
// };

// function Recipe() {
//   const [searchTerm, setSearchTerm] = useState(''); // useState for storing search term input
//   const [favorites, setFavorites] = useState(() => {
//     const savedFaves = localStorage.getItem('favorites');
//     return savedFaves ? JSON.parse(savedFaves) : [];
//   }); // useState for storing favorites

//   const [viewFavorites, setViewFavorites] = useState(false); // useState to toggle between recipes and favorites view
//   const searchInputRef = useRef(null); // useRef to manage input focus

//   const recipes = useFetchRecipes(searchTerm); // Using the custom hook to fetch recipes

//   // Focus on search input when the component mounts (first render)
//   useEffect(() => {
//     searchInputRef.current.focus();
//   }, []); // Empty dependency array ensures this effect runs only once

//   // Handle adding a recipe to favorites
//   const addToFavorites = (recipe) => {
//     if (!favorites.some((fav) => fav.id === recipe.id)) {
//       const updatedFavorites = [...favorites, recipe];
//       setFavorites(updatedFavorites);
//       localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
//     }
//   };

//   // Handle removing a recipe from favorites
//   const removeFromFavorites = (id) => {
//     const updatedFavorites = favorites.filter((recipe) => recipe.id !== id);
//     setFavorites(updatedFavorites);
//     localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
//   };

//   // Generate random ready-in time and servings (utility functions)
//   const generateRandomTime = () => {
//     const times = [30, 45, 60, 75, 90]; // in minutes
//     return times[Math.floor(Math.random() * times.length)];
//   };

//   const generateRandomServings = () => {
//     const servings = [2, 4, 6, 8]; // number of servings
//     return servings[Math.floor(Math.random() * servings.length)];
//   };

//   return (
//     <div className="app-container">
//       <header className="app-header">
//         <h1>Recipe Finder</h1>
//         <div className="header-right">
//           <input
//             ref={searchInputRef} // Using useRef to set focus on this input element
//             type="text"
//             className="search-bar"
//             placeholder="Search recipes by ingredients..."
//             value={searchTerm} // Controlled input with useState
//             onChange={(e) => setSearchTerm(e.target.value)} // Updating searchTerm with useState
//           />
//           <button className="view-faves-btn" onClick={() => setViewFavorites(!viewFavorites)}>
//             {viewFavorites ? 'Back to Recipes' : 'My Faves'}
//           </button>
//         </div>
//       </header>

//       <div className="recipe-grid">
//         {viewFavorites ? (
//           favorites.length > 0 ? (
//             favorites.map((recipe, index) => (
//               <div key={index} className="recipe-card">
//                 <img src={recipe.image} alt={recipe.title} className="recipe-image" />
//                 <h3 className="recipe-title">{recipe.title}</h3>
//                 <button className="remove-fav-btn" onClick={() => removeFromFavorites(recipe.id)}>
//                   Remove from Favorites
//                 </button>
//                 <div className="recipe-details">
//                   <p><strong>Ready in:</strong> {recipe.readyInMinutes} mins</p>
//                   <p><strong>Servings:</strong> {recipe.servings}</p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No favorites yet! Add some recipes to favorites.</p>
//           )
//         ) : (
//           recipes.length > 0 ? (
//             recipes.map((recipe, index) => (
//               <div key={index} className="recipe-card">
//                 <img src={recipe.image} alt={recipe.title} className="recipe-image" />
//                 <h3 className="recipe-title">{recipe.title}</h3>
//                 <button className="add-fav-btn" onClick={() => addToFavorites(recipe)}>
//                   Add to Favorites
//                 </button>
//                 <div className="recipe-details">
//                   <p><strong>Ready in:</strong> {recipe.readyInMinutes} mins</p>
//                   <p><strong>Servings:</strong> {recipe.servings}</p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No recipes found. Try searching for something else.</p>
//           )
//         )}
//       </div>

//       <footer className="app-footer">
//         <p>Powered by Recipe Finder | © 2024 All rights reserved</p>
//       </footer>
//     </div>
//   );
// }

// export default Recipe;





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
        <p>Recipe Finder by Sirri Ayongwa | © 2024 All rights reserved</p>
      </footer>
    </div>
  );
}

export default Recipe;
