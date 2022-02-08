import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Cards from '../../components/Cards';
import globalFetch from '../../services/globalFetch';
import RecipesContext from '../../context/context';

export default function ExploreByIngredients() {
  const { setMainURL } = useContext(RecipesContext);
  const { pathname } = useLocation();
  const [ingredients, setIngredients] = useState([]);
  const location = pathname.includes('foods') ? 'foods' : 'drinks';
  const key = location === 'foods' ? 'meals' : 'drinks';
  const nameOfAPI = location === 'foods' ? 'themealdb' : 'thecocktaildb';
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
    return array.map((ingredient, index) => {
      const name = location === 'foods'
        ? ingredient.strIngredient
        : ingredient.strIngredient1;
      const imgURL = `https://www.${nameOfAPI}.com/images/ingredients/${name}-Small.png`;

      return (
        <Cards
          img={ imgURL }
          name={ name }
          key={ index }
          index={ index }
          onClick={ () => {
            setMainURL('ingredient', nameOfAPI, name);
          } }
        />
      );
    });
  }

  return (
    <div className="explore-by-ingredients app-recipes">
      <Header title="Explore Ingredients" showSearchButton={ false } />
      <div className="main-list">
        {createCards(ingredients)}
      </div>
      <Footer />
    </div>
  );
}
