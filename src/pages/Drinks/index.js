import React from 'react';
import Header from '../../components/Header';

function Drinks() {
  return (
    <div className="drinks app-recipes">
      <Header showSearchButton />
      <h1 data-testid="page-title">Drinks</h1>
    </div>
  );
}

export default Drinks;
