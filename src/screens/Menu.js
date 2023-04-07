import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Grid, Card, Icon, Input, Button, Dropdown } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

import { Layout } from '../layouts';
import MealListItem from '../components/MealListItem';
import transformer from '../helpers/transformer';

const Menu = () => {

  const navigate = useNavigate();
  const [ meals, setMeals ] = useState([]);
  const [ order, setOrder ] = useState(null);
  const [ filter, setFilter ] = useState(null);
  const [ budget, setBudget ] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data: meals } = await axios.get('https://apis.career.otsimo.xyz/api/restaurant/listMeals');
        const { data: ingredients } = await axios.get('https://apis.career.otsimo.xyz/api/restaurant/listIngredients');
        
        setMeals(meals.map(m => transformer(m, ingredients)));
      } catch(err) {
        toast('Network Error!', { type: 'error' });
      }
    }).call(null);
  }, []);

  const changeOrder = (list) => {
    if (order === null)
      return list;

    return _.orderBy(list, 'name', order ? 'asc' : 'desc');
  };

  const filterMeals = (list) => {
    if (filter === null)
      return list;

    return _.filter(meals, (meal) => {
      return _.filter(meal.ingredients, (ingredient) => {
        return ingredient.groups && ingredient.groups.includes(filter)
      }).length === meal.ingredients.length;
    })
  };

  const result = changeOrder(filterMeals(meals));

  const findRandomMealByBudget = () => {
    const availableMeals = _.filter(result, (meal) => {
      return _.filter(meal.prices, (price) => budget >= price).length > 0
    });

    if (availableMeals.length) {
      const randomMeal = _.sample(availableMeals);
      navigate('/meal/'+ randomMeal.id, { state: { budget } });
    } else {
      toast('There is no meal for your budget.', { type: 'warning' });
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Transparent Restaurant - Menu</title>
      </Helmet>
      <Card fluid style={{ padding: '5px 15px' }}>
        <Grid columns={3} verticalAlign="middle">
          <Grid.Column>
            <a href="#" onClick={() => setOrder(!order)}>
              Name { order !== null && (order ? <Icon name='angle down' /> : <Icon name='angle up' />) }
            </a>
          </Grid.Column>
          <Grid.Column>
            <Input 
              placeholder="Your budget"
              onChange={(e) => setBudget(e.target.value)}
              action={
                <Button onClick={findRandomMealByBudget}>I feel lucky</Button>}
              />
          </Grid.Column>
          <Grid.Column style={{ textAlign: 'right' }}>
            <Dropdown text='Filter'>
              <Dropdown.Menu>
                <Dropdown.Item text='All' selected={filter === null} onClick={() => setFilter(null)} />
                <Dropdown.Item text='Vegetarian' selected={filter === 'vegetarian'} onClick={() => setFilter('vegetarian')} />
                <Dropdown.Item text='Vegan' selected={filter === 'vegan'} onClick={() => setFilter('vegan')} />
              </Dropdown.Menu>
            </Dropdown>
          </Grid.Column>
        </Grid>
      </Card>
      { result.map((meal, i) => <MealListItem key={i} meal={meal} />) }
    </Layout>
  );
};

export default Menu;
