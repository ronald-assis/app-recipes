import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

export default function Button({ title, dataTestid, handleClick }) {
  return (
    <button
      type="button"
      className="main-button"
      onClick={ handleClick }
      data-testid={ dataTestid }
    >
      {title}
    </button>
  );
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  dataTestid: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};
