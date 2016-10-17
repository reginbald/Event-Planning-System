import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class TaskPage extends Component {
	constructor(props) {
		super(props);
	}

	taskSelected(id) {
		console.log("selected ", id);
	}

	render() {
		return (
		<div>
		<h1>My Tasks</h1>
			<MuiThemeProvider>
				<Table onRowSelection={this.taskSelected}>
					<TableHeader displaySelectAll={false}>
						<TableRow>
							<TableHeaderColumn>Description</TableHeaderColumn>
							<TableHeaderColumn>Priority</TableHeaderColumn>
							<TableHeaderColumn>Sender</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody showRowHover={true} displayRowCheckbox={false}>
					{this.props.tasks.map(function(element){
						return <TableRow key={element.id}>
							<TableRowColumn>{element.description}</TableRowColumn>
							<TableRowColumn>{element.priority}</TableRowColumn>
							<TableRowColumn>{element.senderid}</TableRowColumn>
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
		tasks: state.tasks
	};
}
function mapDispatchToProps(dispatch) {
	return {
		//actions: bindActionCreators(budgetRequestActions, dispatch)
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskPage);
