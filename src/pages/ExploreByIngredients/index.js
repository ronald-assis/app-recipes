import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function ExploreByIngredients() {
  return (
    <div className="explore-drinks-by-ingredients app-recipes">
      <Header title="Explore Ingredients" showSearchButton={ false } />
      <Footer />
    </div>
  );
}
