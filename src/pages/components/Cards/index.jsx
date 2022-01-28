import React from 'react';
import PropTypes from 'prop-types';
import './Cards.css';
import { useHistory } from 'react-router-dom';

function Cards({ img, name, index, idMeal, path }) {
  const history = useHistory();
  return (
    <button
      type="button"
      className="card"
      data-testid={ `${index}-recipe-card` }
      onClick={ () => history.push(`/${path}/${idMeal}`) }
    >
      <img
        src={ img }
        alt={ `a ${name}` }
        className="card-image"
        data-testid={ `${index}-card-img` }
        id={ idMeal }
      />
      <div className="card-text" data-testid={ `${index}-card-name` }>{name}</div>
    </button>
  );
}

Cards.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
  idMeal: PropTypes.string.isRequired,
};

export default Cards;
