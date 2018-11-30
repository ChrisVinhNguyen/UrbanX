import React, { Component } from 'react';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Button, Checkbox, Form, Message } from 'semantic-ui-react';

import { signInUser } from '../actions/userActions';
import { connect } from 'react-redux';

import { EMAIL_MISSING, INVALID_EMAIL_FORMAT, PASSWORD_MISSING } from '../constants/formErrors';


class UserSignInFormContainer extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      emailError: false,
      passwordError: false,
      errorMessages: [],
      formError: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFormErrors = this.handleFormErrors.bind(this);
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value })
  }

  handleSubmit(e) {
    const errorMessages = this.handleFormErrors();

    if (errorMessages.length > 0) {
      this.setState({
        formError: true,
        errorMessages: errorMessages
      })
      return
    } else {
      this.setState({ formError: false })
    }

    let userData = {
      email: this.state.email,
      password: this.state.password
    }

    this.props.signInUser(userData);
    this.props.history.push("/");
  }

  handleFormErrors() {
    let errorMessages = [];
    this.setState({
      emailError: false,
      passwordError: false,
    });

    if (this.state.email === '') {
      this.setState({ emailError: true })
      errorMessages.push(EMAIL_MISSING);
    }
    if (!this.validateEmail(this.state.email)) {
      this.setState({ emailError: true })
      errorMessages.push(INVALID_EMAIL_FORMAT);
    }
    if (this.state.password === '') {
      this.setState({ passwordError: true })
      errorMessages.push(PASSWORD_MISSING);
    }

    return errorMessages;
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  render() {
    const { email, password, emailError, passwordError, errorMessages, formError } = this.state

    const errorMessageContent = this.state.errorMessages.map(message => {
      const keyVal = uuid();
      return (
        <li key={ keyVal }>{message}</li>
      )
    });

    const errorMessage = (
      <Message
        error
        header='Form Error(s)'
        content={
          <ul>
            {errorMessageContent}
          </ul>
        }
      />
    );

    return (
      <div className="sign-in-form-container">
        <h1 className="sign-in-form-title">Sign In Form</h1>
        <Form className="sign-in-form" onSubmit={ this.handleSubmit } error={ formError }>
          <Form.Field>
            <label>Email</label>
            <Form.Input placeholder='bob.smith@gmail.com' name='email' value={ email } onChange={ this.handleChange }  width={10} error={ emailError } />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <Form.Input type='password' name='password' value={ password } onChange={ this.handleChange }  width={10} error={ passwordError } />
          </Form.Field>
          <Link to='/users_forgot_password'>Forgot password?</Link>
          { errorMessages.length > 0 ? errorMessage : null }
          <Form.Button content='Submit' />
        </Form>
      </div>
    )
  }
}

export default connect(() => { return {} }, { signInUser })(UserSignInFormContainer);
