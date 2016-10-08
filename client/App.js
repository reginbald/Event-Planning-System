// The template for all pages
import React , { Component, PropTypes } from 'react';

export default class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <p>Header here...</p>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};
