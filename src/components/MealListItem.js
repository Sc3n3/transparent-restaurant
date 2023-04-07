import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Grid } from 'semantic-ui-react';

const MealListItem = ({ meal }) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{ meal.name }</Card.Header>
        <Grid columns={3}>
          <Grid.Column width={6}>
            { meal.ingredients.map((ingredient) => ingredient.name).join(', ') }
          </Grid.Column>
          <Grid.Column width={8} style={{ textAlign: 'center' }}>
            ${ meal.prices.low } - ${ meal.prices.high }
          </Grid.Column>
          <Grid.Column width={2} style={{ textAlign: 'right' }}>
            <Link to={'/meal/'+ meal.id}>
              See Detail
            </Link>
          </Grid.Column>
        </Grid>
      </Card.Content>
    </Card>
  );
};

export default MealListItem;