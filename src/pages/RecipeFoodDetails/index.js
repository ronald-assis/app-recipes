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
  const { push } = useHistory();

  const URL_RECOMMENDATIONS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const URL_FOODS = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${match.params.id}`;
  const RECOMMENDATIONS_NUMBER = 6;

  const getLocalStorageKey = () => {
    const continueFood = JSON.parse(
      localStorage.getItem('inProgressRecipes') || false,
    );
    if (continueFood) {
      Object.keys(continueFood.meals).filter((mealid) => (
        (mealid === match.params.id) && (
          setButtonTitle('Continue Recipe')
        )
      ));
    }
  };

  useEffect(() => {
    globalFetch(URL_FOODS)
      .then(({ meals }) => setDetails(meals));
    globalFetch(URL_RECOMMENDATIONS)
      .then(({ drinks }) => (
        setRecommendations(drinks.slice(0, RECOMMENDATIONS_NUMBER))));
  }, []);

  useEffect(() => {
    const initialStrIngredient = [];
    const API_MAX_INGREDIENTS = 20;
    details.forEach((meal) => {
      for (let i = 1; i <= API_MAX_INGREDIENTS; i += 1) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && measure) {
          initialStrIngredient.push(`${ingredient} - ${measure}`);
        }
      }
    });
    setStrIngredient(initialStrIngredient);
    getLocalStorageKey();
    console.log(match);
  }, [details]);

  const createEmbedYouTubeURL = (url) => {
    const videoId = url.split('https://www.youtube.com/watch?v=')[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const handleClick = () => {
    const foodId = match.params.id;
    const continueFood = JSON.parse(
      localStorage.getItem('inProgressRecipes'),
    );
    const inProgressRecipes = {
      meals: {
        ...continueFood.meals,
        [foodId]: [strIngredient],
      },
      cocktails: {
        ...continueFood.cocktails,
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    getLocalStorageKey();
    push(`/foods/${match.params.id}/in-progress`);
  };

  const shareButton = () => {
    const URL = `http://localhost:3000${match.url}`;
    const test = 99999;
    URL.select();
    URL.setSelectionRange(0, test);
    navigator.clipboard.writeText(URL);
  };

  return (
    details.map((d, i) => (
      <div key={ i } className="recipes-food-datails">
        <img
          src={ d.strMealThumb }
          alt={ `${d.strMeal} illustration` }
          className="illustration"
          data-testid="recipe-photo"
        />
        <div className="foods details">
          <h1 data-testid="recipe-title">{d.strMeal}</h1>
          <div>
            <button
              type="button"
              onClick={ shareButton }
              data-testid="share-btn"
            >
              <img src={ shareIcon } alt="Share button" />
            </button>
            <button type="button" data-testid="favorite-btn">
              <img src={ whiteHeartIcon } alt="favorite button" />
            </button>
          </div>
        </div>
        <p className="details" data-testid="recipe-category">{d.strCategory}</p>

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

        <div className="video details">
          <h3 data-testid="video">Video</h3>
          <iframe
            width="341"
            height="160"
            src={ createEmbedYouTubeURL(d.strYoutube) }
            title="YouTube video player"
            allowFullScreen
          />
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
                <img src={ r.strDrinkThumb } alt={ r.strDrink } />
                <p>{r.strAlcoholic}</p>
                <h3
                  data-testid={ `${index}-recomendation-title` }
                >
                  {r.strDrink}
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
