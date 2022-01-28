import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Cards from '../components/Cards';
import './MainRecipes.css';
import globalFetch from '../../services/globalFetch';

const types = {
  meals: {
    defaultEndPoint: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
    selectedEndPoint: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=',
    categoriesEndPoint: 'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
    thumbType: 'strMealThumb',
    nameType: 'strMeal',
    idType: 'idMeal',
    pathName: 'foods',
  },
  drinks: {
    defaultEndPoint: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
    selectedEndPoint: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=',
    categoriesEndPoint: 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
    thumbType: 'strDrinkThumb',
    nameType: 'strDrink',
    idType: 'idDrink',
    pathName: 'drinks',
  },
};

function MainRecipes({ location: { pathname }, history: { push } }) {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currCategory, setCurrCategory] = useState('');
  const currResult = pathname.endsWith('foods') ? 'meals' : 'drinks';
  const currType = types[currResult];

  useEffect(() => { // get categories
    const categoryLenght = 5;
    const { categoriesEndPoint } = currType;

    globalFetch(categoriesEndPoint)
      .then(({ [currResult]: array }) => setCategories(array.slice(0, categoryLenght)));
  }, [currType, currResult]);

  useEffect(() => { // get recipes with curr category or not
    const optionsLength = 12;
    const { defaultEndPoint, selectedEndPoint } = currType;
    const URL = currCategory ? `${selectedEndPoint}${currCategory}` : defaultEndPoint;

    globalFetch(URL)
      .then(({ [currResult]: array }) => setRecipes(array.slice(0, optionsLength)));
  }, [currType, currCategory, currResult]);

  // TODO remove this
  // console.log(categories);
  console.log(recipes);
  console.log(currCategory);

  function createCards(list) {
    const { thumbType, nameType, idType, pathName } = currType;
    return list.map(({ [thumbType]: img, [nameType]: name, [idType]: id }, index) => (
      <Cards
        img={ img }
        name={ name }
        key={ name + id }
        index={ index }
        onClick={ () => push(`/${pathName}/${id}`) }
      />
    ));
  }

  function createCategories(list) {
    const newList = [{ strCategory: 'All' }, ...list];
    return newList.map(({ strCategory: category }) => {
      const useCategory = (
        category === currCategory || category === 'All') ? '' : category;

      return (
        <input
          type="button"
          key={ category }
          value={ category }
          className="category"
          data-testid={ `${category}-category-filter` }
          onClick={ () => setCurrCategory(useCategory) }
        />
      );
    });
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default MainRecipes;
