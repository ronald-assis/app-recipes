import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RecipesContext from '../../context/context';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('ingredient');
  const location = useLocation();
  const { setMainURL } = useContext(RecipesContext);
  const nameOfAPI = location.pathname.includes('foods') ? 'themealdb' : 'thecocktaildb';

  const handleChange = ({ target }) => {
    const { value, type } = target;
    if (type === 'radio') setSearchType(value);
    else setSearchTerm(value);
  };

  const handleClick = () => {
    if (searchType === 'first-letter' && searchTerm.length !== 1) {
      global.alert('Your search must have only 1 (one) character');
    }

    setMainURL(searchType, nameOfAPI, searchTerm, true);
  };

  return (
    <div>
      <input
        data-testid="search-input"
        onChange={ handleChange }
      />
      {/* set this to be checked */}
      <div onChange={ handleChange }>
        <label htmlFor="ingredient">
          <input
            data-testid="ingredient-search-radio"
            type="radio"
            name="search"
            id="ingredient"
            value="ingredient"
            checked
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
      </div>
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
