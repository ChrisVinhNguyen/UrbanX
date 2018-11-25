import React, { Component } from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import axios from 'axios';
import { signInUser } from '../actions/userActions';
import { connect } from 'react-redux';

class UserSignInFormContainer extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      emailError: false,
      passwordError: false,
      errorMessages: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value })
  }

  handleSubmit(e) {
    let userData = this.state;

    this.props.signInUser(userData);
  }

  render() {
    const { email, password } = this.state

    return (
      <div className="sign-in-form-container">
        <h1 className="sign-in-form-title">Sign In Form</h1>
        <Form className="sign-in-form" onSubmit={ this.handleSubmit }>
          <Form.Field>
            <label>Email</label>
            <Form.Input placeholder='bob.smith@gmail.com' name='email' value={ email } onChange={ this.handleChange }  width={10} />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <Form.Input type='password' name='password' value={ password } onChange={ this.handleChange }  width={10} />
          </Form.Field>
          <Form.Button content='Submit' />
        </Form>
      </div>
    )
  }
}

export default connect(() => { return {} }, { signInUser })(UserSignInFormContainer);
