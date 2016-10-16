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


class CreateApplication extends Component {
  constructor(props){
    super(props);
    this.state = {
      open:false,
      newApplication: {
        departmendid: null,
        eventid: null  
      }
    }
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
          <Paper zDepth={1} rounded={false} >
            <CreateButton
              label="Create Application"
              onTouchTap={this.handleOpen}
              secondary={true} />
            <Dialog
              title="New application"
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
              autoDetectWindowHeight={true}
              autoScrollBodyContent={true}>
            </Dialog>
          </Paper>
        </MuiThemeProvider>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  console.log("mstp createapp", state);
  return {
    employees: state.employees
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, userActions, eventRequestActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateApplication);
