import React from 'react';
import PropTypes from 'prop-types';
import './DetailCards.css';
import blackHeart from '../../images/blackHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';

function createTags(list) {
  return list.map((tag) => (
    <div className="tags" key={ tag }>{tag}</div>
  ));
}

function DetailCards({ category, name, data, img, tags }) {
  const buttons = (
    <div className="buttons">
      <img src={ shareIcon } alt="Share Icon" />
      <img src={ blackHeart } alt="Black Heart" />
    </div>);

  const miniShareIcon = (
    <div style={ { position: 'relative' } }>
      <img className="float" src={ shareIcon } alt="Share Icon" />
    </div>
  );

  const load = !!data;
  return (
    <div>
      {load && miniShareIcon}
      <div className="detail-card">
        <div className="image-container">
          <img className="image" src={ img } alt="dogecoin" />
        </div>
        <div className="info">
          <div className="detail-category">{category}</div>
          <h2>{name}</h2>
          {load && <div>{`Done in: ${data}`}</div>}
          {!load && buttons}
          {load && <div className="tags-container">{createTags(tags)}</div> }
        </div>
      </div>
    </div>
  );
}

DetailCards.propTypes = {
  category: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  data: PropTypes.string,
  img: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string.isRequired),
};

DetailCards.defaultProps = {
  data: '',
  tags: [],
};

export default DetailCards;
