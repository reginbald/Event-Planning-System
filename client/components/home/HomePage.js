import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../redux/actions/userActions';
import {Grid, Row, Col } from 'react-flexbox-grid';
import LoginForm from './LoginForm';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        user: Object.assign({}, this.props.user)
    };

    this.updateLoginState = this.updateLoginState.bind(this);
    this.login = this.login.bind(this);
  }

  updateLoginState(event) {
    const field = event.target.name;
    let user = this.state.user;
    user[field] = event.target.value;
    return this.setState({user, user});
  }

  login(event) {
    event.preventDefault();
    const creds = {
      username: this.state.user.username,
      password: this.state.user.password
    };
    this.props.actions.loginuser(creds);
  }
  render() {
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
  let user = {id:'', username:'', password: '', authed:false}
  return {
    user: state.user
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
