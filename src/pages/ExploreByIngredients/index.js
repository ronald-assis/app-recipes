import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Cards from '../../components/Cards';
import globalFetch from '../../services/globalFetch';
import RecipesContext from '../../context/context';

export default function ExploreByIngredients() {
  const { setCurrCategory, setExploreURL } = useContext(RecipesContext);
  const { push } = useHistory();
  const { pathname } = useLocation();
  const [ingredients, setIngredients] = useState([]);
  const location = pathname.includes('foods') ? 'foods' : 'drinks';
  const key = location === 'foods' ? 'meals' : 'drinks';
  const endpoint = location === 'foods' ? 'meal' : 'cocktail';
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
      const URL = `https://www.the${endpoint}db.com/images/ingredients/${name}-Small.png`;
      const exploreURL = `https://www.the${endpoint}db.com/api/json/v1/1/filter.php?i=${name}`;

      return (
        <Cards
          img={ URL }
          name={ name }
          key={ index }
          index={ index }
          onClick={ () => {
            setCurrCategory(name);
            setExploreURL(exploreURL);
            push(`/${location}`);
          } }
        />
      );
    });
  }

  return (
    <div className="explore-by-ingredients app-recipes">
      <Header title="Explore Ingredients" showSearchButton={ false } />
      {createCards(ingredients)}
      <Footer />
    </div>
  );
}
