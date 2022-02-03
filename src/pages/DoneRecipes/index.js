import React from 'react';
import Header from '../../components/Header';
import DetailCards from '../../components/DetailCards';

export default function DoneRecipes() {
  let doneRecipesData = [
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
  const doneRecipesGet = localStorage.getItem('doneRecipes');
  doneRecipesData = JSON.parse(doneRecipesGet);

  const [filter, setFilter] = React.useState('all');

  return (
    <div className="done-recipes">
      <Header
        showSearchButton={ false }
        title="Done Recipes"
      />
      <h1 data-testid="page-title">Done Recipes</h1>
      <div className="main-categories">
        <input
          type="button"
          value="All"
          data-testid="filter-by-all-btn"
          className="category"
          onClick={ () => setFilter('all') }
        />
        <input
          type="button"
          value="Food"
          data-testid="filter-by-food-btn"
          className="category"
          onClick={ () => setFilter('food') }
        />

        <input
          type="button"
          value="Drinks"
          data-testid="filter-by-drink-btn"
          className="category"
          onClick={ () => setFilter('drink') }
        />
      </div>
      <div>
        {doneRecipesData
          .filter((value) => value.type === filter || filter === 'all')
          .map(({
            image,
            category,
            name,
            tags,
            doneDate,
            nationality,
            type,
            id,
            alcoholicOrNot,
          }, index) => {
            if (type === 'food') {
              return (
                <DetailCards
                  img={ image }
                  category={ `${nationality} - ${category}` }
                  name={ name }
                  tags={ tags }
                  index={ index }
                  key={ name + index }
                  data={ doneDate }
                  id={ id }
                  type={ type }
                />
              );
            }
            return (
              <DetailCards
                img={ image }
                category={ alcoholicOrNot }
                name={ name }
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
}
