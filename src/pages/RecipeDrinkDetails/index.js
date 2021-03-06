import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../../context/context';
import globalFetch from '../../services/globalFetch';
import ShareAndFavorite from '../../components/ShareAndFavorite';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import './RecipeDetails.css';
import Button from '../../components/Button';

export default function RecipeDrinkDetails({ match }) {
  const drinkId = match.params.id;
  const pageURL = match.url;
  const [details, setDetails] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [strIngredient, setStrIngredient] = useState([]);
  const [buttonTitle, setButtonTitle] = useState('Start Recipe');
  const { push } = useHistory();
  const {
    inProg, setInProg,
    fvtRec,
    setFavoriteObj,
    setFavoriteColor,
    setUrlToBeCopied,
  } = useContext(RecipesContext);

  const URL_RECOMMENDATIONS = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const RECOMMENDATIONS_NUMBER = 6;

  useEffect(() => {
    const URL_DRINKS = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`;
    globalFetch(URL_DRINKS)
      .then(({ drinks }) => {
        setDetails(Array.isArray(drinks) ? drinks : []);
      });
    globalFetch(URL_RECOMMENDATIONS)
      .then(({ meals }) => (
        setRecommendations(meals.slice(0, RECOMMENDATIONS_NUMBER))));
    setUrlToBeCopied(pageURL);
  }, [drinkId, pageURL, setUrlToBeCopied]);

  useEffect(() => {
    const initialStrIngredient = [];
    const API_MAX_INGREDIENTS = 20;
    details.forEach((drink) => {
      for (let i = 1; i <= API_MAX_INGREDIENTS; i += 1) {
        const ingredient = drink[`strIngredient${i}`];
        const measure = drink[`strMeasure${i}`];
        if (ingredient === null) break;
        initialStrIngredient.push(`${ingredient}${measure && ` - ${measure}`}`);
      }
      const fvtObj = {
        id: drinkId,
        type: 'drink',
        nationality: drink.strArea || '',
        category: drink.strCategory,
        alcoholicOrNot: drink.strAlcoholic,
        name: drink.strDrink,
        image: drink.strDrinkThumb,
      };
      setFavoriteObj(fvtObj);
    });
    setStrIngredient(initialStrIngredient);
  }, [details, drinkId, setFavoriteObj]);

  useEffect(() => {
    Object.keys(inProg.cocktails).some((cocktailid) => (
      (cocktailid === drinkId) && (
        setButtonTitle('Continue Recipe')
      )
    ));

    fvtRec.forEach((favorite) => {
      if (favorite.id === drinkId) {
        setFavoriteColor(blackHeartIcon);
      }
    });
  }, [drinkId, fvtRec, inProg.cocktails, setFavoriteColor]);

  const handleClick = () => {
    const inProgressRecipes = {
      meals: {
        ...inProg.meals,
      },
      cocktails: {
        ...inProg.cocktails,
        [drinkId]: [strIngredient],
      },
    };
    setInProg(inProgressRecipes);
    push(`/drinks/${drinkId}/in-progress`);
  };

  return (
    details.map((d, i) => (
      <div key={ i } className="recipes-drink-datails">
        <img
          src={ d.strDrinkThumb }
          alt={ `${d.strDrink} illustration` }
          className="illustration"
          data-testid="recipe-photo"
        />
        <div className="drinks details">
          <h1 data-testid="recipe-title">{d.strDrink}</h1>
          <ShareAndFavorite
            recipeId={ drinkId }
          />
        </div>
        <p className="details" data-testid="recipe-category">{d.strAlcoholic}</p>

        <div className="ingredients details">
          <h3>Ingredients</h3>
          <div className="ingredients-and-measure">
            {strIngredient.map((elem, index) => (
              <span
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {`- ${elem}`}
              </span>
            ))}

          </div>
        </div>

        <div className="instructions details">
          <h3>Instructions</h3>
          <p data-testid="instructions">
            {d.strInstructions}
          </p>
        </div>

        <div className="recommended details">
          <h3>Recommended</h3>
          <div className="recommendation">
            {recommendations.map((r, index) => (
              <div
                key={ index }
                className="recommendation-illustration"
                data-testid={ `${index}-recomendation-card` }
              >
                <img src={ r.strMealThumb } alt={ r.strMeal } />
                <p>{r.strCategory}</p>
                <h3
                  data-testid={ `${index}-recomendation-title` }
                >
                  {r.strMeal}
                </h3>
              </div>
            ))}
          </div>
        </div>
        <Button
          title={ buttonTitle }
          dataTestid="start-recipe-btn"
          handleClick={ handleClick }
          disabled={ false }
        />
      </div>

    ))
  );
}
