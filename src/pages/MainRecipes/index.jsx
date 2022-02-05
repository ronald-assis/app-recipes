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

function createCategories(params) {
  const {
    categories, currCategory, setCurrCategory, setMainURL, nameOfAPI,
  } = params;

  const newcategories = [{ strCategory: 'All' }, ...categories];

  return newcategories.map(({ strCategory: category }) => {
    const useCategory = (category === currCategory || category === 'All') ? '' : category;

    return (
      <input
        type="button"
        key={ category }
        value={ category }
        className="category"
        data-testid={ `${category}-category-filter` }
        onClick={ () => {
          const type = useCategory ? 'category' : 'default';
          setMainURL(type, nameOfAPI, useCategory);
          setCurrCategory(useCategory);
        } }
      />
    );
  });
}

function createCards(list, currType, push, goDirectly) {
  const { destructImg, destructName, destructId, pathName } = currType;

  if (list.length === 1 && goDirectly) push(`/${pathName}/${list[0][destructId]}`);

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

function MainRecipes() {
  const { push } = useHistory();
  const { pathname } = useLocation();
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currCategory, setCurrCategory] = useState('');

  const mealsOrDrinks = pathname.endsWith('foods') ? 'meals' : 'drinks';
  const currPageVariables = pageVariables[mealsOrDrinks];
  const { nameOfAPI, title } = currPageVariables;
  const defaultURL = `https://www.${nameOfAPI}.com/api/json/v1/1/search.php?s=`;

  const {
    mainURL,
    setMainURL,
    isLoading,
    setLoading,
  } = useContext(RecipesContext);

  // thanks cypress, for this beatifull mess of a block...
  useEffect(() => { // willUnmount
    console.log(); // this needs to be here, DON'T REMOVE
    return () => { setMainURL(); };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // don't add anything here too

  useEffect(() => { // get categories
    const categoryLenght = 5;
    const categoriesEndPoint = `https://www.${nameOfAPI}.com/api/json/v1/1/list.php?c=list`;

    globalFetch(categoriesEndPoint)
      .then(({ [mealsOrDrinks]: array }) => {
        setCategories(Array.isArray(array) ? array.slice(0, categoryLenght) : []);
      });
    return () => setCurrCategory('');
  }, [mealsOrDrinks, nameOfAPI]);

  useEffect(() => { // get recipes
    const optionsLength = 12;
    const URL = mainURL[0] || defaultURL;
    setLoading(true);

    globalFetch(URL)
      .then(({ [mealsOrDrinks]: result }) => {
        if (result === null) {
          notFoundAlert();
          return;
        }
        setRecipes(Array.isArray(result) ? result.slice(0, optionsLength) : []);
      })
      .finally(() => setLoading(false));
  }, [mealsOrDrinks, setLoading, mainURL, defaultURL]);

  return (
    isLoading
      ? <p>Carregando...</p>
      : (
        <div>
          <Header title={ title } showSearchButton />
          <div className="main-recipes app-recipes">
            <div className="main-categories">
              {createCategories(
                { categories, currCategory, setCurrCategory, setMainURL, nameOfAPI },
              )}
            </div>
            <div className="main-list">
              {createCards(recipes, currPageVariables, push, mainURL[1])}
            </div>
          </div>
          <Footer />
        </div>
      )
  );
}

export default MainRecipes;
