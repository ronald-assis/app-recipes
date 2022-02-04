import React from 'react';
import Header from '../../components/Header';
import DetailCards from '../../components/DetailCards';

export default function DoneRecipes() {
  const doneRecipesData = [ // Test variables
    {
      id: '52771',
      type: 'food',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];

  localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesData));
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
} //
