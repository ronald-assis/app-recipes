import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Cards from '../../components/Cards';
import globalFetch from '../../services/globalFetch';

export default function ExploreByIngredients() {
  const { push } = useHistory();
  const { pathname } = useLocation();
  const [ingredients, setIngredients] = useState([]);
  const location = pathname.includes('foods') ? 'foods' : 'drinks';
  const key = location === 'foods' ? 'meals' : 'drinks';
  const mealsURL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const drinksURL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';

  useEffect(() => {
    const URL = location === 'foods' ? mealsURL : drinksURL;
    const MAX_LENGTH = 12;

    globalFetch(URL)
      .then((response) => {
        const ingredientList = response[key];
        setIngredients(ingredientList.slice(0, MAX_LENGTH));
      });
  }, [location, key]);

  function createCards(array) {
    return array.map(({ idIngredient: id, strIngredient: name }, index) => (
      <Cards
        img=""
        name={ name }
        key={ id }
        index={ index }
        onClick={ () => push('/') }
      />
    ));
  }

  return (
    <div className="explore-by-ingredients app-recipes">
      <Header title="Explore Ingredients" showSearchButton={ false } />
      {createCards(ingredients)}
      <Footer />
    </div>
  );
}
