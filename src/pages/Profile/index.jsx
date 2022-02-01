import React from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './Profile.css';

const storageKeys = [
  'mealsToken',
  'cocktailsToken',
  'doneRecipes',
  'user',
  'favoriteRecipes',
  'inProgressRecipes',
];

const deafultEmail = 'your@email.com';

export default function Profile() {
  const { push } = useHistory();
  const user = localStorage.getItem('user');
  const email = user ? JSON.parse(localStorage.getItem('user')).email : deafultEmail;

  function logoutClick() {
    push('/');
    storageKeys.forEach((key) => localStorage.removeItem(key));
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
