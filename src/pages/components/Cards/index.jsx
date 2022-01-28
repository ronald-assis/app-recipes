import React from 'react';
import PropTypes from 'prop-types';
import './Cards.css';

function Cards({ img, name, index = '' }) {
  return (
    <div className="card" data-testid={ `${index}-recipe-card` }>
      <img
        src={ img }
        alt={ `a ${name}` }
        className="card-image"
        data-testid={ `${index}-card-img` }
      />
      <div className="card-text" data-testid={ `${index}-card-name` }>{name}</div>
    </div>
  );
}

Cards.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
};

export default Cards;
