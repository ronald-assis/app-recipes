import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function ExploreFoods() {
  return (
    <div className="explore-foods app-recipes">
      <Header showSearchButton={ false } />
      <h1 data-testid="page-title">Explore Foods</h1>
      <Footer />
    </div>
  );
}
