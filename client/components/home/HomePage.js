import React, { Component } from 'react';
import {Grid, Row, Col } from 'react-flexbox-grid';
import Login from './Login';

export default class HomePage extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col xs />
          <Col xs >
            <Login />
          </Col>
          <Col xs />
        </Row>
      </Grid>
    );
  }
}
