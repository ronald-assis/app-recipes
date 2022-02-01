import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './context';

function RecipesProvider({ children }) {
  const [currCategory, setCurrCategory] = useState('');
  const [searchURL, setSearchURL] = useState('');
  const [exploreURL, setExploreURL] = useState('');
  const [isLoading, setLoading] = useState(false);
  const context = {
    searchURL,
    setSearchURL,
    currCategory,
    setCurrCategory,
    exploreURL,
    setExploreURL,
    isLoading,
    setLoading,
  };

  return (
    <RecipesContext.Provider value={ context }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
