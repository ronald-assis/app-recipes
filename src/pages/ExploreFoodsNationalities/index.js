import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import globalFetch from '../../services/globalFetch';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Cards from '../../components/Cards';

export default function ExploreFoodsNationalities() {
  const [nationalities, setNationalites] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [cardURL, setCardURL] = useState('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const { push } = useHistory();

  // fetch countries
  useEffect(() => {
    const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';

    globalFetch(URL)
      .then((response) => {
        const countries = response.meals;
        setNationalites(countries);
      });
  }, []);

  // fetch recipes
  useEffect(() => {
    const MAX_LENGTH = 12;

    globalFetch(cardURL)
      .then((response) => {
        const { meals } = response;
        setRecipes(meals.slice(0, MAX_LENGTH));
      });
  }, [cardURL]);

  const createCards = (array) => array.map((recipe, index) => {
    const { strMealThumb, strMeal, idMeal } = recipe;
    return (
      <Cards
        img={ strMealThumb }
        name={ strMeal }
        key={ index }
        index={ index }
        onClick={ () => { push(`/foods/${idMeal}`); } }
      />
    );
  });

  const handleChange = ({ target }) => {
    const { value } = target;
    const URL = value === 'All'
      ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
      : `https://www.themealdb.com/api/json/v1/1/filter.php?a=${value}`;
    setCardURL(URL);
  };

  const renderSelect = (options) => (
    <select
      onChange={ handleChange }
      data-testid="explore-by-nationality-dropdown"
    >
      <option
        value="All"
        data-testid="All-option"
      >
        All
      </option>
      {
        options.map((option, index) => {
          const nationality = option.strArea;
          return (
            <option
              value={ nationality }
              data-testid={ `${nationality}-option` }
              key={ index }
            >
              {nationality}
            </option>
          );
        })
      }
    </select>
  );

  return (
    <div className="explore-foods-nationalities app-recipes">
      <Header title="Explore Nationalities" showSearchButton />
      {renderSelect(nationalities)}
      {createCards(recipes)}
      <Footer />
    </div>
  );
}
