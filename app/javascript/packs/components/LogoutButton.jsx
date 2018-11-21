import React, { Component } from 'react';

class LogoutButton extends Component {
  render() {
    return (
      <button onClick={ this.props.onClick }>
        Logout
      </button>
    );
  }
}

export default LogoutButton;
