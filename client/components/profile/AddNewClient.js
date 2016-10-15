import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../redux/actions/userActions';
import * as eventRequestActions from '../../redux/actions/eventRequestActions';
import * as clientActions from '../../redux/actions/clientActions';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import CreateButton from './CreateButton';
import TextInput from '../common/TextInput';


const paperStyle = {
  height: 70,
  width: 300,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};
class AddNewClient extends Component {
  constructor(props){
    super(props);
    this.state = {
      open:false,
      newClient: {
        name: '',
        email:''
      }
    }
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateEventState = this.updateEventState.bind(this);
  }

  handleOpen() {
    this.setState({open: true});
  };

  handleClose() {
    this.setState({open: false});
    console.log('props', this.props);
  };

  handleSubmit() {
    const finalizedClient = this.state.newClient;
    this.props.actions.addNewClient(finalizedClient);
    this.setState({open: false});
    console.log('props', this.props);
    /*const finalizedRequest = this.state.newEventRequest;
    this.setState({open: false});

    this.props.actions.createNewEventRequest(finalizedRequest);*/
  }

  updateEventState(event) {
    const field = event.target.name;
    let newClient = this.state.newClient;
    newClient[field] = event.target.value;
    return this.setState({newClient, newClient});
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
              label="Create client"
              onTouchTap={this.handleOpen}
              secondary={true} />
            <Dialog
              title="New client"
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
              autoDetectWindowHeight={true}
              autoScrollBodyContent={true}>
              <TextInput
                name="name"
                label="Name"
                onChange={this.updateEventState}/>
              <TextInput
                name="email"
                label="Email"
                onChange={this.updateEventState}/>
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
    eventrequests: state.eventrequests
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, userActions, eventRequestActions, clientActions), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNewClient);
