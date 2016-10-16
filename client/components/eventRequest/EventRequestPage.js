import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Grid, Row, Col } from 'react-flexbox-grid';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextInput from '../common/TextInput';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import RadioButton from 'material-ui/RadioButton';
import SelectInput from '../common/SelectInput';
import * as eventRequestActions from '../../redux/actions/eventRequestActions';

class EventRequestPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: "",
			open: false,
			eventRequest: {
				id: '',
				name:'',
        budget: '',
        clientid:'',
        event_type: '',
        attendees: '',
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
		};
		this.handleClose = this.handleClose.bind(this);
		this.eventRequestSelected = this.eventRequestSelected.bind(this);
		this.updateEventState = this.updateEventState.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleClose() {
		this.setState({open: false});
	};

	handleSubmit() {
    const update = {
			status: 'FINANCIAL_ACCEPT',
      financial_feedback: this.state.eventRequest.financial_feedback,
      discount: this.state.eventRequest.discount
		}
    this.setState({open: false});
    this.props.actions.updateEventRequest(this.state.eventRequest.id, update);
  }

	eventRequestSelected(id) {
		let eventRequest = this.props.eventRequests[id];
		this.setState({eventRequest, eventRequest});
		this.setState({open: true});
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
		<h1>Event Requests</h1>
			<MuiThemeProvider>
				<div>
					<Dialog
						title="Event Request"
						actions={actions}
						modal={false}
						open={this.state.open}
						onRequestClose={this.handleClose}
						autoScrollBodyContent={true}>
						<Grid>
							<Row>
								<TextField
									name="event_type"
									disabled={true}
									floatingLabelText="Event Type"
									floatingLabelFixed={true}
									value={this.state.eventRequest.event_type}/>
							</Row>
							<Row>
								<Col xs >
									<TextField
										name="numberofattendees"
										disabled={true}
										floatingLabelText="Number of attendees"
										floatingLabelFixed={true}
										value={this.state.eventRequest.attendees}/>
								</Col>
								<Col xs >
									<TextField
										name="budget"
										disabled={true}
										floatingLabelText="Budget"
										floatingLabelFixed={true}
										value={this.state.eventRequest.budget}/>
								</Col>
							</Row>
							<Row>
								<Col xs >
									<RadioButton
										name="decorations"
										label="Decorations"
										checked={this.state.eventRequest.decorations === true} />
									<RadioButton
										name="parties"
										label="Parties"
										checked={this.state.eventRequest.parties === true} />
									<RadioButton
										name="photos_filming"
										label="Photos/Filming"
										checked={this.state.eventRequest.photosfilming === true} />
								</Col>
								<Col xs >
									<RadioButton
										name="breakfast_lunch_dinner"
										label="Breakfast/Lunch/Dinner"
										checked={this.state.eventRequest.food === true} />
									<RadioButton
										name="soft_hot_drinks"
										label="Soft/Hot drinks"
										checked={this.state.eventRequest.drinks === true} />
								</Col>
							</Row>
							<Row>
								<Col xs >
									<TextField
											name="from"
											disabled={true}
											floatingLabelText="From"
											floatingLabelFixed={true}
											value={this.state.eventRequest.from}/>
								</Col>
								<Col xs >
									<TextField
										name="to"
										disabled={true}
										floatingLabelText="To"
										floatingLabelFixed={true}
										value={this.state.eventRequest.to}/>
								</Col>
							</Row>
							<Row>
								<Col xs >
									<TextInput
										name="discount"
										label="Discount"
										placeholder="0%"
										onChange={this.updateEventState}/>
								</Col>
								<Col xs >
									<TextInput
										name="financial_feedback"
										label="Review"
										placeholder="Seems a bit expensive..."
										onChange={this.updateEventState}/>
								</Col>
							</Row>
						</Grid>
					</Dialog>
					<Table onRowSelection={this.eventRequestSelected}>
						<TableHeader displaySelectAll={false}>
							<TableRow>
								<TableHeaderColumn>Event Type</TableHeaderColumn>
								<TableHeaderColumn>Client Id</TableHeaderColumn>
								<TableHeaderColumn>Status</TableHeaderColumn>
							</TableRow>
						</TableHeader>
						<TableBody showRowHover={true} displayRowCheckbox={false}>
						{this.props.eventRequests.map(function(element){
							return <TableRow key={element.id}>
								<TableRowColumn>{element.event_type}</TableRowColumn>
								<TableRowColumn>{element.clientid}</TableRowColumn>
								<TableRowColumn>{element.status}</TableRowColumn>
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
		eventRequests: state.eventRequest.filter(x => x.status === "SENIOR_ACCEPT")
	};
}
function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(eventRequestActions, dispatch)
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(EventRequestPage);
