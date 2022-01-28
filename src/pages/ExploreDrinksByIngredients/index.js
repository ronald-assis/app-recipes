import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function ExploreDrinksByIngredients() {
  return (
    <div className="explore-drinks-by-ingredients app-recipes">
      <Header showSearchButton={ false } />
      <h1 data-testid="page-title">Explore Ingredients</h1>
      <Footer />
    </div>
  );
}
