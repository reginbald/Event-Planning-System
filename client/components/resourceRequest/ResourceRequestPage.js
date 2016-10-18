import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextInput from '../common/TextInput';
import DatePicker from 'material-ui/DatePicker';
import SelectInput from '../common/SelectInput';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {Grid, Row, Col } from 'react-flexbox-grid';
import Snackbar from 'material-ui/Snackbar';
import * as jobApplicationActions from '../../redux/actions/jobApplicationActions';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

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

class ResourceRequestPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open:false,
			snack: false,
      newJobApplication: {
        contract_type: 'full_time',
				departmentid: 0,
				recruitment_request_id: null,
				years_experience: 0,
				job_title: '',
				job_description: ''
      }
		};
		this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
		this.updateEventState = this.updateEventState.bind(this);
		this.requestSelected = this.requestSelected.bind(this);
	}

	handleOpen() {
    this.setState({open: true});
  };

  handleClose() {
    this.setState({open: false});
  };

  handleSubmit() {
		this.props.actions.addNewJobApplication(this.state.newJobApplication);
		this.setState({snack: true});
    this.setState({open: false});
  }

  updateEventState(event) {
    const field = event.target.name;
    let newJobApplication = this.state.newJobApplication;
    newJobApplication[field] = event.target.value;
    return this.setState({newJobApplication, newJobApplication});
  }

	requestSelected(id) {
		this.setState({
			newJobApplication: { 
				recruitment_request_id: this.props.resourceRequests[id].id,
				contract_type: this.props.resourceRequests[id].contract_type,
				departmentid: this.props.resourceRequests[id].departmentid,
				years_experience: this.props.resourceRequests[id].years_experience,
				job_title: this.props.resourceRequests[id].job_title,
				job_description: this.props.resourceRequests[id].job_description
			}
		});
		console.log("STATE ", this.state.newJobApplication);
		console.log("ID ", this.props.resourceRequests[id].departmentid);
		this.setState({open: true});
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
		<h1>Resource Requests</h1>
			<MuiThemeProvider>
			<div>
				<Snackbar
					open={this.state.snack}
					message="Job Application Posted"
					autoHideDuration={4000}
				/>
				<Dialog
					title="New Job Application"
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
							defaultSelected={this.state.newJobApplication.contract_type}
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
						defaultSelected={this.state.newJobApplication.departmentid}
						labelPosition="left"
						lable="Contract Type"
						onChange={this.updateEventState}>
						<RadioButton
							value={0}
							label="Administration Department"
							style={radioButtonStyle}
						/>
						<RadioButton
							value={1}
							label="Production Department"
							style={radioButtonStyle}
						/>
						<RadioButton
							value={2}
							label="Service Department"
							style={radioButtonStyle}
						/>
						<RadioButton
							value={3}
							label="Financial Department"
							style={radioButtonStyle}
						/>
						<RadioButton
							value={4}
							label="Management Department"
							style={radioButtonStyle}
						/>
					</RadioButtonGroup>
					<Row>
						<Col xs >
							<TextField
								name="years_experience"
								label="Years of Experience"
								value={this.state.newJobApplication.years_experience}
								placeholder="2"
								onChange={this.updateEventState}/>
						</Col>
						<Col xs >
							<TextField
								name="job_title"
								label="job_title"
								value={this.state.newJobApplication.job_title}
								placeholder="Photographer"
								onChange={this.updateEventState}/>
						</Col>
					</Row>
					<Row>
						<Col xs>
							<TextField
								name="job_description"
								label="job_description"
								value={this.state.newJobApplication.job_description}
								placeholder="Job Description"
								onChange={this.updateEventState}/>
						</Col>
					</Row>
					</Grid>
				</Dialog>
				<Table onRowSelection={this.requestSelected}>
					<TableHeader displaySelectAll={false}>
						<TableRow>
							<TableHeaderColumn>Job Title</TableHeaderColumn>
							<TableHeaderColumn>Contract Type</TableHeaderColumn>
							<TableHeaderColumn>Department</TableHeaderColumn>
							<TableHeaderColumn>Years of Experience</TableHeaderColumn>
							<TableHeaderColumn>Created</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody showRowHover={true} displayRowCheckbox={false}>
					{this.props.resourceRequests.map(function(element){
						return <TableRow key={element.id}>
							<TableRowColumn>{element.job_title}</TableRowColumn>
							<TableRowColumn>{element.contract_type}</TableRowColumn>
							<TableRowColumn>{element.departmentid}</TableRowColumn>
							<TableRowColumn>{element.years_experience}</TableRowColumn>
							<TableRowColumn>{element.created_at}</TableRowColumn>
						</TableRow>;
					})}
					</TableBody>
				</Table>
			</div>
			</MuiThemeProvider>
		</div>
		);
	}
}
function mapStateToProps(state, ownProps) {
	return {
		resourceRequests: state.resourceRequests
	};
}
function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(jobApplicationActions, dispatch)
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(ResourceRequestPage);
