import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../redux/actions/userActions';
import * as eventRequestActions from '../../redux/actions/eventRequestActions';
import {Grid, Row, Col } from 'react-flexbox-grid';
import CreateNewEventRequest from './CreateNewEventRequest';
import AddNewClient from './AddNewClient';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  /**
  * Render different Profileviews for different actors.
  */
  renderContent() {
    const { user } = this.props;

    switch (user.access) {
      case 0:
        return this.customerServiceProfile();
      case 1:
        return this.seniorCustomerServiceProfile();
      default:
        return <h1>default</h1>;
    }
  }

  seniorCustomerServiceProfile() {
    return(
        <Grid>
          <Row>
            <Col xs />
            <Col xs >
              <AddNewClient />
            </Col>
            <Col xs />
          </Row>
      </Grid>
    );
  }

  customerServiceProfile() {

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
    user: state.user,
    eventrequests: state.eventrequests,
    clients: state.clients
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, userActions, eventRequestActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
