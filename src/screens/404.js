import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Grid, Header, Icon, Button } from 'semantic-ui-react';

import { Blank } from '../layouts';

const NotFound = () => {
  return (
    <Blank>
      <Helmet>
        <title>Transparent Restaurant - Not Found</title>
      </Helmet>
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' icon>
            <Icon name='warning sign' />
            Oops! This page doesn't exist.
          </Header>
          <Button as={Link} to="/" color='teal'>
            Go back to home
          </Button>
        </Grid.Column>
      </Grid>
    </Blank>
  );
};

export default NotFound;
