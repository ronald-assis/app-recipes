import React, { useState } from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import SearchBar from '../SearchBar';
import './Header.css';

export default function Header({ showSearchButton, title }) {
  const [showSearchInput, setShowSearchInput] = useState(false);
  return (
    <header>
      <div className="top-header">
        <a
          href="/profile"
          data-testid="profile-top-btn"
          src={ profileIcon }
        >
          <img src={ profileIcon } alt="User button" />
        </a>
        <h1 data-testid="page-title">{title}</h1>
        { showSearchButton && (
          <button
            type="button"
            data-testid="search-top-btn"
            onClick={ () => setShowSearchInput(!showSearchInput) }
            src={ searchIcon }
          >
            <img src={ searchIcon } alt="" />
          </button>
        )}
      </div>
      {showSearchInput ? (
        <div className="header-input">
          <SearchBar />
        </div>
      ) : null }
    </header>
  );
}

Header.propTypes = {
  showSearchButton: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};
