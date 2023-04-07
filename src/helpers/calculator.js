import _ from 'lodash';

const getIngredientByQuality = (ingredient, quality) => {
  return _.find(ingredient.options, (i) => i.quality === quality);
}

export const mealScoreByQuality = (meal, quality) => {
  let score = 0;
  
  for (const ingredient of meal.ingredients) {
    score += ingredientScoreByQuality(ingredient, quality);
  }

  return Math.round(score / meal.ingredients.length);
};

export const mealPriceByQuality = (meal, quality) => {
  let price = 0;
  
  for (const ingredient of meal.ingredients) {
    price += ingredientPriceByQuality(ingredient, quality);
  }

  return +price.toFixed(2);
};

export const ingredientScoreByQuality = (ingredient, quality) => {
  const ingredientByQuality = getIngredientByQuality(ingredient, quality);

  if (ingredientByQuality.score)
    return ingredientByQuality.score;

  const scores = { low: 10, medium: 20, high: 30 };

  return scores[quality];
};

export const ingredientPriceByQuality = (ingredient, quality) => {
  const ingredientByQuality = getIngredientByQuality(ingredient, quality);

  if (ingredientByQuality.cost)
    return ingredientByQuality.cost;

  const extraFee = { low: 0.10, medium: 0.05 };

  let { quantity, quantity_type } = ingredient;
  let { price, per_amount } = ingredientByQuality;

  /*

  {
    "name": "Butter",
    "groups": [
        "vegetarian"
    ],
    "options": [
      {
        "name": "Grass-fed butter",
        "quality": "high",
        "price": 12,
        "per_amount": "kilogram"
      },
      {
        "name": "Conventional butter",
        "quality": "medium",
        "price": 8,
        "per_amount": "kilogram"
      },
      {
        "name": "Margarine",
        "quality": "low",
        "price": 4,
        "per_amount": "kilogram"
      }
    ],
    "quantity": 10,
    "quantity_type": "millilitre"
  }

  density of butter:
  0.911 g/mL

  kilograms = liters × ingredient density

  */

  if (
    ingredient.name === 'Butter' &&
    quantity_type === 'millilitre' &&
    per_amount === 'kilogram'
  ) {
    quantity = (quantity / 1000) * 0.911;
    quantity_type = 'kilogram';
  }

  if (['kilogram', 'litre'].includes(per_amount)) {
    price = parseFloat(price) / 1000;
  }

  if (['kilogram', 'litre'].includes(quantity_type)) {
    quantity = parseFloat(quantity) * 1000;
  }

  return +(price * quantity + (extraFee[quality] || 0)).toFixed(2);
}

export default {
  mealScoreByQuality, mealPriceByQuality, ingredientScoreByQuality, ingredientPriceByQuality
}