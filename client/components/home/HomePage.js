import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userAction from '../../redux/actions/userActions';
import {Grid, Row, Col } from 'react-flexbox-grid';
import LoginForm from './LoginForm';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.updateLoginState = this.updateLoginState.bind(this);
    this.login = this.login.bind(this);
  }

  updateLoginState(event) {
    console.log("updating state");
  }

  login(event) {
    event.preventDefault();
    console.log("confirming");
  }
  render() {
    console.log("Props from Homepage");
    console.log(this.props);
    return (
      <Grid>
        <Row>
          <Col xs />
          <Col xs >
            <LoginForm
              onChange={this.updateLoginState}
              onLogin={this.login}/>
          </Col>
          <Col xs />
        </Row>
      </Grid>
    );
  }
}
function mapStateToProps(state, ownProps) {
  return {
    user: state.user
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userAction, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
