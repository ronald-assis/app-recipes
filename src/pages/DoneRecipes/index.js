import React from 'react';
import Header from '../../components/Header';
import DetailCards from '../../components/DetailCards';

export default function DoneRecipes() {
  const doneRecipesGet = JSON.parse(localStorage.getItem('doneRecipes'));
  const doneRecipesArray = Array.isArray(doneRecipesGet) ? doneRecipesGet : [];

  const [filter, setFilter] = React.useState('all');
  const filters = ['all', 'food', 'drink'];

  return (
    <div className="done-recipes">
      <Header
        showSearchButton={ false }
        title="Done Recipes"
      />
      <h1 data-testid="page-title">Done Recipes</h1>
      <div className="main-categories">

        {filters.map((filterCategory) => (
          <input
            type="button"
            value={ filterCategory }
            data-testid={ `filter-by-${filterCategory}-btn` }
            className="category"
            onClick={ () => setFilter(`${filterCategory}`) }
            key={ filterCategory }
          />
        ))}

      </div>
      <div>
        {doneRecipesArray
          .filter((value) => value.type === filter || filter === 'all')
          .map(({
            image,
            category,
            name,
            nationality,
            type,
            id,
            alcoholicOrNot,
            tags,
            doneDate,
          }, index) => {
            const cardCategory = type === 'food'
              ? `${nationality} - ${category}` : alcoholicOrNot;
            return (
              <DetailCards
                img={ image }
                category={ cardCategory }
                name={ name }
                tags={ tags }
                index={ index }
                key={ name + index }
                data={ doneDate }
                id={ id }
                type={ type }
              />
            );
          })}
      </div>
    </div>
  );
} // teste
