import React, {Component, PropTypes} from 'react';
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

export default class Tasks extends Component {
	constructor(props){
		super(props);
	}

	handleOpen() {
		return browserHistory.push("profile/task");
  };

	render() {
		return (
			<MuiThemeProvider>
				<Paper style={paperStyle} zDepth={1} rounded={false} >
						<RaisedButton 
						label="Tasks" 
						secondary={true} 
						style={buttonStyle}
						onTouchTap={this.handleOpen}/>
				</Paper>
			</MuiThemeProvider>
		);
	}
}