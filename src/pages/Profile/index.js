import React from 'react';
import Header from '../../components/Header';

export default function Profile() {
  return (
    <div className="profile app-recipes">
      <Header showSearchButton={ false } />
      <h1 data-testid="page-title">Profile</h1>
    </div>
  );
}
