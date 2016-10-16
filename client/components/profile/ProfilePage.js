import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../redux/actions/userActions';
import * as eventRequestActions from '../../redux/actions/eventRequestActions';
import {Grid, Row, Col } from 'react-flexbox-grid';
import CreateNewEventRequest from './CreateNewEventRequest';
import AddNewClient from './AddNewClient';
import EventRequestList from './EventRequestList';
import CreateApplication from './CreateApplication';

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
      case 4:
        if(user.departmentid === 1) {
          return this.productionDepartmentManagerProfile();
        }
        if(user.departmentid === 2){
          return this.serviceDepartmentManagerProfile();
        }
      default:
        return <h1>default</h1>;
    }
  }

  productionDepartmentManagerProfile() {
    return(
        <Grid>
          <Row>
            <Col xs >
              <CreateApplication />
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
    clients: state.clients,
    employees: state.employees
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, userActions, eventRequestActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
