import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../redux/actions/userActions';
import * as eventRequestActions from '../../redux/actions/eventRequestActions';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import CreateButton from './CreateButton';
import TextInput from '../common/TextInput';
import DatePicker from 'material-ui/DatePicker';
import RadioButton from 'material-ui/RadioButton';
import SelectInput from '../common/SelectInput';


const paperStyle = {
  height: 70,
  width: 300,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};
class CreateNewEventRequest extends Component {
  constructor(props){
    super(props);
    this.state = {
      open:false,
      optionValue:'',
      newEventRequest: {
        name:'',
        budget: '',
        clientid:'0',
        event_type: '',
        numberofattendees: '',
        decorations:false,
        soft_hot_drinks: false,
        breakfast_lunch_dinner: false,
        photosfilming: false,
        parties: false,
        from: '',
        to:'',
        status: '',
        financial_feedback: '',
        discount:''
      }
    }
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setDecorations = this.setDecorations.bind(this);
    this.setParties = this.setParties.bind(this);
    this.setFilming = this.setFilming.bind(this);
    this.setFood = this.setFood.bind(this);
    this.setDrinks = this.setDrinks.bind(this);
    this.updateEventState = this.updateEventState.bind(this);
    this.updateStartDate = this.updateStartDate.bind(this);
    this.updateEndDate = this.updateEndDate.bind(this);
    this.updateClient = this.updateClient.bind(this);
  }

  handleOpen() {
    this.setState({open: true});
  };

  handleClose() {
    this.setState({open: false});
  };

  handleSubmit() {
    const finalizedRequest = this.state.newEventRequest;
    this.setState({open: false});

    this.props.actions.createNewEventRequest(finalizedRequest);
  }

  updateEventState(event) {
    const field = event.target.name;
    let newEventRequest = this.state.newEventRequest;
    newEventRequest[field] = event.target.value;
    return this.setState({newEventRequest, newEventRequest});
  }

  updateStartDate(event,date) {
    this.setState({
      newEventRequest: Object.assign({}, this.state.newEventRequest, {
        startdate: date
      })
    });
  }
  updateEndDate(event,date) {
    this.setState({
      newEventRequest: Object.assign({}, this.state.newEventRequest, {
        enddate: date
      })
    });
  }

  setDecorations() {
    this.setState({
      newEventRequest: Object.assign({}, this.state.newEventRequest, {
        decorations: !this.state.newEventRequest.decorations
      })
    });
  }

  setParties() {
    this.setState({
      newEventRequest: Object.assign({}, this.state.newEventRequest, {
        parties: !this.state.newEventRequest.parties
      })
    });
  }
  setFilming() {
    this.setState({
      newEventRequest: Object.assign({}, this.state.newEventRequest, {
        photosfilming: !this.state.newEventRequest.photosfilming
      })
    });
  }
  setFood() {
    this.setState({
      newEventRequest: Object.assign({}, this.state.newEventRequest, {
        food: !this.state.newEventRequest.food
      })
    });
  }
  setDrinks() {
    this.setState({
      newEventRequest: Object.assign({}, this.state.newEventRequest, {
        drinks: !this.state.newEventRequest.drinks
      })
    });
  }
  updateClient(event, index, value) {
    this.setState({
      optionValue: value,
      newEventRequest: Object.assign({}, this.state.newEventRequest, {
        clientid: index
      })
    })
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
        onTouchTap={this.handleSubmit}
      />,
    ];
    return (
      <div>
        <MuiThemeProvider>
          <Paper style={paperStyle} zDepth={1} rounded={false} >
            <CreateButton
              label="Create Event Request"
              onTouchTap={this.handleOpen}
              secondary={true} />
            <Dialog
              title="New event request"
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
              autoDetectWindowHeight={true}
              autoScrollBodyContent={true}>
              <SelectInput
                value={this.state.optionValue}
                options={this.props.clients}
                onChange={this.updateClient}
                hintText="Select Client" />
              <TextInput
                name="event_type"
                label="Event type"
                placeholder="Birthday, graduations..."
                onChange={this.updateEventState}/>
              <TextInput
                name="numberofattendees"
                label="Number of attendees"
                onChange={this.updateEventState}/>
              <TextInput
                name="budget"
                label="Budget"
                placeholder="Expected budget in $"
                onChange={this.updateEventState}/>
              <DatePicker
                hintText="Start Date"
                onChange={this.updateStartDate}/>
              <DatePicker
                hintText="End Date"
                onChange={this.updateEndDate}/>
                <RadioButton
                onClick={this.setDecorations}
                label="Decorations"
                checked={this.state.newEventRequest.decorations === true} />
                <RadioButton
                onClick={this.setParties}
                label="Parties"
                checked={this.state.newEventRequest.parties === true} />
                <RadioButton
                onClick={this.setFilming}
                label="Photos/Filming"
                checked={this.state.newEventRequest.photosfilming === true} />
                <RadioButton
                onClick={this.setFood}
                label="Breakfast/Lunch/Dinner"
                checked={this.state.newEventRequest.food === true} />
                <RadioButton
                onClick={this.setDrinks}
                label="Soft/Hot drinks"
                checked={this.state.newEventRequest.drinks === true} />
            </Dialog>
          </Paper>
        </MuiThemeProvider>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
    clients: state.clients,
    eventRequests: state.eventRequest
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, userActions, eventRequestActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewEventRequest);
