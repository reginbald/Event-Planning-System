import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import CreateButton from './CreateButton';
import TextInput from '../common/TextInput';
import DatePicker from 'material-ui/DatePicker';
import RadioButton from 'material-ui/RadioButton';
/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */

const paperStyle = {
  height: 70,
  width: 300,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};
export default class CreateNewEventRequest extends Component {
  constructor(props){
    super(props);
    this.state = {
      open:false,
      newEventRequest: {
        clientname: '',
        eventtype: '',
        numberofattendees: '',
        budget: '',
        startdate: '',
        enddate:'',
        decorations:false,
        parties: false,
        photosfilming: false,
        softhotdrinks:false,
      }
    }
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setDecorations = this.setDecorations.bind(this);
  }

  handleOpen() {
    this.setState({open: true});
  };

  handleClose() {
    this.setState({open: false});
  };

  handleSubmit() {
    console.log("submitting event request");
    this.setState({open: false});
  }

  setDecorations() {
    console.log("setDecorations called")
    console.log(this);
    this.setState({
      newEventRequest: Object.assign({}, this.state.newEventRequest, {
        decorations: !this.state.newEventRequest.decorations
      })
    });
    //console.log("current state", this.state.newEventRequest.decorations);
    //this.state.newEventRequest.decorations = !this.state.newEventRequest.decorations;
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
              autoDetectWindowHeight={true} >
              <TextInput
                label="Client Name" />
              <TextInput
                label="Event type"
                placeholder="Birthday, graduations..."/>
              <TextInput
                label="Number of attendees" />
              <TextInput
                label="Budget"
                placeholder="Expected budget in $" />
              <DatePicker hintText="Start Date" />
              <DatePicker hintText="End Date" />
                <RadioButton
                onClick={this.setDecorations}
                label="Decorations"
                checked={this.state.newEventRequest.decorations === true} />
            </Dialog>
          </Paper>
        </MuiThemeProvider>
      </div>
    );
  }
}
