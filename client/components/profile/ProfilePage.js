import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userAction from '../../redux/actions/userActions';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h1>Profile</h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
