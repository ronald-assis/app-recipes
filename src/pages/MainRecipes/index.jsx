import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Cards from '../../components/Cards';
import './MainRecipes.css';
import globalFetch from '../../services/globalFetch';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import RecipesContext from '../../context/context';

const types = {
  meals: {
    defaultEndPoint: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
    selectedEndPoint: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=',
    categoriesEndPoint: 'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
    thumbType: 'strMealThumb',
    nameType: 'strMeal',
    idType: 'idMeal',
    pathName: 'foods',
    title: 'Foods',
  },
  drinks: {
    defaultEndPoint: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
    selectedEndPoint: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=',
    categoriesEndPoint: 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
    thumbType: 'strDrinkThumb',
    nameType: 'strDrink',
    idType: 'idDrink',
    pathName: 'drinks',
    title: 'Drinks',
  },
};

function notFoundAlert() {
  global.alert('Sorry, we haven\'t found any recipes for these filters.');
}

function createCards(list, currType, push, searchURL) {
  const { thumbType, nameType, idType, pathName } = currType;
  if (list.length === 1 && searchURL !== '') push(`/${pathName}/${list[0][idType]}`);
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
function MainRecipes() {
  const { pathname } = useLocation();
  const { push } = useHistory();
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currCategory, setCurrCategory] = useState('');
  const currResult = pathname.endsWith('foods') ? 'meals' : 'drinks';
  const currType = types[currResult];
  const { searchURL } = useContext(RecipesContext);

  useEffect(() => { // get categories
    const categoryLenght = 5;
    const { categoriesEndPoint } = currType;

    globalFetch(categoriesEndPoint)
      .then(({ [currResult]: array }) => (
        array ? setCategories(array.slice(0, categoryLenght)) : []
      ));
  }, [currType, currResult]);

  useEffect(() => { // get recipes with curr category or not
    const optionsLength = 12;
    const { defaultEndPoint, selectedEndPoint } = currType;
    let URL;
    if (searchURL !== '') URL = searchURL;
    else URL = currCategory ? `${selectedEndPoint}${currCategory}` : defaultEndPoint;

    globalFetch(URL)
      .then(({ [currResult]: array }) => (array === null ? notFoundAlert()
        : setRecipes(array.slice(0, optionsLength))));
  }, [currType, currCategory, currResult, searchURL]);

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

  const { title } = currType;
  return (
    <div>
      <Header title={ title } showSearchButton />
      <div className="main-recipes app-recipes">
        <div className="main-categories">
          {createCategories(categories)}
        </div>
        <div className="main-list">
          {createCards(recipes, currType, push, searchURL)}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MainRecipes;
