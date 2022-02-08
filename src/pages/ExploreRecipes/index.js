import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import globalFetch from '../../services/globalFetch';
import ExploreButton from '../../components/ExploreButton';

const pageVariables = {
  meals: {
    URL: 'https://www.themealdb.com/api/json/v1/1/random.php',
    id: 'idMeal',
    options: ['ingredient', 'nationality', 'surprise'],
  },
  drinks: {
    URL: 'https://www.thecocktaildb.com/api/json/v1/1/random.php',
    id: 'idDrink',
    options: ['ingredient', 'surprise'],
  },
};

const convert = {
  ingredient: 'ingredients',
  nationality: 'nationalities',
};

export default function ExploreRecipes() {
  const history = useHistory();
  const location = useLocation().pathname.endsWith('foods') ? 'foods' : 'drinks';
  const key = location === 'foods' ? 'meals' : 'drinks';
  const currPageVariables = pageVariables[key];
  const { URL, id, options } = currPageVariables;

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const surpriseMe = () => {
    globalFetch(URL).then((result) => {
      const randomId = result[key][0][id];
      history.push(`/${location}/${randomId}`);
    });
  };

  const handleClick = ({ target }) => {
    const value = target.id;
    if (value === 'surprise') return surpriseMe();
    history.push(`/explore/${location}/${convert[value]}`);
  };

  const renderButtons = () => options.map((option, index) => {
    const testId = (option === 'surprise') ? option : `by-${option}`;
    const value = (option === 'surprise') ? 'Surprise me!' : `By ${capitalize(option)}`;

    return (
      <ExploreButton
        option={ option }
        key={ index }
        id={ option }
        onClick={ handleClick }
        value={ value }
        testId={ testId }
      />
    );
  });

  return (
    <div className="explore-drinks app-recipes">
      <Header title={ `Explore ${capitalize(location)}` } showSearchButton={ false } />
      <div className="main-categories">
        <div>
          {renderButtons()}
        </div>
      </div>
      <Footer />
    </div>
  );
}
