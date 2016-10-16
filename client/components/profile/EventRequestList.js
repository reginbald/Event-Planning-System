
/*const EventRequestList = ({eventrequests}) => {
  console.log("eventrequest list has: ", eventrequests)
  return (
    <div>
      {eventrequests.map(eventrequest =>
      <MuiThemeProvider key={eventrequest.id}>
        <Card>
          <CardHeader
            title={eventrequest.event_type}
            subtitle={eventrequest.name}
            actAsExpander={true}
            showExpandableButton={true} />
          <CardActions>
            <FlatButton label="Deny" />
            <FlatButton label="Accept" />
          </CardActions>
          <CardText expandable={true}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>
        </Card>
      </MuiThemeProvider>)}
    </div>
  );
};

export default EventRequestList;*/
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../redux/actions/userActions';
import * as eventRequestActions from '../../redux/actions/eventRequestActions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextInput from '../common/TextInput';


class EventRequestList extends Component {
  constructor(props){
    super(props);
    console.log('eventrequestlist props:', props);
  }

  handleAccept(requestid) {
    console.log("accepting");
    console.log('requestid', requestid);
    console.log(this.props.actions);
    // send put on status="accepted"

  }

  handleDeny(requestid) {
    console.log("denying");
    console.log("requestid", requestid);
  }
  render() {
    const { eventRequests } = this.props;
    return (
      <div>
        {eventRequests.map(eventRequest =>
        <MuiThemeProvider key={eventRequest.id}>
          <Card>
            <CardHeader
              title={eventRequest.event_type}
              subtitle={eventRequest.name}
              actAsExpander={true}
              showExpandableButton={true} />
            <CardActions>
              <FlatButton label="Deny" onClick={this.handleDeny.bind(this, eventRequest.id)}/>
              <FlatButton label="Accept"onClick={this.handleAccept.bind(this, eventRequest.id)}/>
            </CardActions>
            <CardText expandable={true}>
              Budget: {eventRequest.budget}<br />
              From: {eventRequest.from} <br/>
              To: {eventRequest.to} <br/>
            </CardText>
          </Card>
        </MuiThemeProvider>)}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
    clients: state.clients,
    eventRequests: state.eventRequest.filter(e => e.status === "")
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, userActions, eventRequestActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventRequestList);
