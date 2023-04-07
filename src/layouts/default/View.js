import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

import {
  Container,
  Image,
  List,
  Menu,
  Segment,
  Loader,
  Dimmer
} from 'semantic-ui-react';

import logo from '../../assets/logo.svg';

const View = ({ children }) => {

  const [loading, setLoading] = useState(false);

  const updateAction = (status) => {
    return (params) => {
      setLoading(status);
      return params;
    };
  };

  const errorHandler = (err) => {
    setLoading(false);
    toast(err.message, { type: 'error' });
    return Promise.reject(err);
  };

  useEffect(() => {
    const reqInterceptor = axios.interceptors.request.use(updateAction(true), errorHandler);
    const resInterceptor = axios.interceptors.response.use(updateAction(false), errorHandler);
    
    return () => {
      axios.interceptors.request.eject(reqInterceptor);
      axios.interceptors.response.eject(resInterceptor);
    };
  }, []);

  return (
    <>

      <Dimmer active={loading} page>
        <Loader>Loading...</Loader>
      </Dimmer>

      <Menu fixed='top' inverted borderless>
        <Container>
          <Menu.Item as={Link} to="/" header>
            <Image size='mini' src={logo} style={{ marginRight: '1.5em' }} />
            Transparent Restaurant
          </Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item as={Link} to='/'>Home</Menu.Item>
            <Menu.Item as={Link} to='/menu'>Menu</Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>

      <Container style={{ marginTop: '5em', minHeight:'calc(100vh - 140px)' }}>
        { children }
      </Container>

      <Segment inverted vertical style={{ margin: '2em 0em 0em', padding: '2em 0em' }}>
        <Container textAlign='center'>
          <Image centered size='mini' src={logo} />
          <List horizontal inverted divided link size='small'>
            <List.Item as='a' href='#'>
              Site Map
            </List.Item>
            <List.Item as='a' href='#'>
              Contact Us
            </List.Item>
            <List.Item as='a' href='#'>
              Terms and Conditions
            </List.Item>
            <List.Item as='a' href='#'>
              Privacy Policy
            </List.Item>
          </List>
        </Container>
      </Segment>
    </>
  );
};

export default View;
