import React from 'react';
import PropTypes from 'prop-types';
import ShareAndFavorite from '../ShareAndFavorite';
import Button from '../Button';
import './RecipeInProgressCard.css';

export default function RecipeInProgressCard({
  img, name, category, instructions, id, ingredients,
}) {
  // console.log(match);

  return (
    <div className="recipes-in-progress-card">
      <img
        src={ img }
        alt={ name }
        className="illustration"
        data-testid="recipe-photo"
      />

      <div className="title-and-buttons details">
        <h1 data-testid="recipe-title">{name}</h1>
        <ShareAndFavorite recipeId={ id } />
      </div>

      <p className="details" data-testid="recipe-category">{category}</p>
      <div className="ingredients details">
        <h3>Ingredients</h3>
        <div className="ingredients-step">
          {ingredients.map((ingredient, i) => (
            <label key={ i } htmlFor={ ingredient }>
              <input
                type="checkbox"
                name=""
                id={ ingredient }
                data-testid={ `${i}-ingredient-step` }
              />
              {' '}
              <span>{ingredient}</span>
            </label>

          ))}
        </div>
      </div>
      <div className="intructions details">
        <h3>Intructions</h3>
        <p data-testid="instructions">
          {instructions}
          test
        </p>
      </div>
      <Button
        title="Finish Recipe"
        dataTestid="finish-recipe-btn"
        handleClick={ () => console.log('clicou') }
      />
    </div>
  );
}

RecipeInProgressCard.propTypes = {
  img: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  instructions: PropTypes.string.isRequired,
};
