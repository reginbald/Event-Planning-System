import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../redux/actions/userActions';
import * as eventRequestActions from '../../redux/actions/eventRequestActions';
import {Grid, Row, Col } from 'react-flexbox-grid';
import CreateNewEventRequest from './CreateNewEventRequest';
import AddNewClient from './AddNewClient';
import BudgetRequest from './BudgetRequest';
import EventRequestList from './EventRequestList';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
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
      case 2:
        return this.financialManagerProfile();
      default:
        return <h1>default</h1>;
    }
  }

  financialManagerProfile() {
    return(
        <Grid>
          <Row>
            <Col xs />
            <Col xs >
              <BudgetRequest />
            </Col>
            <Col xs />
          </Row>
      </Grid>
    );
  }

  seniorCustomerServiceProfile() {
    const { eventRequests } = this.props;
    return(
        <Grid>
          <Row>
            <Col xs >
              <EventRequestList />
            </Col>
            <Col xs >
              <AddNewClient />
            </Col>
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
    eventRequests: state.eventRequest,
    clients: state.clients
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, userActions, eventRequestActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
