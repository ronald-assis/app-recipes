import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function ExploreDrinks() {
  return (
    <div className="explore-drinks app-recipes">
      <Header title="Explore Drinks" showSearchButton={ false } />
      <h1 data-testid="page-title">Explore Drinks</h1>
      <Footer />
    </div>
  );
}
