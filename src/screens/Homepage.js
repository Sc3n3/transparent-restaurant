import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Container, Grid, Header, Image, Segment } from 'semantic-ui-react';

import RestaurantImage from '../assets/restaurant.jpg';
import { Layout } from '../layouts';

const Homepage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Transparent Restaurant - Home</title>
      </Helmet>
      <Segment style={{ marginTop: '4em' }} vertical>
        <Grid container stackable verticalAlign='middle'>
          <Grid.Row>
            <Grid.Column width={9}>
              <Header as='h3' style={{ fontSize: '2em' }}>
                We serve the best food in town
              </Header>
              <p style={{ fontSize: '1.33em' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum euismod augue id magna ullamcorper, vel feugiat justo commodo. Fusce gravida aliquet dolor, in blandit enim bibendum in.
              </p>
            </Grid.Column>
            <Grid.Column floated='right' width={6}>
              <Image bordered rounded size='large' src={RestaurantImage} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign='center'>
              <Link to='/menu' style={{ fontSize: '1.5em' }}>Check out our menu</Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment style={{ padding: '8em 0em' }} vertical>
        <Container textAlign='center'>
          <Header as='h3' style={{ fontSize: '2em' }}>
            About Us
          </Header>
          <p style={{ fontSize: '1.33em' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum euismod augue id magna ullamcorper, vel feugiat justo commodo. Fusce gravida aliquet dolor, in blandit enim bibendum in.
          </p>
        </Container>
      </Segment>

      <Segment style={{ padding: '4em 0em' }} vertical>
        <Container textAlign='center'>
          <Header as='h3' style={{ fontSize: '2em' }}>
            Contact Us
          </Header>
          <p style={{ fontSize: '1.33em' }}>
            123 Main St<br />
            Anytown, USA 12345<br />
            <a href='mailto:info@restaurant.com'>info@restaurant.com</a><br />
            (123) 456-7890
          </p>
        </Container>
      </Segment>
    </Layout>
  );
}

export default Homepage;
