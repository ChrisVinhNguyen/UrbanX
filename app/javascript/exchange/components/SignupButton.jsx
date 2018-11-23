import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SignupButton extends Component {
  render() {
    return (
      <Link to="/users/sign_up">
        Signup
      </Link>
    );
  }
}

export default SignupButton;
