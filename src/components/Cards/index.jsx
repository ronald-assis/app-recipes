import React from 'react';
import PropTypes from 'prop-types';
import './Cards.css';

function Cards({ img, name, index, onClick }) {
  return (
    <button
      type="button"
      className="card"
      data-testid={ `${index}-recipe-card` }
      onClick={ onClick }
    >
      <img
        src={ img }
        alt={ `a ${name}` }
        className="card-image"
        data-testid={ `${index}-card-img` }
      />
      <div className="card-text" data-testid={ `${index}-card-name` }>{name}</div>
    </button>
  );
}

Cards.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Cards;
