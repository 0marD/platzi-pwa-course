import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import mealdb from '../mealdb-api';
import RecipeIngredients from '../components/RecipeIngredients';
import RecipeInstructions from '../components/RecipeInstructions';

export default function Recipe  ({ match }) {
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const recipeData = await mealdb.getRecipe(match.params.recipeId);
        setRecipe(recipeData);
        setIsLoading(false);
      } catch (e) {
        setRecipe(null);
        setIsLoading(false);
      }
    };
    getRecipe();
  }, [match.params.recipeId]);

  if (isLoading) {
    return <div className="message">Cargando...</div>;
  }

  if (!recipe) {
    return <div className="message">Hubo un problema :(</div>;
  }

  return (
    <div className="Recipe">
      <Helmet>
        <title>{recipe.name}</title>
      </Helmet>
      <div className="hero" style={{ backgroundImage: `url(${recipe.thumbnail})` }} />

      <div className="title">
        <div className="info">
          <h1>{recipe.name}</h1>
          <p>{recipe.origin}</p>
        </div>
      </div>

      <RecipeIngredients ingredients={recipe.ingredients} />

      <RecipeInstructions instructions={recipe.instructions} />
    </div>
  );
};