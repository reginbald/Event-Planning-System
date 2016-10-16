import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class EmployeePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: ""
		};
	}

	employeeSelected(id) {
		console.log("selected ", id);
	}

	render() {
		return (
		<div>
		<h1>Employees</h1>
			<MuiThemeProvider>
				<Table onRowSelection={this.employeeSelected}>
					<TableHeader displaySelectAll={false}>
						<TableRow>
							<TableHeaderColumn>Name</TableHeaderColumn>
							<TableHeaderColumn>Job Title</TableHeaderColumn>
							<TableHeaderColumn>Email</TableHeaderColumn>
							<TableHeaderColumn>Department</TableHeaderColumn>
							<TableHeaderColumn>Created</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody showRowHover={true} displayRowCheckbox={false}>
					{this.props.employees.map(function(element){
						return <TableRow key={element.id}>
							<TableRowColumn>{element.name}</TableRowColumn>
							<TableRowColumn>{element.job_title}</TableRowColumn>
							<TableRowColumn>{element.email}</TableRowColumn>
							<TableRowColumn>{element.departmentid}</TableRowColumn>
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
		employees: state.employees
	};
}
function mapDispatchToProps(dispatch) {
	return {
		//actions: bindActionCreators(budgetRequestActions, dispatch)
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(EmployeePage);
