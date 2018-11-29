import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';


class SignInButton extends Component {
  render() {
    return (
      <Link to="/users_sign_in" className="sign-in-button">
        <Button primary>
          Sign In
        </Button>
      </Link>
    );
  }
}

export default SignInButton;
