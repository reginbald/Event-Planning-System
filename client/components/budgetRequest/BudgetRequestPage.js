import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class BudgetRequestPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: ""
		};
	}

	budgetRequestSelected(id) {
		console.log("selected ", id);
	}

	render() {
		return (
		<div>
		<h1>Budget Requests</h1>
			<MuiThemeProvider>
				<Table onRowSelection={this.budgetRequestSelected}>
					<TableHeader displaySelectAll={false}>
						<TableRow>
							<TableHeaderColumn>departmentID</TableHeaderColumn>
							<TableHeaderColumn>eventID</TableHeaderColumn>
							<TableHeaderColumn>Amount</TableHeaderColumn>
							<TableHeaderColumn>Reason</TableHeaderColumn>
							<TableHeaderColumn>Created</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody showRowHover={true} displayRowCheckbox={false}>
					{this.props.budgetRequests.map(function(element){
						return <TableRow key={element.id}>
							<TableRowColumn>{element.departmentid}</TableRowColumn>
							<TableRowColumn>{element.eventid}</TableRowColumn>
							<TableRowColumn>{element.amount}</TableRowColumn>
							<TableRowColumn>{element.reason}</TableRowColumn>
							<TableRowColumn>{Date(element.created_at)}</TableRowColumn>
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
		budgetRequests: state.budgetRequests
	};
}
function mapDispatchToProps(dispatch) {
	return {
		//actions: bindActionCreators(budgetRequestActions, dispatch)
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(BudgetRequestPage);
