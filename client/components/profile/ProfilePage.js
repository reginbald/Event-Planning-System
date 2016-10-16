import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../redux/actions/userActions';
import * as eventRequestActions from '../../redux/actions/eventRequestActions';
import * as budgetRequestActions from '../../redux/actions/budgetRequestActions';
import * as clientActions from '../../redux/actions/clientActions';
import * as employeeActions from '../../redux/actions/employeeActions';
import {Grid, Row, Col } from 'react-flexbox-grid';
import CreateNewEventRequest from './CreateNewEventRequest';
import AddNewClient from './AddNewClient';
import BudgetRequest from './BudgetRequest';
import Clients from './Clients';
import Employees from './Employees';
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
    this.props.actions.getAllBudgetRequests();
    this.props.actions.getAllClients();
    this.props.actions.getAllEmployees();
    return(
        <Grid>
          <Row>
            <Col xs />
            <Col xs >
              <BudgetRequest />
              <Clients />
              <Employees />
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
    actions: bindActionCreators(
      Object.assign({}, 
      userActions, 
      eventRequestActions, 
      budgetRequestActions, 
      clientActions,
      employeeActions
    ), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
