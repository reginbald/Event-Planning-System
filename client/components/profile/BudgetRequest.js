import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from  'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

const paperStyle = {
  height: 70,
  width: 300,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

const buttonStyle = {
  margin: 14
};

class BudgetRequest extends Component {
	constructor(props){
		super(props);
		this.state = {
		}
	}

	handleOpen() {
		return browserHistory.push("profile/budgetRequest");
  };

	render() {
		return (
			<MuiThemeProvider>
				<Paper style={paperStyle} zDepth={1} rounded={false} >
						<RaisedButton 
						label="Budget Request" 
						secondary={true} 
						style={buttonStyle}
						onTouchTap={this.handleOpen}/>
				</Paper>
			</MuiThemeProvider>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
	};
}
function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(Object.assign({}), dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(BudgetRequest);