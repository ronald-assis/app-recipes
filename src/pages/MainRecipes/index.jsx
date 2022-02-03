import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Cards from '../../components/Cards';
import './MainRecipes.css';
import globalFetch from '../../services/globalFetch';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import RecipesContext from '../../context/context';

const pageVariables = {
  meals: {
    destructId: 'idMeal',
    destructName: 'strMeal',
    destructImg: 'strMealThumb',
    nameOfAPI: 'themealdb',
    pathName: 'foods',
    title: 'Foods',
  },
  drinks: {
    destructId: 'idDrink',
    destructName: 'strDrink',
    destructImg: 'strDrinkThumb',
    nameOfAPI: 'thecocktaildb',
    pathName: 'drinks',
    title: 'Drinks',
  },
};

function notFoundAlert() {
  global.alert('Sorry, we haven\'t found any recipes for these filters.');
}

function createCards(list, currType, push, searchURL) {
  const { destructImg, destructName, destructId, pathName } = currType;

  if (list.length === 1 && searchURL !== '') push(`/${pathName}/${list[0][destructId]}`);

  return list.map(({ [destructImg]: img, [destructName]: name, [destructId]: id }, i) => (
    <Cards
      img={ img }
      name={ name }
      key={ name + id }
      index={ i }
      onClick={ () => push(`/${pathName}/${id}`) }
    />
  ));
}

function createCategories(list, setCurrCategory, currCategory, setExploreURL) {
  const newList = [{ strCategory: 'All' }, ...list];

  return newList.map(({ strCategory: category }) => {
    const useCategory = (category === currCategory || category === 'All') ? '' : category;

    return (
      <input
        type="button"
        key={ category }
        value={ category }
        className="category"
        data-testid={ `${category}-category-filter` }
        onClick={ () => {
          setExploreURL('');
          setCurrCategory(useCategory);
        } }
      />
    );
  });
}

function MainRecipes() {
  const { pathname } = useLocation();
  const { push } = useHistory();
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const mealsOrDrinks = pathname.endsWith('foods') ? 'meals' : 'drinks';
  const currPageVariables = pageVariables[mealsOrDrinks];
  const { title } = currPageVariables;
  const { searchURL,
    currCategory,
    setCurrCategory,
    exploreURL,
    setExploreURL,
    isLoading,
    setLoading,
  } = useContext(RecipesContext);

  useEffect(() => { // get categories
    const categoryLenght = 5;
    const categoriesEndPoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

    globalFetch(categoriesEndPoint)
      .then(({ [mealsOrDrinks]: array }) => (
        array ? setCategories(array.slice(0, categoryLenght)) : []
      ));
  }, [mealsOrDrinks]);

  useEffect(() => { // get recipes
    const optionsLength = 12;
    const { nameOfAPI } = currPageVariables;
    const selectedEndPoint = `https://www.${nameOfAPI}.com/api/json/v1/1/filter.php?c=`;
    const defaultEndPoint = `https://www.${nameOfAPI}.com/api/json/v1/1/search.php?s=`;
    let URL;

    if (searchURL !== '') URL = searchURL;
    else if (exploreURL !== '') URL = exploreURL;
    else URL = currCategory ? `${selectedEndPoint}${currCategory}` : defaultEndPoint;
    setLoading(true);

    globalFetch(URL)
      .then(({ [mealsOrDrinks]: array }) => (array === null ? notFoundAlert()
        : setRecipes(array.slice(0, optionsLength))))
      .finally(() => setLoading(false));
  }, [currPageVariables, mealsOrDrinks, currCategory, searchURL, exploreURL, setLoading]);

  return (
    isLoading
      ? <p>Carregando...</p>
      : (
        <div>
          <Header title={ title } showSearchButton />
          <div className="main-recipes app-recipes">
            <div className="main-categories">
              {createCategories(categories, setCurrCategory, currCategory, setExploreURL)}
            </div>
            <div className="main-list">
              {createCards(recipes, currPageVariables, push, searchURL)}
            </div>
          </div>
          <Footer />
        </div>
      )
  );
}

export default MainRecipes;
