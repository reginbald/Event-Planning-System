import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class ClientPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: ""
		};
	}

	clientSelected(id) {
		console.log("selected ", id);
	}

	render() {
		return (
		<div>
		<h1>Clients</h1>
			<MuiThemeProvider>
				<Table onRowSelection={this.clientSelected}>
					<TableHeader displaySelectAll={false}>
						<TableRow>
							<TableHeaderColumn>Name</TableHeaderColumn>
							<TableHeaderColumn>Email</TableHeaderColumn>
							<TableHeaderColumn>Created</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody showRowHover={true} displayRowCheckbox={false}>
					{this.props.clients.map(function(element){
						return <TableRow key={element.id}>
							<TableRowColumn>{element.name}</TableRowColumn>
							<TableRowColumn>{element.email}</TableRowColumn>
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
		clients: state.clients
	};
}
function mapDispatchToProps(dispatch) {
	return {
		//actions: bindActionCreators(budgetRequestActions, dispatch)
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(ClientPage);
