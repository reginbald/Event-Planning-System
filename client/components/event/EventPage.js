import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class EventPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: ""
		};
	}

	eventSelected(id) {
		console.log("selected ", id);
	}

	render() {
		return (
		<div>
		<h1>Events</h1>
			<MuiThemeProvider>
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
