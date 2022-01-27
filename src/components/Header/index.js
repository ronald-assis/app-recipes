import React from 'react';
import userIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import './Header.css';

export default function Header() {
  return (
    <header>
      <button type="button" data-testid="profile-top-btn">
        <img src={ userIcon } alt="User button" />
      </button>
      <h1 data-testid="page-title">Foods</h1>
      <button type="button" data-testid="search-top-btn">
        <img src={ searchIcon } alt="" />
      </button>
    </header>
  );
}
