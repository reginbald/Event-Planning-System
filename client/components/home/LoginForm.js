import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const style = {
  height: 150,
  width: 299,
  margin: 20,
  //textAlign: 'center',
  display: 'inline-block',
};

export default class LoginForm extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <Paper style={style} zDepth={1} rounded={false} >
          </Paper>
        </MuiThemeProvider>
      </div>
    );
  }
}
