import React from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './Profile.css';

export default function Profile() {
  const { push } = useHistory();
  const { email } = JSON.parse(localStorage.getItem('user'));

  function logoutClick() {
    push('/');
    localStorage.removeItem('mealsToken');
    localStorage.removeItem('cocktailsToken');
    localStorage.removeItem('user');
  }

  return (
    <div className="profile app-recipes">
      <Header title="Profile" showSearchButton={ false } />
      <main className="main-profile">
        <div data-testid="profile-email">{email}</div>
        <button
          type="button"
          data-testid="profile-done-btn"
          className="button-profile"
          onClick={ () => push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          className="button-profile"
          onClick={ () => push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          className="button-profile"
          onClick={ () => logoutClick() }
        >
          Logout
        </button>
      </main>
      <Footer />
    </div>
  );
}
