import React, { useContext, useState, useEffect } from 'react';
import RecipesContext from '../../context/context';
import globalFetch from '../../services/globalFetch';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import './RecipeDetails.css';

export default function RecipeFoodDetails() {
  const { detailsDrinkId } = useContext(RecipesContext);
  const [details, setDetails] = useState([]);
  const [id, setId] = useState('178319');
  const strIngredient = [];

  const URL_DRINKS = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  useEffect(() => {
    globalFetch(URL_DRINKS)
      .then(({ drinks }) => setDetails(drinks));
    setId(detailsDrinkId);
  }, [id]);

  details.map((e) => (
    strIngredient.push(
      `${e.strIngredient1} -  ${e.strMeasure1}`,
      `${e.strIngredient2} -  ${e.strMeasure2}`,
      `${e.strIngredient3} -  ${e.strMeasure3}`,
      `${e.strIngredient4} -  ${e.strMeasure4}`,
      `${e.strIngredient5} -  ${e.strMeasure5}`,
      `${e.strIngredient6} -  ${e.strMeasure6}`,
      `${e.strIngredient7} -  ${e.strMeasure7}`,
      `${e.strIngredient8} -  ${e.strMeasure8}`,
      `${e.strIngredient9} -  ${e.strMeasure9}`,
      `${e.strIngredient10} -  ${e.strMeasure10}`,
      `${e.strIngredient11} -  ${e.strMeasure11}`,
      `${e.strIngredient12} -  ${e.strMeasure12}`,
      `${e.strIngredient13} -  ${e.strMeasure13}`,
    )
  ));

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
          <div>
            <button type="button" data-testid="share-btn">
              <img src={ shareIcon } alt="Share button" />
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
          <div>
            <p data-testid={ `${0}-recomendation-card` }>foods</p>
            <p data-testid={ `${1}-recomendation-card` }>foods</p>
          </div>
        </div>
        <button
          type="button"
          className="start-recipe-button details"
          data-testid="start-recipe-btn"
        >
          Start Recipe
        </button>
      </div>

    ))
  );
}
