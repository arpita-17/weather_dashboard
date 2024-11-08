import React, { useState } from 'react';

function Search({ onSearch }) {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    if (city) onSearch(city);
    setCity('');
  };

  return (
    <div class="container">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default Search;
