import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import globalFetch from '../../services/globalFetch';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import './RecipeDetails.css';
import Button from '../../components/Button';

export default function RecipeFoodDetails({ match }) {
  const [details, setDetails] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [strIngredient, setStrIngredient] = useState([]);
  const [buttonTitle, setButtonTitle] = useState('Start Recipe');
  const [copiedMessage, setCopiedMessage] = useState(false);
  const { push } = useHistory();

  const URL_RECOMMENDATIONS = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const RECOMMENDATIONS_NUMBER = 6;

  const getLocalStorageKey = () => {
    const continueDrink = JSON.parse(
      localStorage.getItem('inProgressRecipes') || false,
    );
    console.log(continueDrink);
    if (continueDrink) {
      Object.keys(continueDrink.cocktails).filter((cocktailid) => (
        (cocktailid === match.params.id) && (
          setButtonTitle('Continue Recipe')
        )
      ));
    }
  };

  useEffect(() => {
    const URL_DRINKS = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${match.params.id}`;
    globalFetch(URL_DRINKS)
      .then(({ drinks }) => setDetails(drinks));
    globalFetch(URL_RECOMMENDATIONS)
      .then(({ meals }) => (
        setRecommendations(meals.slice(0, RECOMMENDATIONS_NUMBER))));
  }, []);

  useEffect(() => {
    const initialStrIngredient = [];
    const API_MAX_INGREDIENTS = 20;
    details.forEach((meal) => {
      for (let i = 1; i <= API_MAX_INGREDIENTS; i += 1) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient) {
          initialStrIngredient.push(`${ingredient}${measure && ` - ${measure}`}`);
        }
      }
    });
    setStrIngredient(initialStrIngredient);
    getLocalStorageKey();
  }, [details]);

  const handleClick = () => {
    const drinkId = match.params.id;
    const continueDrink = JSON.parse(
      localStorage.getItem('inProgressRecipes'),
    );
    const inProgressRecipes = {
      meals: {
        ...continueDrink.meals,
      },
      cocktails: {
        ...continueDrink.cocktails,
        [drinkId]: [strIngredient],
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    getLocalStorageKey();
    push(`/drinks/${match.params.id}/in-progress`);
  };

  const shareButton = () => {
    const URL = `http://localhost:3000${match.url}`;
    navigator.clipboard.writeText(URL);
    setCopiedMessage(true);
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
          <div className="share-and-favorite">
            <button
              type="button"
              className="share-btn"
              onClick={ shareButton }
              data-testid="share-btn"
            >
              <img src={ shareIcon } alt="Share button" />
              {copiedMessage && <span>Link copied!</span>}
            </button>
            <button type="button" data-testid="favorite-btn">
              <img src={ whiteHeartIcon } alt="favorite button" />
            </button>
          </div>
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
        />
      </div>

    ))
  );
}
