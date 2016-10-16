import React, { Component } from 'react';
import { browserHistory } from  'react-router';
import AppBar from 'material-ui/AppBar';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export default class Header extends Component {

  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }

  back() { //TODO check current page
    return browserHistory.push("profile");
  }

  render() {
    return (
        <div>
          <AppBar
              onLeftIconButtonTouchTap={this.back}
              title="SEP" />
      </div>
    );
  }
}

Header.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};
