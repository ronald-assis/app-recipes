import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function ExploreFoodsNationalities() {
  return (
    <div className="explore-foods-nationalities app-recipes">
      <Header showSearchButton />
      <h1 data-testid="page-title">Explore Nationalities</h1>
      <Footer />
    </div>
  );
}
