import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import RecipesContext from '../../context/context';
import globalFetch from '../../services/globalFetch';
import RecipeInProgressCard from '../../components/RecipeInProgressCard';

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

  const types = {
    meals: {
      recipesByIdEndPoint: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipesId}`,
      trumbTypes: 'strMealThumb',
      nameTypes: 'strMeal',
      idTypes: 'idMeal',
    },
    drinks: {
      recipesByIdEndPoint: `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipesId}`,
      trumbTypes: 'strDrinkThumb',
      nameTypes: 'strDrink',
      idTypes: 'idDrink',
    },
  };

  const [strIngredient, setStrIngredient] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const { setUrlToBeCopied } = useContext(RecipesContext);
  const { pathname } = useLocation();
  const currResult = pathname.endsWith(
    `drinks/${recipesId}/in-progress`,
  ) ? 'drinks' : 'meals';
  const currTypes = types[currResult];

  useEffect(() => {
    const { recipesByIdEndPoint } = currTypes;
    globalFetch(recipesByIdEndPoint)
      .then(({ [currResult]: array }) => (
        setRecipe(array)
      ));
    setUrlToBeCopied(pageUrl);
  }, [currResult, currTypes, setUrlToBeCopied, pageUrl]);

  useEffect(() => {
    const initialStrIngredient = [];
    const API_MAX_INGREDIENTS = 20;
    recipe.forEach((ing) => {
      for (let i = 1; i < API_MAX_INGREDIENTS; i += 1) {
        const ingredient = ing[`strIngredient${i}`];
        const measure = ing[`strMeasure${i}`];
        if (ingredient === null || ingredient === '') break;
        initialStrIngredient.push(`${ingredient}${measure && ` - ${measure}`}`);
        // initialStrIngredient.push(`${ingredient} - ${measure}`);
      }
    });
    setStrIngredient(initialStrIngredient);
  }, [recipe]);

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
