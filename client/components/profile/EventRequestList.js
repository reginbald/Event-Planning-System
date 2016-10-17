import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../redux/actions/userActions';
import * as eventRequestActions from '../../redux/actions/eventRequestActions';
import * as eventActions from '../../redux/actions/eventActions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextInput from '../common/TextInput';

const cardStyle = {
  margin: 12
};

class EventRequestList extends Component {
  constructor(props){
    super(props);
    console.log(props);
  }

  handleAccept(requestid) {
    this.props.actions.updateEventRequestStatus({id:requestid, status:this.props.statusaccept});
    const requestObject = this.props.eventRequests.filter(x => x.id === requestid);
    this.props.actions.createNewEvent(requestObject[0]);
  }

  handleDeny(requestid) {
    this.props.actions.updateEventRequestStatus({id:requestid, status:this.props.statusdenied});
  }
  render() {
    return (
      <div>
        {this.props.eventRequests.map(eventRequest =>
        <MuiThemeProvider key={eventRequest.id}>
          <Card style={cardStyle}>
            <CardHeader
              title={eventRequest.event_type}
              subtitle={eventRequest.name}
              actAsExpander={true}
              showExpandableButton={true} />
            <CardActions>
              <FlatButton label="Deny" secondary={true} onClick={this.handleDeny.bind(this, eventRequest.id)}/>
              <FlatButton label="Accept" primary={true} onClick={this.handleAccept.bind(this, eventRequest.id)}/>
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
    events: state.events
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, userActions, eventRequestActions, eventActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventRequestList);
