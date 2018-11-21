import React, { Component } from 'react';

class SignupButton extends Component {
  render() {
    return (
      <button onClick={ this.props.onClick }>
        Signup
      </button>
    );
  }
}

export default SignupButton;
