# App Description:
A recipe search application built with React, Axios, and Spoonacular API. Demonstrates the use of React hooks including useState, useEffect, useRef, and custom hooks. Features search, add-to-favorites, and local storage for recipe management.

# How To Get Started With ReactJs on Vs Code?
- Download Node JS
- Run npx create-react-app my-app or npm init react-app my-app or yarn create react-app my-app to create your react app.
- Run cd my-app
- Run npm start

# Overview Of What I Built:
Recipe Finder is a recipe search application built using React and integrates the Spoonacular API to fetch recipes based on user input. This project highlights the use of various React hooks (useState, useEffect, useRef), custom hooks, and local storage to create an interactive and user-friendly experience. Users can search for recipes, view details, and save favorites which persist across sessions using local storage.

# Features:
- Search for recipes based on ingredients or keywords
- View recipe details such as ready-in time and servings
- Save and manage favorite recipes using local storage
- Responsive design for both desktop and mobile
- Easy integration with the Spoonacular API

# API Integration:
This project uses the Spoonacular API to search for recipes. When a user types a search term, the app sends a request to Spoonacular’s complexSearch endpoint. The results include recipe titles, images, and IDs. 

# React Hooks Used:
This project showcases various React hooks to manage state, handle side effects, and interact with the DOM.
- useState: The useState hook is used to manage several states in the app, including:
  - searchTerm: Holds the current search term entered by the user.
  - recipes: Stores the array of recipe results fetched from the API.
  - favorites: Stores an array of the user's favorite recipes, which are also saved to local storage.
  - viewFavorites: Boolean state to toggle between viewing search results and favorite recipes.
- useEffect: The useEffect hook is utilized to perform side effects in the app. Specifically:
  - Fetching recipes when the search term changes.
  - Focusing on the search input field when the app loads.
- useRef: The useRef hook is used to reference the search input field so we can automatically focus on it when the app loads.
- Custom Hooks:
While this app does not currently use custom hooks, they can be easily implemented to handle repetitive tasks, such as fetching data or managing local storage interactions.


Contributions are welcome! If you'd like to contribute, please fork the repository and submit a pull request with your proposed changes.
THANK YOU
