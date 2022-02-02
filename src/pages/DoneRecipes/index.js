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
        />
        <input
          type="button"
          value="Food"
          data-testid="filter-by-food-btn"
          className="category"
        />

        <input
          type="button"
          value="Drinks"
          data-testid="filter-by-drink-btn"
          className="category"
        />
      </div>
      <div>
        {doneRecipesData.filter((item) => item.type === 'food')
          .map(({
            image,
            category,
            name,
            tags,
            doneDate,
            nationality,
          }, index) => (
            <DetailCards
              img={ image }
              category={ `${nationality} - ${category}` }
              name={ name }
              tags={ tags }
              index={ index }
              key={ name + index }
              data={ doneDate }
            />
          ))}
      </div>
      <div>
        {doneRecipesData.filter((item) => item.type === 'drink')
          .map(({
            image,
            alcoholicOrNot,
            name,
            doneDate,
          }, i) => (
            <DetailCards
              img={ image }
              category={ alcoholicOrNot }
              name={ name }
              index={ i }
              key={ name + i }
              data={ doneDate }
            />
          ))}
      </div>
    </div>
  );
}
