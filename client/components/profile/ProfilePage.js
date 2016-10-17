import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../redux/actions/userActions';
import * as eventRequestActions from '../../redux/actions/eventRequestActions';
import * as eventActions from '../../redux/actions/eventActions';
import * as employeeActions from '../../redux/actions/employeeActions';
import * as budgetRequestActions from '../../redux/actions/budgetRequestActions';
import * as resourceRequestActions from '../../redux/actions/resourceRequestActions';
import * as clientActions from '../../redux/actions/clientActions';
import {Grid, Row, Col } from 'react-flexbox-grid';
import CreateNewEventRequest from './CreateNewEventRequest';
import AddNewClient from './AddNewClient';
import BudgetRequest from './BudgetRequest';
import Clients from './Clients';
import Employees from './Employees';
import EventRequests from './EventRequests';
import Events from './Events';
import EventRequestList from './EventRequestList';
import CreateApplication from './CreateApplication';
import ResourceRequests from './ResourceRequests';
import CreateJobApplication from './CreateJobApplication';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
  }
  /**
  * Render different Profileviews for different actors.
  */
  renderContent() {
    const { user } = this.props;
    console.log("render");

    switch (user.access) {
      case 0:
        return this.customerServiceProfile();
      case 1:
        return this.seniorCustomerServiceProfile();
      case 2:
        return this.financialManagerProfile();
      case 3: 
        return this.administrationManagerProfile();
      case 4:
        if(user.departmentid === 1) {
          return this.productionDepartmentManagerProfile();
        }
        if(user.departmentid === 2){
          return this.serviceDepartmentManagerProfile();
        }
      case 5: 
        return this.teamProfile();
      case 6:
        return this.hrManagerProfile();

      default:
        return <h1>default</h1>;
    }
  }

  productionDepartmentManagerProfile() {
    this.props.actions.getEmployeesForDepartment(1);
    this.props.actions.getAllEvents();
    return(
        <Grid>
          <Row>
            <Col xs >
              <CreateApplication />
              <Events />
            </Col>
            <Col xs />
          </Row>
        </Grid>
      );
    }

  financialManagerProfile() {
    this.props.actions.getAllBudgetRequests();
    this.props.actions.getAllEmployees();
    return(
        <Grid>
          <Row>
            <Col xs />
            <Col xs >
              <BudgetRequest />
              <Clients />
              <Employees />
              <EventRequests />
            </Col>
            <Col xs />
          </Row>
      </Grid>
    );
  }

  serviceDepartmentManagerProfile() {
    return (
      <h1>Service Department Manager</h1>
    );
  }

  seniorCustomerServiceProfile() {
    this.props.actions.getAllEvents();
    const { eventRequests } = this.props;
    const list = eventRequests.filter(x => x.status === 'PENDING');
    return(
        <Grid>
          <Row>
            <Col xs >
              <Row>
                <Col>
                  <AddNewClient/>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Clients />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Events />
                </Col>
              </Row>
            </Col>
            <Col xs >
              <EventRequestList 
                statusaccept="SENIOR_ACCEPT"
                statusdenied="SENIOR_DENIED"
                eventRequests={list}/>
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

  hrManagerProfile() {
    this.props.actions.getAllEmployees();
    this.props.actions.getAllResourceRequests();
    return(
      <Grid>
        <Row>
          <Col>
            <Employees />
          </Col>
          <Col>
            <ResourceRequests/>
          </Col>
        </Row>
        <Row>
          <Col><CreateJobApplication/></Col>
        </Row>
      </Grid>
    );
  }

  administrationManagerProfile() {
    const { eventRequests } = this.props;
    const list = eventRequests.filter(x => x.status === 'FINANCIAL_ACCEPT');
    return(
      <Grid>
        <Row>
        <Col xs >
          <EventRequestList 
          statusaccept="ADMINISTRATION_ACCEPT"
          statusdenied="ADMINISTRATION_DENIED"
          eventRequests={list}/>
        </Col>
          <Col>
            <Clients/>
          </Col>
        </Row>
      </Grid>
    );
  }

  teamProfile() {
    return(
      <Grid>
        <Row>
          <Col>
          </Col>
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
      resourceRequestActions,
      clientActions,
      employeeActions,
      eventActions
    ), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
