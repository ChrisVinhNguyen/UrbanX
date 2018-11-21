import React, { Component } from 'react';

class LoginButton extends Component {
  render() {
    return (
      <button onClick={ this.props.onClick }>
        Login
      </button>
    );
  }
}

export default LoginButton;
