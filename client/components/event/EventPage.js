import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import TextInput from '../common/TextInput';
import * as applicationActions from '../../redux/actions/applicationActions';
import * as taskActions from '../../redux/actions/taskActions';
import * as eventActions from '../../redux/actions/eventActions';
import SelectInput from '../common/SelectInput';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import request from 'superagent';

const PRIORITY = [{id:0, name:'HIGH'}, {id:1, name:'MEDIUM'}, {id:2, name:'LOW'}];
const PRODUCTION_TASK_TYPES = [{id:0, name:'Decorations'}, {id:1, name:'Photos'}, {id:2, name:'Filming'}, {id:3, name:'Music/Audio'}, {id:4, name:'Graphic Design'}, {id:5, name:'Decorations'}, {id:6, name:'Computer Related'}];
const SERVICE_TASK_TYPES = [{id:0, name:'Chefs'}, {id:1, name:'Waitresses/Waiters'}];

class EventPage extends Component {
	constructor(props) {
		super(props);
		console.log('PROPS FROM EVENT PAGE', props);
		this.state = {
			open: false,
			taskTypeOptionValue: '',
			assigneeOptionValue: '',
			priorityOptionValue: '',
			newTask: {
				applicationid: null,
				employeeid: null,
				senderid: this.props.user.id,
				type: '',
				description: '',
				priority: ''
			},
			eventType: '',
			eventName:'',
			eventId: ''
		};
		this.eventSelected = this.eventSelected.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.updateEventState = this.updateEventState.bind(this);
		this.updateAssignee = this.updateAssignee.bind(this);
		this.updatePriority = this.updatePriority.bind(this);
		this.updateTaskType = this.updateTaskType.bind(this);
		this.createNewTask = this.createNewTask.bind(this);
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
		});
	}

	eventSelected(id) {
		console.log('array entry: ', id[0]);
		const eventEntry = id[0];
		console.log('prop events:', this.props.events);
		let evId = this.props.events[eventEntry].id
		console.log('eventID: ', evId);
		let eventApplicationAndTasks = this.props.eventsAndTasks.filter(x => x.id === evId); //find the corresponding object
		console.log('eventApplicationAndTasks', eventApplicationAndTasks);
		const data = {
			departmentid: this.props.departmentid,
			eventid: evId
		};
		// do this if event currently has no application
		// we can not create a task without an application.
		if(eventApplicationAndTasks.length === 0) {
			this.props.actions.createApplication(data);
			setTimeout(() => { this.props.actions.getEventsAndTasks(data.departmentid)}, 1000)
		}

		this.setState({
			open: true,
			eventId: evId,
			eventType: this.props.events[eventEntry].event_type
		});
		console.log('e');
	}

	handleSubmit() {
		/*
		* Applications are created when an event is opened.
		* Therefore we assume for the sake of thiss assignment that we have the assignmentid
		*/
		console.log('submitting');

		// First find the correct applicationid
		const eventId = this.state.eventId;
		const eventObject = this.props.eventsAndTasks.filter(x => x.id === eventId); //returns an array[0]
		if(eventObject.lenght === 0){
			console.log('this event has no application');
			this.handleClose();
		}

		const applicationId = eventObject[0].Applications[0].id;

		this.setState({
			newTask: Object.assign({}, this.state.newTask,{
				applicationid: applicationId
			})
		});

		// These props will be used to create a new task
		const newestTask = this.state.newTask;
		newestTask['applicationid'] = applicationId;

		console.log('this will go to the action', newestTask);
		this.props.actions.createNewTask(newestTask);
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
				employeeid: value
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
		let taskTypeString = '';
		if(this.props.departmentid === 1){
			taskTypeString = PRODUCTION_TASK_TYPES[value].name;
		}
		else{
			taskTypeString = SERVICE_TASK_TYPES[value].name;
		}
		this.setState({
			taskTypeOptionValue: value,
			newTask: Object.assign({}, this.state.newTask, {
				type: taskTypeString
			})
		});
	}

	createNewTask() {
		/* Check if the event has an applicationid otherwise create the application first
		* before submitting tasks
		*/
		const eventid = this.state.eventId;
		let eventApplicationAndTasks = this.props.eventsAndTasks.filter(x => x.id === eventid);
		console.log('eventApplicationAndTasks',eventApplicationAndTasks);
		let appId = eventApplicationAndTasks[0].Applications[0].id;
		console.log('appId: ', appId);
		this.setState({
			newTask: Object.assign({}, this.state.newTask, {
				applicationid: appId
			})
		});
		let newestTask = this.state.newTask;
		newestTask['applicationid'] = appId;
		console.log('this is eventid', eventid);
		console.log('this is the task: ', newestTask);
		//return;
		this.props.actions.createNewTask(newestTask); //add new task to db
		// clear curr state
		this.setState({
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
								{this.state.eventType} <Divider />
								<TextInput
									name="description"
									label="Task"
									onChange={this.updateEventState}
									placeholder="Description of task" />
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
								<RaisedButton
									label="Add new task"
									primary={true}
									onClick={this.createNewTask} />
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
		user: state.user,
		eventsAndTasks: state.eventsAndTasks
	};
}
function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(Object.assign({},taskActions, applicationActions,eventActions), dispatch)
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(EventPage);
