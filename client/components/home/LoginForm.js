import React, { Component } from 'react';
import TextInput from '../common/TextInput';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const style = {
  height: 200,
  width: 400,
  margin: 20,
  //textAlign: 'center',
  display: 'inline-block',
};

const LoginForm = ({onChange, onLogin}) => {
  return (
    <div>
      <MuiThemeProvider>
        <Paper style={style} zDepth={1} rounded={false} >
          <form>
            <TextInput
              name="username"
              label="UserName"
              value=""
              onChange={onChange} />
              <TextInput
                name="password"
                label="Password"
                value=""
                onChange={onChange} />
          </form>
        </Paper>
      </MuiThemeProvider>
    </div>
  );
}


export default LoginForm;
