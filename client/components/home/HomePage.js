import React, { Component } from 'react';
import {Grid, Row, Col } from 'react-flexbox-grid';
import LoginForm from './LoginForm';

export default class HomePage extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col xs />
          <Col xs >
            <LoginForm />
          </Col>
          <Col xs />
        </Row>
      </Grid>
    );
  }
}
