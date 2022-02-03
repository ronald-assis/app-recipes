import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './context';
import useLocalStorage from '../hooks/useLocalStorage';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const inProgressRecipes = { meals: {}, cocktails: {} };
const favoriteRecipes = [];

function RecipesProvider({ children }) {
  const [inProg, setInProg] = useLocalStorage('inProgressRecipes', inProgressRecipes);
  const [fvtRec, setFvtRec] = useLocalStorage('favoriteRecipes', favoriteRecipes);
  const [currCategory, setCurrCategory] = useState('');
  const [searchURL, setSearchURL] = useState('');
  const [exploreURL, setExploreURL] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [favoriteObj, setFavoriteObj] = useState({});
  const [favoriteColor, setFavoriteColor] = useState(whiteHeartIcon);

  const context = {
    searchURL,
    setSearchURL,
    currCategory,
    setCurrCategory,
    exploreURL,
    setExploreURL,
    isLoading,
    setLoading,
    inProg,
    setInProg,
    fvtRec,
    setFvtRec,
    favoriteObj,
    setFavoriteObj,
    favoriteColor,
    setFavoriteColor,
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
