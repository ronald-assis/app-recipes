import React from 'react';
import Header from '../../components/Header';

export default function DoneRecipes() {
  return (
    <div className="done-recipes">
      <Header showSearchButton={ false } />
      <h1 data-testid="page-title">Done Recipes</h1>
      <div className="main-categories">
        <input
          type="button"
          value="All"
          data-testid="filter-by-all-btn"
          className="category"
        />
        <input
          type="button"
          value="Food"
          data-testid="filter-by-food-btn"
          className="category"
        />

        <input
          type="button"
          value="Drink"
          data-testid="filter-by-drink-btn"
          className="category"
        />
      </div>
    </div>
  );
}
