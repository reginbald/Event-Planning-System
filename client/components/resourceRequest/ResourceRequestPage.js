import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class ResourceRequestPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: ""
		};
	}

	requestSelected(id) {
		console.log("selected ", id);
	}

	render() {
		return (
		<div>
		<h1>Resource Requests</h1>
			<MuiThemeProvider>
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
		//actions: bindActionCreators(budgetRequestActions, dispatch)
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(ResourceRequestPage);
