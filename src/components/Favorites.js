import React, { useState } from 'react';
import axios from 'axios';

function Favorites({ favorites, setFavorites, fetchWeather }) {
  const addFavorite = async (city) => {
    const newFavorite = { id: Date.now(), city };
    try {
      await axios.post('http://localhost:5000/favorites', newFavorite);
      setFavorites([...favorites, newFavorite]);
    } catch (error) {
      console.error("Error adding favorite", error);
    }
  };

  const removeFavorite = async (id) => {
    console.log('Removing favorite with id:', id);  // Debugging: Log the `id` to ensure it's correct
    try {
      // Send DELETE request to remove the favorite item from the server
      const response = await axios.delete(`http://localhost:5000/favorites/${id}`);
      console.log('Response:', response);  // Debugging: Log the response from the server

      // After successful deletion, update the state to remove the favorite from the list
      setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.id !== id));

    } catch (error) {
      console.error("Error removing favorite", error);  // Log the error in case of failure
    }
  };

  return (
    <div className="Favorites">
      <h3>Favorites</h3>
      <ul className="container1">
        {favorites.map((fav) => (
          <li key={fav.id}>
            <span onClick={() => fetchWeather(fav.city)}>{fav.city}</span>
            <button onClick={() => removeFavorite(fav.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Add favorite city"
        onKeyDown={(e) => {
          if (e.key === 'Enter') addFavorite(e.target.value);
        }}
      />
    </div>
  );
}

export default Favorites;
