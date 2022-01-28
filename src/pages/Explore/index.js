import React from 'react';
import Header from '../../components/Header';

export default function Explore() {
  return (
    <div className="explore app-recipes">
      <Header showSearchButton={ false } />
      <h1 data-testid="page-title">Explore</h1>
    </div>
  );
}
