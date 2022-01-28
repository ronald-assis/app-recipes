import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Cards from '../components/Cards';
import './MainRecipes.css';

const types = {
  meals: {
    recipesEndPoint: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
    categoriesEndPoint: 'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
    thumb: 'strMealThumb',
    name: 'strMeal',
  },
  drinks: {
    recipesEndPoint: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
    categoriesEndPoint: 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
    thumb: 'strDrinkThumb',
    name: 'strDrink',
  },
};

function MainRecipes({ location: { pathname } }) {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const currPathname = pathname.endsWith('foods') ? 'meals' : 'drinks';
  const currType = types[currPathname];

  useEffect(() => {
    const optionsLength = 12;
    const categoryLenght = 5;
    const { recipesEndPoint, categoriesEndPoint } = currType;

    fetch(recipesEndPoint)
      .then((result) => result.json())
      .then(({ [currPathname]: array }) => setRecipes(array.slice(0, optionsLength)));

    fetch(categoriesEndPoint)
      .then((result) => result.json())
      .then(({ [currPathname]: array }) => setCategories(array.slice(0, categoryLenght)));
  }, [currType, currPathname]);

  console.log(categories);
  function createCards(list) {
    const { thumb, name } = currType;
    return list.map(({ [thumb]: img, [name]: nome }, index) => (
      <Cards img={ img } name={ nome } key={ nome } index={ index } />
    ));
  }

  function createCategories(list) {
    return list.map(({ strCategory: category }) => (
      <input
        type="button"
        key={ category }
        value={ category }
        className="category"
        data-testid={ `${category}-category-filter` }
      />
    ));
  }

  return (
    <div className="main-recipes">
      <div className="main-categories">
        {createCategories(categories)}
      </div>
      <div className="main-list">
        {createCards(recipes)}
      </div>
    </div>
  );
}

MainRecipes.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default MainRecipes;
