import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

const PRIORITY = [{id:0, name:'HIGH'}, {id:1, name:'MEDIUM'}, {id:2, name:'LOW'}];
const PRODUCTION_TASK_TYPES = [{id:0, name:'Decorations'}, {id:1, name:'Photos'}, {id:2, name:'Filming'}, {id:3, name:'Music/Audio'}, {id:4, name:'Graphic Design'}, {id:5, name:'Decorations'}, {id:6, name:'Computer Related'}];
const SERVICE_TASK_TYPES = [{id:0, name:'Chefs'}, {id:1, name:'Waitresses/Waiters'}];

class EventPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			taskTypeOptionValue: '',
			assigneeOptionValue: '',
			priorityOptionValue: '',
			newApplication: {
				departmentid: this.props.departmentid,
				eventid: ''
			},
			newTask: {
				applicationid: null,
				employeeid: null,
				senderid: this.props.user.id,
				type: '',
				description: '',
				priority: ''
			},
			tasks: [],
			totalTasks: 0,
			eventType: '',
			eventName:'',
			eventId: ''
		};
		console.log('event props: ', props);
		this.eventSelected = this.eventSelected.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.updateEventState = this.updateEventState.bind(this);
		this.updateAssignee = this.updateAssignee.bind(this);
		this.updatePriority = this.updatePriority.bind(this);
		this.updateTaskType = this.updateTaskType.bind(this);
	}

	handleClose() {
		this.setState({
			open: false,
			taskTypeOptionValue: '',
			assigneeOptionValue: '',
			priorityOptionValue: '',
			newTask: Object.assign({}, this.state.newTask, {
				applicationid: null,
				employeeid: null,
				senderid: this.props.user.id,
				type: '',
				description: '',
				priority: ''
			})
		})
	}

	eventSelected(id) {
		this.setState({open: true});
		console.log('id of event', this.props.events[id].id);
		this.setState({
			eventId: this.props.events[id].id,
			eventType: this.props.events[id].event_type,
			newTask: Object.assign({}, this.state.newApplication, {
				eventid: this.props.events[id].id
			})
		});
	}

	handleSubmit() {
		console.log('submitting');
		console.log(this.state.newTask);
	}

	updateEventState(event) {
		const field = event.target.name;
		let newTask = this.state.newTask;
		newTask[field] = event.target.value;
		return this.setState({newTask, newTask});
	}


	updateAssignee(event,index, value) {
		this.setState({
			assigneeOptionValue: value,
			newTask: Object.assign({}, this.state.newTask, {
				clientid: value
			})
		});
	}

	updatePriority(event, index, value) {
		this.setState({
      priorityOptionValue: value,
      newTask: Object.assign({}, this.state.newTask, {
        priority: PRIORITY[index]['name']
      })
    });
	}
	updateTaskType(event, index, value) {
		this.setState({
			taskTypeOptionValue: value,
			newTask: Object.assign({}, this.state.newTask, {
				type: value
			})
		});
	}

	render() {
		const { departmentEmloyees } = this.props;
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
								title={"New Application for event #"+this.state.eventId}
								actions={actions}
								modal={false}
								open={this.state.open}
								onRequestClose={this.handleClose}
								autoScrollBodyContent={true} >
								{this.state.eventType}
								<TextInput name="description" label="Task" onChange={this.updateEventState} placeholder="Description of task" />
								<SelectInput
									value={this.state.priorityOptionValue}
									options={PRIORITY}
									onChange={this.updatePriority}
									hintText="Set priority" />
								<SelectInput
									value={this.state.assigneeOptionValue}
									options={departmentEmloyees}
									onChange={this.updateAssignee}
									hintText="Select assignee" />
								{this.props.departmentid === 1 && <SelectInput
										value={this.state.taskTypeOptionValue}
										options={PRODUCTION_TASK_TYPES}
										onChange={this.updateTaskType}
										hintText="Select type" /> }
								{this.props.departmentid === 2 && <SelectInput
										value={this.state.taskTypeOptionValue}
										options={SERVICE_TASK_TYPES}
										onChange={this.updateTaskType}
										hintText="Select type" /> }
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
	console.log("mstp ep: ", state);
	return {
		events: state.events,
		departmentid: state.departmentid,
		departmentEmloyees: state.departmentEmloyees,
		user: state.user
	};
}
function mapDispatchToProps(dispatch) {
	return {
		//actions: bindActionCreators(budgetRequestActions, dispatch)
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(EventPage);
