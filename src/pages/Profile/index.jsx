import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './Profile.css';

export default function Profile() {
  const { email } = JSON.parse(localStorage.getItem('user'));
  return (
    <div className="profile app-recipes">
      <Header title="Profile" showSearchButton={ false } />
      <main className="main-profile">
        <div data-testid="profile-email">{email}</div>
        <button
          type="button"
          data-testid="profile-done-btn"
          className="button-profile"
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          className="button-profile"
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          className="button-profile"
        >
          Logout
        </button>
      </main>
      <Footer />
    </div>
  );
}
