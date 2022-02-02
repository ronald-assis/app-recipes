import React from 'react';
import PropTypes from 'prop-types';
import './ShareAndFavorite.css';

export default function ShareAndFavorite({
  shareButton, shareIcon,
  copiedMessage, handleFavoriteColor,
  favoriteColor,
}) {
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
  shareButton: PropTypes.func.isRequired,
  shareIcon: PropTypes.string.isRequired,
  copiedMessage: PropTypes.bool.isRequired,
  handleFavoriteColor: PropTypes.func.isRequired,
  favoriteColor: PropTypes.string.isRequired,
};
