import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';
import mealdb from '../mealdb-api';

export default function Home () {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const recipes = await mealdb.getLatest();
        setRecipes(recipes);
      } catch (error) {
        console.error(error);
        setRecipes(null);
      }
      setIsLoading(false);
    };
    fetchRecipes();
  }, []);

  if (isLoading) {
    return <div className="message">Cargando...</div>;
  }

  return (
    <div>
      <Helmet>
        <title>Recetas</title>
      </Helmet>

      <div className="recipes">
        {recipes && recipes.map((recipe) => (
          <Link to={`/recipe/${recipe.id}`} className="recipe" key={recipe.id}>
            <span className="bg" style={{ backgroundImage: `url(${recipe.thumbnail})` }}></span>
            <span className="info">
              <h2>{recipe.name}</h2>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

