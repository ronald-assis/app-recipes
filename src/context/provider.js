import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './context';
import useLocalStorage from '../hooks/useLocalStorage';
import useMainURL from '../hooks/useMainURL';

const inProgressRecipes = { meals: {}, cocktails: {} };
const favoriteRecipes = [];

function RecipesProvider({ children }) {
  const [inProg, setInProg] = useLocalStorage('inProgressRecipes', inProgressRecipes);
  const [fvtRec, setFvtRec] = useLocalStorage('favoriteRecipes', favoriteRecipes);
  const [mainURL, setMainURL] = useMainURL(false);
  const [searchURL, setSearchURL] = useState('');
  const [isLoading, setLoading] = useState(false);
  const context = {
    mainURL,
    setMainURL,
    isLoading,
    setLoading,
    inProg,
    setInProg,
    fvtRec,
    setFvtRec,
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
