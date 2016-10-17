import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {Grid, Row, Col } from 'react-flexbox-grid';

import * as clientActions from '../../redux/actions/clientActions';

class ClientPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: "",
			open: false,
			events: []
		};
		this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
		this.clientSelected = this.clientSelected.bind(this);
	}

	handleOpen() {
    this.setState({open: true});
  };

  handleClose() {
    this.setState({open: false});
  };

	clientSelected(id) {
		this.setState({open: true});
		this.setState({events: []});
		this.props.actions.getAllClientEvents(id);
	}

	render() {
		const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />
    ];
		return (
		<div>
		<h1>Clients</h1>
			<MuiThemeProvider>
			<div>
				<Dialog
					title="Client Event History"
					actions={actions}
					modal={false}
					open={this.state.open}
					onRequestClose={this.handleClose}
					autoDetectWindowHeight={true}
					autoScrollBodyContent={true}>
					<Table>
					<TableHeader displaySelectAll={false}>
						<TableRow>
							<TableHeaderColumn>Name</TableHeaderColumn>
							<TableHeaderColumn>Event Type</TableHeaderColumn>
							<TableHeaderColumn>Description</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody showRowHover={true} displayRowCheckbox={false}>
					{this.props.clientEvents.map(function(element){
						return <TableRow key={element.id}>
							<TableRowColumn>{element.name}</TableRowColumn>
							<TableRowColumn>{element.event_type}</TableRowColumn>
							<TableRowColumn>{element.description}</TableRowColumn>
						</TableRow>;
					})}
					</TableBody>
				</Table>
				</Dialog>
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
			</div>
			</MuiThemeProvider>
		</div>
		);
	}
}
function mapStateToProps(state, ownProps) {
	return {
		clients: state.clients,
		clientEvents: state.clientEvents
	};
}
function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(clientActions, dispatch)
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(ClientPage);
