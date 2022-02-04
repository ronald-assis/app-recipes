import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../../context/context';
import ShareAndFavorite from '../ShareAndFavorite';
import Button from '../Button';
import './RecipeInProgressCard.css';

export default function RecipeInProgressCard({
  img, name, category, instructions, ingredients, id,
}) {
  const { checkedIngre, setCheckedIngre } = useContext(RecipesContext);
  // const [checkCompleted, setCheckCompleted] = useState(false);

  const checkCompleted = (ingredient) => checkedIngre.some((i) => i === ingredient);

  const handleChange = ({ target }) => {
    const ingredientsValidation = checkedIngre.some((i) => i === target.name);
    if (!ingredientsValidation) {
      setCheckedIngre((ps) => [...ps, target.name]);
    } else {
      const newCheckedIngre = checkedIngre.filter((a) => a !== target.name);
      setCheckedIngre(newCheckedIngre);
    }
  };

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
          {ingredients.map((ingredient, i) => {
            const isChecked = checkCompleted(ingredient);
            return (
              <label key={ i } htmlFor={ ingredient }>
                <input
                  type="checkbox"
                  name={ ingredient }
                  id={ ingredient }
                  checked={ isChecked }
                  onChange={ handleChange }
                  data-testid={ `${i}-ingredient-step` }
                />
                {' '}
                {isChecked ? (
                  <s>{ingredient}</s>
                ) : (
                  <span>{ingredient}</span>

                )}
              </label>
            );
          })}
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
