import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Explore() {
  const history = useHistory();
  const handleClick = ({ target }) => {
    const value = target.id;
    history.push(`/explore/${value}`);
  };

  const renderButtons = () => {
    const options = ['foods', 'drinks'];

    return options.map((option, index) => (
      <div key={ index }>
        <button
          type="button"
          id={ option }
          data-testid={ `explore-${option}` }
          onClick={ handleClick }
        >
          Explore
          {' '}
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </button>
      </div>
    ));
  };

  return (
    <div className="explore app-recipes">
      <Header title="Explore" showSearchButton={ false } />
      {renderButtons()}
      <Footer />
    </div>
  );
}
