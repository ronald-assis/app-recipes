import React from 'react';
import PropTypes from 'prop-types';
import './DetailCards.css';
import blackHeart from '../../images/blackHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';

function createTags(list, index) {
  return list.map((tag) => (
    <div
      data-testid={ `${index}-${tag}-horizontal-tag` }
      className="tags"
      key={ tag }
    >
      {tag}
    </div>
  ));
}

// the following props are necessary: 'category', 'name', 'img', 'index'.
// you WILL need to pass 'data' && 'tags' props in the DoneRecipes page
// and the inverse goes to the FavoritesRecipes page
function DetailCards({ category, name, img, index, data, tags }) {
  const icons = (
    <div className="buttons">
      <img
        data-testid={ `${index}-horizontal-share-btn` }
        src={ shareIcon }
        alt="Share Icon"
      />
      <img src={ blackHeart } alt="Black Heart" />
    </div>);

  const miniShareIcon = (
    <div style={ { position: 'relative' } }>
      <img
        data-testid={ `${index}-horizontal-share-btn` }
        className="float"
        src={ shareIcon }
        alt="Share Icon"
      />
    </div>
  );

  const info = (
    <div>
      <div data-testid={ `${index}-horizontal-done-date` }>
        {`Done in: ${data}`}
      </div>
      <div className="tags-container">{createTags(tags, index)}</div>
    </div>
  );

  const details = !!(data && tags[0]);
  return (
    <div>
      {details && miniShareIcon}
      <div className="detail-card">
        <div className="image-container">
          <img
            className="image"
            data-testid={ `${index}-horizontal-image` }
            src={ img }
            alt="dogecoin"
          />
        </div>
        <div className="info">
          <div
            className="detail-category"
            data-testid={ `${index}-horizontal-top-text` }
          >
            {category}
          </div>
          <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>
          {details ? info : icons}
        </div>
      </div>
    </div>
  );
}

DetailCards.propTypes = {
  category: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string.isRequired),
  data: PropTypes.string,
};

DetailCards.defaultProps = {
  data: '',
  tags: [],
};

export default DetailCards;
