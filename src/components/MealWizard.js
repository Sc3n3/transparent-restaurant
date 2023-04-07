import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Card, Grid, Radio, Input, Button } from 'semantic-ui-react';

import calculator from '../helpers/calculator';

const MealWizard = ({ meal }) => {

  const location = useLocation();

  const [ score, setScore ] = useState('-');
  const [ price, setPrice ] = useState('-');
  const [ budget, setBudget ] = useState(location.state ? location.state.budget : null);
  const [ selections, setSelections ] = useState({});

  useEffect(() => {
    const selection = Object.entries(selections);

    if (selection.length === meal.ingredients.length) {
      let score = 0;
      let price = 0;
      
      for (const [name, quality] of selection) {
        const ingredient = _.find(meal.ingredients, (i) => i.name === name);
        price += calculator.ingredientPriceByQuality(ingredient, quality);
        score += calculator.ingredientScoreByQuality(ingredient, quality);
      }

      let scoreText = null;
      const overallScore = Math.round(score / meal.ingredients.length);

      switch (true) {
        case overallScore < 20:
          scoreText = '(Low)';
          break;
        case overallScore >= 20 && overallScore < 30:
          scoreText = '(Medium)';
          break;
        case overallScore >= 30:
          scoreText = '(High)';
          break;
      }

      setPrice('$'+ +price.toFixed(2));
      setScore([overallScore, scoreText].join(' '));
    }
  }, [ selections ]);
  
  // for getting right order
  const subIngredients = (ingredient, qualities = []) => {
    return qualities.map(quality => _.find(ingredient.options, (i) => i.quality === quality));
  };

  const setIngredientQuality = (e, { name, value }) => {
    setSelections((prev) => ({ ...prev, [name]: value }));
  };

  const bestQualityForBudget = () => {
    const qualityForBudget = _.maxBy(_.filter(_.keys(meal.prices), (key) => {
      return budget >= meal.prices[key]; 
    }), (key) => meal.prices[key]);
    
    if (qualityForBudget) {
      const newValues = {};
      for (const ingredient of meal.ingredients) {
        newValues[ingredient.name] = qualityForBudget;
      }
      setSelections((prev) => ({ ...prev, ...newValues }));
    } else {
      toast('Meal does not meet your budget.', { type: 'warning' });
    }
  };

  useEffect(() => {
    budget && bestQualityForBudget();
  }, []);

  return (
    <Card fluid>
      <Card.Content>
        <Grid columns={3}>
          <Grid.Column width={6}>
            <h3>{ meal.name }</h3>
          </Grid.Column>
          <Grid.Column width={5} style={{ textAlign: 'center' }}>
            Quality Score: <span style={{ fontWeight: 'bold', color: 'red' }}>{ score }</span>
          </Grid.Column>
          <Grid.Column width={5} style={{ textAlign: 'center' }}>
              Price: <span style={{ fontWeight: 'bold', color: 'red' }}>{ price }</span>
          </Grid.Column>
        </Grid>
        <Grid fluid style={{textAlign: 'center'}}>
          <Grid.Column>
            <Input 
              value={budget}
              placeholder="Your budget"
              onChange={(e) => setBudget(e.target.value)}
              action={
                <Button onClick={bestQualityForBudget}>Find the Best Quality</Button>}
              />
          </Grid.Column>
        </Grid>
        <Grid columns={4}>
          <Grid.Column style={{ fontWeight: 'bold' }}>Ingredients:</Grid.Column>
          <Grid.Column style={{ fontWeight: 'bold', textAlign: 'center', paddingLeft: '2em' }}>Low</Grid.Column>
          <Grid.Column style={{ fontWeight: 'bold', textAlign: 'center', paddingLeft: '2em' }}>Medium</Grid.Column>
          <Grid.Column style={{ fontWeight: 'bold', textAlign: 'center', paddingLeft: '2em' }}>High</Grid.Column>
          { meal.ingredients.map(({ name, ...ingredient }, i) => 
            <Grid.Row key={i}>
              <Grid.Column style={{ fontWeight: 'bold' }}>{ name }</Grid.Column>
              { subIngredients(ingredient, ['low', 'medium', 'high']).map((q, i) => 
                <Grid.Column key={i} style={{ textAlign: 'center' }}>
                  <Radio 
                    label={'$'+ q.cost} 
                    name={name} 
                    checked={selections[name] == q.quality}
                    value={q.quality}
                    onChange={setIngredientQuality}
                  />
                </Grid.Column>
              ) }
            </Grid.Row>
          ) }
          <Grid.Column></Grid.Column>
          <Grid.Column style={{ fontWeight: 'bold', textAlign: 'center', paddingLeft: '2em' }}>${ meal.prices.low }</Grid.Column>
          <Grid.Column style={{ fontWeight: 'bold', textAlign: 'center', paddingLeft: '2em' }}>${ meal.prices.medium }</Grid.Column>
          <Grid.Column style={{ fontWeight: 'bold', textAlign: 'center', paddingLeft: '2em' }}>${ meal.prices.high }</Grid.Column>
        </Grid>
      </Card.Content>
    </Card>
  );
};

export default MealWizard;