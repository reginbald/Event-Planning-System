import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

class EventPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			newApplication: {
				departmentid:'',
				eventid: ''
			},
			tasks: []
		};

		this.eventSelected = this.eventSelected.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.updateEventState = this.updateEventState.bind(this);
	}

	handleClose() {
		this.setState({open: false});
	}

	eventSelected(id) {
		this.setState({open: true});
		console.log("selected ", id);
	}

	handleSubmit() {
		console.log('submitting');
	}

	updateEventState(event) {
		const field = event.target.name;
		let eventRequest = this.state.eventRequest;
		eventRequest[field] = event.target.value;
		return this.setState({eventRequest, eventRequest});
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
				<h1>Events</h1>
					<MuiThemeProvider>
						<div>
							<Dialog
								title="New Application"
								actions={actions}
								modal={false}
								open={this.state.open}
								onRequestClose={this.handleClose}
								autoScrollBodyContent={true} >
								<TextInput placeholder="Task name.." />
							</Dialog>
							<Table onRowSelection={this.eventSelected}>
								<TableHeader displaySelectAll={false}>
									<TableRow>
										<TableHeaderColumn>Event Type</TableHeaderColumn>
										<TableHeaderColumn>Client Id</TableHeaderColumn>
										<TableHeaderColumn>Budget</TableHeaderColumn>
										<TableHeaderColumn>From</TableHeaderColumn>
										<TableHeaderColumn>To</TableHeaderColumn>
									</TableRow>
								</TableHeader>
								<TableBody showRowHover={true} displayRowCheckbox={false}>
								{this.props.events.map(function(element){
									return <TableRow key={element.id}>
										<TableRowColumn>{element.event_type}</TableRowColumn>
										<TableRowColumn>{element.clientid}</TableRowColumn>
										<TableRowColumn>{element.budget}</TableRowColumn>
										<TableRowColumn>{element.from}</TableRowColumn>
										<TableRowColumn>{Date(element.to)}</TableRowColumn>
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
		events: state.events
	};
}
function mapDispatchToProps(dispatch) {
	return {
		//actions: bindActionCreators(budgetRequestActions, dispatch)
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(EventPage);
