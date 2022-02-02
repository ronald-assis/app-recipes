import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';
import './ShareAndFavorite.css';

export default function ShareAndFavorite({
  url,
  handleFavoriteColor,
  favoriteColor,
}) {
  const [copiedMessage, setCopiedMessage] = useState(false);

  const shareButton = () => {
    const URL = `http://localhost:3000${url}`;
    navigator.clipboard.writeText(URL);
    setCopiedMessage(true);
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
  handleFavoriteColor: PropTypes.func.isRequired,
  favoriteColor: PropTypes.string.isRequired,
};
