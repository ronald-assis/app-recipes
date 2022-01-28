import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Cards from '../components/Cards';
import './MainRecipes.css';

// const img = 'https://comoinvestir.thecap.com.br/medias/2021/05/o-que-e-dogecoin-doge-a-criptomoeda-meme.jpg';
const types = {
  meals: {
    endPoint: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
    thumb: 'strMealThumb',
    name: 'strMeal',
  },
  drinks: {
    endPoint: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
    thumb: 'strDrinkThumb',
    name: 'strDrink',
  },
};

function MainRecipes({ location: { pathname } }) {
  const [recipes, setRecipes] = useState([]);
  const currPathname = pathname.endsWith('foods') ? 'meals' : 'drinks';
  const currType = types[currPathname];

  useEffect(() => {
    const optionsLength = 12;
    const { endPoint } = currType;

    fetch(endPoint)
      .then((result) => result.json())
      .then(({ [currPathname]: array }) => setRecipes(array.slice(0, optionsLength)));
  }, [currType, currPathname]);

  function createCards(list) {
    const { thumb, name } = currType;
    return list.map(({ [thumb]: img, [name]: nome }, index) => (
      <Cards img={ img } name={ nome } key={ nome } index={ index } />
    ));
  }

  return (
    <div className="main-recipes">
      {createCards(recipes)}
    </div>
  );
}

MainRecipes.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default MainRecipes;
