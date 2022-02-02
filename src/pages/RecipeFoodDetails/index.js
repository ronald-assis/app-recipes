import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../../context/context';
import globalFetch from '../../services/globalFetch';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import './RecipeDetails.css';
import Button from '../../components/Button';
import ShareAndFavorite from '../../components/ShareAndFavorite';

export default function RecipeFoodDetails({ match }) {
  const foodId = match.params.id;
  const { inProg, setInProg, fvtRec, setFvtRec } = useContext(RecipesContext);
  const [details, setDetails] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [strIngredient, setStrIngredient] = useState([]);
  const [buttonTitle, setButtonTitle] = useState('Start Recipe');
  const [favoriteColor, setFavoriteColor] = useState(whiteHeartIcon);
  const [favoriteObj, setFavoriteObj] = useState({});
  const { push } = useHistory();

  const URL_RECOMMENDATIONS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const RECOMMENDATIONS_NUMBER = 6;

  useEffect(() => {
    const URL_FOODS = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`;
    globalFetch(URL_FOODS)
      .then((data) => {
        if (data === 'error') return;
        setDetails(data.meals);
      });
    globalFetch(URL_RECOMMENDATIONS)
      .then(({ drinks }) => (
        setRecommendations(drinks.slice(0, RECOMMENDATIONS_NUMBER))));
  }, [foodId]);

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
      const fvtObj = {
        id: foodId,
        type: 'food',
        nationality: meal.strArea || '',
        category: meal.strCategory,
        alcoholicOrNot: '',
        name: meal.strMeal,
        image: meal.strMealThumb,
      };
      setFavoriteObj(fvtObj);
    });
    setStrIngredient(initialStrIngredient);
  }, [details, foodId]);

  useEffect(() => {
    Object.keys(inProg.meals).some((mealid) => (
      (mealid === foodId) && (
        setButtonTitle('Continue Recipe')
      )
    ));
    fvtRec.forEach((favorite) => {
      if (favorite.id === foodId) {
        setFavoriteColor(blackHeartIcon);
      }
    });
  }, [foodId, fvtRec, inProg.meals]);

  const createEmbedYouTubeURL = (url) => {
    const videoId = url.split('https://www.youtube.com/watch?v=')[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const handleClick = () => {
    const inProgressRecipes = {
      meals: {
        ...inProg.meals,
        [foodId]: [strIngredient],
      },
      cocktails: {
        ...inProg.cocktails,
      },
    };
    setInProg(inProgressRecipes);
    push(`/foods/${foodId}/in-progress`);
  };

  const handleFavoriteColor = () => {
    if (favoriteColor === whiteHeartIcon) {
      setFavoriteColor(blackHeartIcon);
      const favoriteRecipes = [
        ...fvtRec,
        favoriteObj,
      ];
      setFvtRec(favoriteRecipes);
    }
    if (favoriteColor === blackHeartIcon) {
      setFavoriteColor(whiteHeartIcon);
      const removeFavote = fvtRec.filter(({ id }) => id !== foodId);
      setFvtRec(removeFavote);
    }
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
          <ShareAndFavorite
            url={ match.url }
            handleFavoriteColor={ handleFavoriteColor }
            favoriteColor={ favoriteColor }
          />
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
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write;
              encrypted-media; gyroscope; picture-in-picture"
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
