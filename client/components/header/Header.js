import React, { Component } from 'react';
import { browserHistory } from  'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppBar from 'material-ui/AppBar';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

const buttonStyle = {
  color: 'white'
};

class Header extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  handleTouchTap(event) {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose() {
    this.setState({
      open: false,
    });
  };

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
            title="SEP" 
            iconElementRight={<div>
              <FlatButton
                style={buttonStyle}
                onTouchTap={this.handleTouchTap}
                label="Available Jobs"/>
              <Popover
                open={this.state.open}
                anchorEl={this.state.anchorEl}
                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                onRequestClose={this.handleRequestClose}>
                <Menu>
                  {this.props.jobApplications.map(function(element){
                    return <MenuItem key={element.id} primaryText={element.job_title + " - " + element.contract_type} />
                  })}
                </Menu>
              </Popover>
        </div>}/>
      </div>
    );
  }
}

Header.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    jobApplications: state.jobApplications
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}), dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
