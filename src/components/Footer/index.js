import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  return (

    <footer
      data-testid="footer"
      className="footer-options"
    >
      <Link
        to="/drinks"
        type="button"
        data-testid="drinks-bottom-btn"
        src={ drinkIcon }
      >
        <img src={ drinkIcon } alt="drinks-bottom" />
      </Link>

      <Link
        to="/explore"
        type="button"
        data-testid="explore-bottom-btn"
        src={ exploreIcon }
      >
        <img src={ exploreIcon } alt="explore-bottom" />
      </Link>

      <Link
        to="/foods"
        type="button"
        data-testid="food-bottom-btn"
        src={ mealIcon }
      >
        <img src={ mealIcon } alt="food-bottom" />
      </Link>

    </footer>

  );
}

export default Footer;
