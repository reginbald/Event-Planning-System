import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {Grid, Row, Col } from 'react-flexbox-grid';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import TextInput from '../common/TextInput';

import * as resourceRequestActions from '../../redux/actions/resourceRequestActions';

const paperStyle = {
  height: 70,
  width: 300,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

const buttonStyle = {
  margin: 14
};

const radioButtonStyle = {
    marginBottom: 16,
};

class CreateResourceRequest extends Component {
	constructor(props){
		super(props);
		this.state = {
			open:false,
			snack: false,
			newResourceRequest: {
				contract_type: 'full_time',
				departmentid: 0,
				recruitment_request_id: 4,
				years_experience: 0,
				job_title: '',
				job_description: ''
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
	};

	handleSubmit() {
		this.props.actions.newResourceRequest(this.state.newResourceRequest);
		this.setState({snack: true});
		this.setState({open: false});
	}

	updateEventState(event) {
		const field = event.target.name;
		let newResourceRequest = this.state.newResourceRequest;
		newResourceRequest[field] = event.target.value;
		return this.setState({newResourceRequest, newResourceRequest});
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
			<MuiThemeProvider>
				<Paper style={paperStyle} zDepth={1} rounded={false} >
						<Snackbar
							open={this.state.snack}
							message="Resource Request Sent!"
							autoHideDuration={3000}
						/>
						<RaisedButton 
						label="Create Resource Request" 
						secondary={true} 
						style={buttonStyle}
						onTouchTap={this.handleOpen}/>
						<Dialog
							title="New Resource Request"
							actions={actions}
							modal={false}
							open={this.state.open}
							onRequestClose={this.handleClose}
							autoDetectWindowHeight={true}
							autoScrollBodyContent={true}>
							<Grid>
								<h3>Contract Type</h3>
								<RadioButtonGroup 
									name="contract_type" 
									defaultSelected="full_time"
									labelPosition="left"
									onChange={this.updateEventState}>
									<RadioButton
										value="full_time"
										label="Full time"
										style={radioButtonStyle}
									/>
									<RadioButton
										value="part_time"
										label="Part Time"
										style={radioButtonStyle}
									/>
								</RadioButtonGroup>
								<h3>Department</h3>
								<RadioButtonGroup 
								name="departmentid" 
								defaultSelected="0"
								labelPosition="left"
								lable="Contract Type"
								onChange={this.updateEventState}>
								<RadioButton
									value="0"
									label="Administration Department"
									style={radioButtonStyle}
								/>
								<RadioButton
									value="1"
									label="Production Department"
									style={radioButtonStyle}
								/>
								<RadioButton
									value="2"
									label="Service Department"
									style={radioButtonStyle}
								/>
								<RadioButton
									value="3"
									label="Financial Department"
									style={radioButtonStyle}
								/>
								<RadioButton
									value="4"
									label="Management Department"
									style={radioButtonStyle}
								/>
							</RadioButtonGroup>
							<Row>
								<Col xs >
									<TextInput
										name="years_experience"
										label="Years of Experience"
										placeholder="2"
										onChange={this.updateEventState}/>
								</Col>
								<Col xs >
									<TextInput
										name="job_title"
										label="job_title"
										placeholder="Photographer"
										onChange={this.updateEventState}/>
								</Col>
							</Row>
							<Row>
								<Col xs>
									<TextInput
										name="job_description"
										label="job_description"
										placeholder="Job Description"
										onChange={this.updateEventState}/>
								</Col>
							</Row>
							</Grid>
					</Dialog>
				</Paper>
			</MuiThemeProvider>
		);
	}
}

function mapStateToProps(state, ownProps) {
  return {
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(resourceRequestActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateResourceRequest);