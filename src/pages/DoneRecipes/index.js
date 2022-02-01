import React from 'react';
import Header from '../../components/Header';

export default function DoneRecipes() {
  let doneRecipesData = [{
    id: 'id-da-receita',
    type: 'comida-ou-bebida',
    nationality: 'nacionalidade-da-receita-ou-texto-vazio',
    category: 'categoria-da-receita-ou-texto-vazio',
    alcoholicOrNot: 'alcoholic-ou-non-alcoholic-ou-texto-vazio',
    name: 'nome-da-receita',
    image: 'imagem-da-receita',
    doneDate: 'quando-a-receita-foi-concluida',
    tags: 'array-de-tags-da-receita-ou-array-vazio',
  }];

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
          value="Drink"
          data-testid="filter-by-drink-btn"
          className="category"
        />
      </div>
    </div>
  );
}
