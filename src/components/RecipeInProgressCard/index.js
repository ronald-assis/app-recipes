import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../../context/context';
import ShareAndFavorite from '../ShareAndFavorite';
import Button from '../Button';
import './RecipeInProgressCard.css';

export default function RecipeInProgressCard({
  img, name, category, instructions, ingredients, id, title,
  tags, nationality = '', alcoholic = '',
}) {
  console.log(tags, nationality, alcoholic, category);
  const [disabled, setDisabled] = useState(true);
  const { checkedIngre, setCheckedIngre,
    doneRecipes, setDoneRecipes,
  } = useContext(RecipesContext);
  const { push } = useHistory();

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

  useEffect(() => {
    if (checkedIngre.length === ingredients.length) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [ingredients, checkedIngre]);

  const handleClick = () => {
    const data = new Date();
    const dataFormatada = (
      `${data.getDate()}/${(data.getMonth() + 1)}/${data.getFullYear()}`);
    const done = {
      id,
      type: title,
      nationality: nationality || '',
      category: category || '',
      alcoholicOrNot: alcoholic || '',
      name,
      image: img,
      doneDate: dataFormatada,
      tags: tags === null ? [] : [tags],
    };

    // quando a pessoa finaliza a receita, o botão de "Continue Recipe" continua aparecendo ao invés de Start Recipe.

    setCheckedIngre([]);
    setDoneRecipes([
      ...doneRecipes,
      done,
    ]);

    push('/done-recipes');
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

      <p className="details" data-testid="recipe-category">
        {category === '' ? alcoholic : category}
      </p>
      <div className="ingredients details">
        <h3>Ingredients</h3>
        <div className="ingredients-step">
          {ingredients.map((ingredient, i) => {
            const isChecked = checkCompleted(ingredient);
            return (
              <label
                key={ i }
                htmlFor={ ingredient }
                data-testid={ `${i}-ingredient-step` }
              >
                <input
                  type="checkbox"
                  name={ ingredient }
                  id={ ingredient }
                  checked={ isChecked }
                  onChange={ handleChange }
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
        disabled={ disabled }
        handleClick={ handleClick }
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
  title: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  nationality: PropTypes.string.isRequired,
  alcoholic: PropTypes.string.isRequired,
};
