import React from 'react';
import PropTypes from 'prop-types';
import './DetailCards.css';
import { Link } from 'react-router-dom'; // ADD LINK
import copy from 'clipboard-copy'; // ADD CLIPBOARD COPY
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

function DetailCards({ category, name, img, index, data, tags, type, id }) {
  const [isSharedURL, setIsSharedURL] = React.useState(false); // ADD COPY TO CLIPBOARD

  function handleShareClick() { // ADD COPY TO CLIPBOARD
    copy(`${window.location.origin}/foods/${id}`);
    setIsSharedURL(true);
  }

  const icons = (
    <div className="buttons">
      <button // turn img to button
        onClick={ handleShareClick } // ADD COPY TO CLIPBOARD
        type="button"
      >
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          id={ `${index}-horizontal-share-btn` } // Add ID
          src={ shareIcon }
          alt="Share Icon"
          type="button"
        />
        <img src={ blackHeart } alt="Black Heart" />
      </button>
    </div>);

  const miniShareIcon = (
    <div style={ { position: 'relative' } }>
      <button // turn img to button
        type="button"
        onClick={ handleShareClick } // ADD COPY TO CLIPBOARD
      >
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          id={ `${index}-horizontal-share-btn` } // Add ID
          className="float"
          src={ shareIcon }
          alt="Share Icon"
        />
      </button>
      {isSharedURL && <span>Link copied!</span>}
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

  const details = !(!data && !tags[0]);
  return (
    <div>
      {details && miniShareIcon}
      <div className="detail-card">
        <div className="image-container">
          <Link to={ `/${type}s/${id}` }>
            <img
              className="image"
              data-testid={ `${index}-horizontal-image` }
              src={ img }
              alt="dogecoin"
            />
          </Link>
        </div>
        <div className="info">
          <div
            className="detail-category"
            data-testid={ `${index}-horizontal-top-text` }
          >
            {category}
          </div>
          <Link to={ `/${type}s/${id}` }>
            <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>
          </Link>
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
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string.isRequired),
  data: PropTypes.string,
};

DetailCards.defaultProps = {
  data: '',
  tags: [],
};

export default DetailCards;
