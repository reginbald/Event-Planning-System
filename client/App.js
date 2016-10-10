// The template for all pages
import React , { Component, PropTypes } from 'react';
import AppBar from './components/header/Header';

export default class App extends Component {
  render() {
    return (
      <div>
        <AppBar />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};
