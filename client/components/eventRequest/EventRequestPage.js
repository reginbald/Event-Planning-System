import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class EventRequestPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: ""
		};
	}

	eventRequestSelected(id) {
		console.log("selected ", id);
	}

	render() {
		return (
		<div>
		<h1>Event Requests</h1>
			<MuiThemeProvider>
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
			</MuiThemeProvider>
		</div>
		);
	}
}
function mapStateToProps(state, ownProps) {
	return {
		eventRequests: state.eventRequest
	};
}
function mapDispatchToProps(dispatch) {
	return {
		//actions: bindActionCreators(budgetRequestActions, dispatch)
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(EventRequestPage);
