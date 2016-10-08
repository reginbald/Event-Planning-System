import React, { Component } from 'react';
import User from './User';
import Password from './Password';
export default class HomePage extends Component {
  render() {
    return (
      <div>
        <User />
        <Password />
      </div>
    );
  }
}
