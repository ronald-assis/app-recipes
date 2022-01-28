import React from 'react';

export default function SearchBar() {
  const handleChange = () => {

  };
  const handleClick = () => {

  };

  return (
    <div>
      <input
        data-testid="search-input"
        onChange={ handleChange }
      />
      <label htmlFor="ingredient">
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          name="search"
          id="ingredient"
          value="ingredient"
        />
        Ingredient
      </label>
      <label htmlFor="name">
        <input
          data-testid="name-search-radio"
          type="radio"
          name="search"
          id="name"
          value="name"
        />
        Name
      </label>
      <label htmlFor="first-letter">
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          name="search"
          id="first-letter"
          value="first-letter"
        />
        First Letter

      </label>
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ handleClick }
      >
        Search

      </button>
    </div>
  );
}
