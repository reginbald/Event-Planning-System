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
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import {Grid, Row, Col } from 'react-flexbox-grid';

const cardStyle = {
  margin: 12
};

class EventRequestList extends Component {
  constructor(props){
    super(props);
    this.state = {
      open:false,
      newEvent: {
        name: '',
        clientid: null,
        eventrequestid: null,
        event_type: '',
        description: '',
        attendees: null,
        budget: null,
        from: null,
        to: null,
        decorations: '',
        food_drinks: '',
        filming_photos: '',
        music: '',
        poster_art: '',
        computer_issues: '',
        other_needs: ''
      }
    };
    this.renderButtons = this.renderButtons.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.mapRequestToEvent = this.mapRequestToEvent.bind(this);
    this.updateEventState = this.updateEventState.bind(this);
  }

  handleAccept(requestid) {
    this.props.actions.updateEventRequestStatus({id:requestid, status:this.props.statusaccept});
    const requestObject = this.props.eventRequests.filter(x => x.id === requestid);
  }

  handleCreate() {
    console.log("event ", this.state.newEvent);
    this.setState({open: false});
    this.props.actions.updateEventRequestStatus({id:this.state.newEvent.eventrequestid, status:this.props.statusaccept});
    this.props.actions.createNewEvent(this.state.newEvent);
  }

  handleDeny(requestid) {
    this.props.actions.updateEventRequestStatus({id:requestid, status:this.props.statusdenied});
  }

  handleOpen(requestid) {
    const request = this.props.eventRequests.filter(x => x.id === requestid)[0];
    this.mapRequestToEvent(request);
    this.setState({open: true});
  };

  mapRequestToEvent(request){
    this.state.newEvent.name = request.name;
    this.state.newEvent.clientid = request.clientid;
    this.state.newEvent.eventrequestid = request.id;
    this.state.newEvent.event_type = request.event_type;
    this.state.newEvent.attendees = request.attendees;
    this.state.newEvent.budget = request.budget;
    this.state.newEvent.from = request.from;
    this.state.newEvent.to = request.to;
  }

  updateEventState(event) {
    const field = event.target.name;
    let newEvent = this.state.newEvent;
    newEvent[field] = event.target.value;
    return this.setState({newEvent, newEvent});
  }

  handleClose() {
    this.setState({open: false});
  };

  renderButtons(eventRequest){
    let buttons;
    if (this.props.createevent) {
      buttons = (
        <div>
        <FlatButton label="Create Event" primary={true} onClick={this.handleOpen.bind(this, eventRequest.id)}/>
        </div>
      );
    } else {
      buttons = (
        <div>
        <FlatButton label="Deny" secondary={true} onClick={this.handleDeny.bind(this, eventRequest.id)}/>
        <FlatButton label="Accept" primary={true} onClick={this.handleAccept.bind(this, eventRequest.id)}/>
        </div>
      );
    }
    return buttons;
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleCreate}
      />,
    ];
    return (
      <div>
        {this.props.eventRequests.map(eventRequest =>
        <MuiThemeProvider key={eventRequest.id}>
        <div>
        <Dialog
          title="Create Event"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}>
          <Grid>
            <Row>
              <Col>
                <Row><TextField
                  name="clientid"
                  floatingLabelFixed={true}
                  floatingLabelText="Client Id"
                  disabled={true}
                  value={this.state.newEvent.clientid}/></Row>
                <Row><TextField
                  name="event_type"
                  floatingLabelFixed={true}
                  floatingLabelText="Event Type"
                  disabled={true}
                  value={this.state.newEvent.event_type}/></Row>
                <Row><TextField
                  name="description"
                  floatingLabelText="Description"
                  onChange={this.updateEventState}
                  value={this.state.newEvent.description}/></Row>
                <Row>
                  <Col><TextField
                  name="from"
                  floatingLabelFixed={true}
                  floatingLabelText="From"
                  disabled={true}
                  value={this.state.newEvent.from}/></Col>
                  <Col><TextField
                  name="to"
                  floatingLabelFixed={true}
                  floatingLabelText="To"
                  disabled={true}
                  value={this.state.newEvent.to}/></Col>
                </Row>
              </Col>
              <Col>
                <Row><TextField
                  name="attendees"
                  floatingLabelFixed={true}
                  floatingLabelText="Attendees"
                  disabled={true}
                  value={this.state.newEvent.attendees}/></Row>
                <Row><TextField
                  name="budget"
                  floatingLabelFixed={true}
                  floatingLabelText="Budget"
                  disabled={true}
                  value={this.state.newEvent.budget}/></Row>
              </Col>
            </Row>
            <Row>
              <Col><TextField
                  name="decorations"
                  floatingLabelText="Decorations"
                  onChange={this.updateEventState}
                  value={this.state.newEvent.decorations}/></Col>
              <Col><TextField
                  name="food_drinks"
                  floatingLabelText="Food/Drinks"
                  onChange={this.updateEventState}
                  value={this.state.newEvent.food_drinks}/></Col>
            </Row>
            <Row>
              <Col><TextField
                  name="filming_photos"
                  floatingLabelText="Filming/Photos"
                  onChange={this.updateEventState}
                  value={this.state.newEvent.filming_photos}/></Col>
              <Col><TextField
                  name="music"
                  floatingLabelText="Music"
                  onChange={this.updateEventState}
                  value={this.state.newEvent.music}/></Col>
            </Row>
            <Row>
              <Col><TextField
                  name="poster_art"
                  floatingLabelText="Poster/Art Work"
                  onChange={this.updateEventState}
                  value={this.state.newEvent.poster_art}/></Col>
              <Col><TextField
                  name="computer_issues"
                  floatingLabelText="Computer related issues"
                  onChange={this.updateEventState}
                  value={this.state.newEvent.computer_issues}/></Col>
            </Row>
            <Row>
              <Col><TextField
                  name="other_needs"
                  floatingLabelText="Other Needs"
                  onChange={this.updateEventState}
                  value={this.state.newEvent.other_needs}/></Col>
            </Row>
          </Grid>
        </Dialog>
          <Card style={cardStyle}>
            <CardHeader
              title={eventRequest.event_type}
              subtitle={eventRequest.name}
              actAsExpander={true}
              showExpandableButton={true} />
            <CardActions>
              {this.renderButtons(eventRequest)}
            </CardActions>
            <CardText expandable={true}>
              Budget: {eventRequest.budget}<br />
              From: {eventRequest.from} <br/>
              To: {eventRequest.to} <br/>
            </CardText>
          </Card>
          </div>
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
