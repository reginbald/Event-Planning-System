import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userAction from '../../redux/actions/userActions';
import {Grid, Row, Col } from 'react-flexbox-grid';
import CreateNewEventRequest from './CreateNewEventRequest';

class ProfilePage extends Component {
  constructor(props) {
    super(props);

  }
  /**
  * Render different Profileviews for different actors.
  */
  renderContent() {
    console.log('render content called');
    const { user } = this.props;
    switch (user.id) {
      case "0":
        return this.customerServiceProfile();
      default:
        return <h1>default</h1>;
    }
  }
  customerServiceProfile() {
      console.log('cust profile callled');
      return(
        <Grid>
          <Row>
            <Col xs />
            <Col xs >
              <CreateNewEventRequest />
            </Col>
            <Col xs />
          </Row>
        </Grid>
      );
  }

  render() {
    return(
      <div>
        {this.renderContent()}
      </div>
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
