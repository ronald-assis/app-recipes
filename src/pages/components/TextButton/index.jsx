import React from 'react';
import PropTypes from 'prop-types';
import './TextButton.css';

function TextButton({ content, testId, className }) {
  return (
    <button type="button" data-testid={ testId } className={ className }>
      {content}
    </button>
  );
}

TextButton.propTypes = {
  content: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default TextButton;
