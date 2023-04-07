import _ from 'lodash';

import calculator from './calculator';

const neededIngredients = (meal, ingredients) => {
  return _.intersectionBy(ingredients, meal.ingredients, 'name');
};

const neededIngredientsWithQuantity = (meal, ingredients) => {
  const mealIngredients = neededIngredients(meal, ingredients);
  const mealIngredientsWithQuantity = _.merge(_.keyBy(mealIngredients, 'name'), _.keyBy(meal.ingredients, 'name'));
  
  return _.values(mealIngredientsWithQuantity); // return as an array.
};

export default (meal, ingredients) => {
  meal.prices = {};
  meal.scores = {};
  meal.ingredients = neededIngredientsWithQuantity(meal, ingredients);

  const qualityScore = { low: 10, medium: 20, high: 30 };

  for (const ingredient of meal.ingredients) {
    for (const option of ingredient.options) {
      option.cost = calculator.ingredientPriceByQuality(ingredient, option.quality);
      option.score = qualityScore[option.quality];
    }
  }

  const qualities = ['low', 'medium', 'high'];  

  for (const quality of qualities) {
    meal.prices[quality] = calculator.mealPriceByQuality(meal, quality);
    meal.scores[quality] = calculator.mealScoreByQuality(meal, quality);
  }

  return meal;
}