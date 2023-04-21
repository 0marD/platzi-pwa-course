import axios from 'axios'

const API_BASE_URL = 'https://www.themealdb.com/api/json/v2/1'

export default {
  getLatest,
  getRecipe
}

async function getLatest() {
  const response = await axios.get(`${API_BASE_URL}/latest.php`)
  const { meals } = response.data

  if (!meals) {
    throw new Error('Error fetching latest meals')
  }

  const recipes = meals.map((meal) => normalizeMeal(meal))

  return recipes
}

async function getRecipe(recipeId) {
  const response = await axios.get(`${API_BASE_URL}/lookup.php?i=${recipeId}`)
  const { meals } = response.data

  if (!meals) {
    throw new Error(`No meal found with id ${recipeId}`)
  }

  const recipe = normalizeMeal(meals[0])

  return recipe
}

function normalizeMeal(meal) {
  const {
    idMeal: id,
    strMeal: name,
    strCategory: category,
    strArea: origin,
    strInstructions: instructionsString,
    strMealThumb: thumbnail,
    strTags,
    strYoutube: youtube,
    strSource: url,
    dateModified,
  } = meal

  const instructions = instructionsString.split('\n').filter((instruction) => instruction.trim() !== '')
  const tags = strTags ? strTags.split(',') : []
  const ingredients = []

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`]
    const measure = meal[`strMeasure${i}`]

    if (ingredient !== '' && measure !== '') {
      ingredients.push({
        ingredient,
        measure,
      })
    }
  }

  return {
    id,
    name,
    category,
    origin,
    instructions,
    thumbnail,
    tags,
    youtube,
    ingredients,
    url,
    dateModified,
  }
}
