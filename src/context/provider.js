import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './context';

function RecipesProvider({ children }) {
  const [detailsFoodId, setDetailsFoodId] = useState('52771');
  const [detailsDrinkId, setDetailsDrinkId] = useState('178319');

  const context = {
    setDetailsFoodId,
    detailsFoodId,
    detailsDrinkId,
    setDetailsDrinkId,
  };
  return (
    <RecipesContext.Provider value={ context }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
