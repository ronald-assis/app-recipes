import React from 'react';
import Header from '../../components/Header';

export default function DoneRecipes() {
  return (
    <div className="done-recipes app-recipes">
      <Header showSearchButton={ false } />
      <h1 data-testid="page-title">Done Recipes</h1>
    </div>
  );
}
