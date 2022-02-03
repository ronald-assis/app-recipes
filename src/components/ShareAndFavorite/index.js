import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../../context/context';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import './ShareAndFavorite.css';

export default function ShareAndFavorite({
  url, recipeId,
}) {
  const [copiedMessage, setCopiedMessage] = useState(false);
  // const [favoriteColor, setFavoriteColor] = useState(whiteHeartIcon);
  const {
    fvtRec, setFvtRec,
    favoriteObj,
    favoriteColor, setFavoriteColor,
  } = useContext(RecipesContext);

  const shareButton = () => {
    const URL = `http://localhost:3000${url}`;
    navigator.clipboard.writeText(URL);
    setCopiedMessage(true);
  };

  const handleFavoriteColor = () => {
    if (favoriteColor === whiteHeartIcon) {
      setFavoriteColor(blackHeartIcon);
      const favoriteRecipes = [
        ...fvtRec,
        favoriteObj,
      ];
      setFvtRec(favoriteRecipes);
    }
    if (favoriteColor === blackHeartIcon) {
      setFavoriteColor(whiteHeartIcon);
      const removeFavote = fvtRec.filter(({ id }) => id !== recipeId);
      setFvtRec(removeFavote);
    }
  };

  return (
    <div className="share-and-favorite">
      <button
        type="button"
        className="share-btn"
        onClick={ shareButton }
        data-testid="share-btn"
      >
        <img src={ shareIcon } alt="Share button" />
        {copiedMessage && <span>Link copied!</span>}
      </button>
      <button
        type="button"
        onClick={ handleFavoriteColor }
        src={ favoriteColor }
        data-testid="favorite-btn"
      >
        <img src={ favoriteColor } alt="favorite button" />
      </button>
    </div>
  );
}

ShareAndFavorite.propTypes = {
  url: PropTypes.string.isRequired,
  recipeId: PropTypes.string.isRequired,
};
