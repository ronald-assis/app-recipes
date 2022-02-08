import React from 'react';
import PropTypes from 'prop-types';
import './ExploreButton.css';

function ExploreButton({ option, onClick, value, testId }) {
  return (
    <button
      className="explore-button"
      type="button"
      id={ option }
      data-testid={ `explore-${testId}` }
      onClick={ onClick }
    >
      {value}
    </button>
  );
}

ExploreButton.propTypes = {
  option: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
};

export default ExploreButton;
