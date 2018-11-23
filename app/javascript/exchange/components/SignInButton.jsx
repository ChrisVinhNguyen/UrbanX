import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';


class SignInButton extends Component {
  render() {
    return (
      <Link to="/users/sign_in">
        <Button>
          Sign In
        </Button>
      </Link>
    );
  }
}

export default SignInButton;
