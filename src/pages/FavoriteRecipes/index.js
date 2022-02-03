import React from 'react';
import Header from '../../components/Header';
import DetailCards from '../../components/DetailCards';

export default function FavoriteRecipes() {
  const favoriteRecipes = localStorage.getItem('favoriteRecipes');
  const favoriteRecipesJSON = JSON.parse(favoriteRecipes);

  const [filter, setFilter] = React.useState('all');
  const filters = ['all', 'food', 'drink'];

  return (
    <div className="favorite-recipes">
      <Header
        showSearchButton={ false }
        title="Favorite Recipes"
      />
      <h1 data-testid="page-title">Favorite Recipes</h1>
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
        {favoriteRecipesJSON
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
                id={ id }
                type={ type }
              />
            );
          })}
      </div>
    </div>
  );
} //
