import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './context';
import useLocalStorage from '../hooks/useLocalStorage';
import useMainURL from '../hooks/useMainURL';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const inProgressRecipes = { meals: {}, cocktails: {} };
const initialArray = [];

function RecipesProvider({ children }) {
  const [inProg, setInProg] = useLocalStorage('inProgressRecipes', inProgressRecipes);
  const [fvtRec, setFvtRec] = useLocalStorage('favoriteRecipes', initialArray);
  const [mainURL, setMainURL] = useMainURL(false);
  const [doneRecipes, setDoneRecipes] = useLocalStorage('doneRecipes', initialArray);
  const [checkedIngre, setCheckedIngre] = useLocalStorage('checkedIngre', initialArray);
  const [isLoading, setLoading] = useState(false);
  const [favoriteObj, setFavoriteObj] = useState({});
  const [favoriteColor, setFavoriteColor] = useState(whiteHeartIcon);
  const [urlToBeCopied, setUrlToBeCopied] = useState('');

  const context = {
    mainURL,
    setMainURL,
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
    urlToBeCopied,
    setUrlToBeCopied,
    checkedIngre,
    setCheckedIngre,
    doneRecipes,
    setDoneRecipes,
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
