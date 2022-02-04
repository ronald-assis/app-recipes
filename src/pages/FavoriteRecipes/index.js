import React from 'react';
import Header from '../../components/Header';

export default function FavoriteRecipes() {
  return (
    <div className="favorite-recipes app-recipes">
      <Header title="Favorite Recipes" showSearchButton={ false } />
      <h1 data-testid="page-title">a</h1>
    </div>
  );
}
