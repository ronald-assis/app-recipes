import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ExploreButton from '../../components/ExploreButton';

export default function Explore() {
  const history = useHistory();
  const handleClick = ({ target }) => {
    const value = target.id;
    history.push(`/explore/${value}`);
  };

  const renderButtons = () => {
    const options = ['foods', 'drinks'];

    return options.map((option, index) => (
      <ExploreButton
        key={ option + index }
        option={ option }
        testId={ option }
        index={ index }
        onClick={ handleClick }
        value={ `Explore ${option.charAt(0).toUpperCase()}${option.slice(1)}` }
      />));
  };

  return (
    <div className="explore app-recipes">
      <Header title="Explore" showSearchButton={ false } />
      <div className="main-recipes">
        <div className="main-categories">
          <div>
            {renderButtons()}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
