import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import RecipesContext from '../../context/context';
import globalFetch from '../../services/globalFetch';
import RecipeInProgressCard from '../../components/RecipeInProgressCard';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

const createCard = (list, currTypes, ingredients) => {
  const { trumbTypes, nameTypes, idTypes } = currTypes;
  return list.map(({
    [trumbTypes]: img, [nameTypes]: name, [idTypes]: id,
    strAlcoholic, strCategory, strInstructions,
  }, i) => (
    strAlcoholic ? (
      <RecipeInProgressCard
        key={ i + name }
        id={ id }
        img={ img }
        name={ name }
        category={ strAlcoholic }
        ingredients={ ingredients }
        instructions={ strInstructions }
      />
    ) : (
      <RecipeInProgressCard
        key={ i + name }
        id={ id }
        img={ img }
        name={ name }
        category={ strCategory }
        ingredients={ ingredients }
        instructions={ strInstructions }
      />
    )
  ));
};

export default function RecipesInProgress({ match }) {
  const recipesId = match.params.id;
  const pageUrl = match.url;
  const newUrl = pageUrl.split('/in-progress')[0];

  const types = {
    meals: {
      recipesByIdEndPoint: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipesId}`,
      trumbTypes: 'strMealThumb',
      nameTypes: 'strMeal',
      idTypes: 'idMeal',
      title: 'food',
    },
    drinks: {
      recipesByIdEndPoint: `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipesId}`,
      trumbTypes: 'strDrinkThumb',
      nameTypes: 'strDrink',
      idTypes: 'idDrink',
      title: 'drink',
    },
  };

  const [strIngredient, setStrIngredient] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const {
    setUrlToBeCopied,
    setFavoriteObj, fvtRec,
    setFavoriteColor,
  } = useContext(RecipesContext);
  const { pathname } = useLocation();
  const currResult = pathname.endsWith(
    `drinks/${recipesId}/in-progress`,
  ) ? 'drinks' : 'meals';
  // const toLocalStorage = pathname.endsWith(
  //   `drinks/${recipesId}/in-progress`,
  // ) ? 'drink' : 'food';
  const currTypes = types[currResult];

  useEffect(() => {
    const { recipesByIdEndPoint } = currTypes;
    globalFetch(recipesByIdEndPoint)
      .then(({ [currResult]: array }) => (
        setRecipe(array)
      ));
    setUrlToBeCopied(newUrl);
  }, []);

  useEffect(() => {
    const initialStrIngredient = [];
    const API_MAX_INGREDIENTS = 20;
    recipe.forEach((ing) => {
      for (let i = 1; i < API_MAX_INGREDIENTS; i += 1) {
        const ingredient = ing[`strIngredient${i}`];
        const measure = ing[`strMeasure${i}`];
        if (ingredient === null || ingredient === '') break;
        initialStrIngredient.push(`${ingredient}${measure && ` - ${measure}`}`);
      }
    });
    setStrIngredient(initialStrIngredient);
  }, [recipe]);

  useEffect(() => {
    const { trumbTypes, title, nameTypes, idTypes } = currTypes;
    recipe.forEach(({
      [idTypes]: id, strArea,
      strCategory, strAlcoholic, [trumbTypes]: image, [nameTypes]: name }) => {
      const fvtObj = {
        id,
        type: title,
        nationality: strArea || '',
        category: strCategory,
        alcoholicOrNot: strAlcoholic || '',
        name,
        image,
      };
      setFavoriteObj(fvtObj);
    });

    fvtRec.forEach((favorite) => {
      if (favorite.id === recipesId) {
        setFavoriteColor(blackHeartIcon);
      }
    });
  }, [recipe, setFavoriteObj, fvtRec]);

  return (
    <div className="recipe-in-progress">
      <h1>Recipe in progress</h1>
      {/* {console.log(strIngredient)} */}
      {createCard(recipe, currTypes, strIngredient)}
    </div>
  );
}

RecipesInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
    url: PropTypes.string,
  }).isRequired,
};
