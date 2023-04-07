import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

import { Layout } from '../layouts';
import MealWizard from '../components/MealWizard';
import transformer from '../helpers/transformer';

const Meal = () => {
  const { mealId } = useParams();
  const [ meal, setMeal ] = useState();

  useEffect(() => {
    (async () => {
      try {
        const { data: meal } = await axios.get('https://apis.career.otsimo.xyz/api/restaurant/get/'+ mealId);
        const { data: ingredients } = await axios.get('https://apis.career.otsimo.xyz/api/restaurant/listIngredients');
        
        setMeal(transformer(meal, ingredients));
      } catch(err) {
        toast('Network Error!', { type: 'error' });
      }
    }).call(null);
  }, []);

  return (
    <Layout>
      <Helmet>
        <title>Transparent Restaurant - Meal Detail</title>
      </Helmet>
      { meal && <MealWizard meal={meal} /> }
    </Layout>
  );
};

export default Meal;