import React from 'react';
import Header from '../../components/Header';

export default function FavoriteRecipes() {
  return (
    <div className="favorite-recipes app-recipes">
      <Header showSearchButton={ false } />
      <h1 data-testid="page-title">Favorite Recipes</h1>
    </div>
  );
}
