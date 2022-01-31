import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import globalFetch from '../../services/globalFetch';

export default function ExploreRecipes() {
  const location = useLocation().pathname.endsWith('foods') ? 'foods' : 'drinks';
  const history = useHistory();
  const foodURL = 'https://www.themealdb.com/api/json/v1/1/random.php';
  const drinksURL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const URL = location === 'foods' ? foodURL : drinksURL;
  const key = location === 'foods' ? 'meals' : 'drinks';
  const id = key === 'meals' ? 'idMeal' : 'idDrink';

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const surpriseMe = () => {
    globalFetch(URL).then((result) => {
      const randomId = result[key][0][id];
      history.push(`/${location}/${randomId}`);
    });
  };

  const handleClick = ({ target }) => {
    let value = target.id;
    if (value === 'ingredient') value = 'ingredients';
    if (value === 'nationality') value = 'nationalities';
    if (value === 'surprise') return surpriseMe();
    history.push(`/explore/${location}/${value}`);
  };

  const renderButtons = () => {
    const options = location === 'foods'
      ? ['ingredient', 'nationality', 'surprise']
      : ['ingredient', 'surprise'];

    const supriseBtn = (
      <button
        type="button"
        id="surprise"
        data-testid="explore-surprise"
        onClick={ handleClick }
      >
        Surprise me!
      </button>
    );

    return options.map((option, index) => {
      if (option === 'surprise') return <div key={ index }>{supriseBtn}</div>;
      return (
        <div key={ index }>
          <button
            type="button"
            id={ option }
            data-testid={ `explore-by-${option}` }
            onClick={ handleClick }
          >
            By
            {' '}
            {capitalize(option)}
          </button>
        </div>
      );
    });
  };

  return (
    <div className="explore-drinks app-recipes">
      <Header title={ `Explore ${capitalize(location)}` } showSearchButton={ false } />
      {renderButtons()}
      <Footer />
    </div>
  );
}
