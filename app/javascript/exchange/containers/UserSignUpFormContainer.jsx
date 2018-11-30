import React, { Component } from 'react'
import { v4 as uuid } from 'uuid';
import { Button, Checkbox, Form, Message } from 'semantic-ui-react'
import axios from 'axios';
import { signUpUser } from '../actions/userActions';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import {
  EMAIL_MISSING,
  INVALID_EMAIL_FORMAT,
  PASSWORD_MISSING,
  PASSWORD_CONFIRMATION_MISSING,
  PASSWORD_MISMATCH,
  INVALID_PASSWORD_LENGTH
} from '../constants/formErrors';


class UserSignUpFormContainer extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      password_confirmation: '',
      emailError: false,
      passwordError: false,
      password_confirmationError: false,
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
      password: this.state.password,
      password_confirmation: this.state.password_confirmation
    }

    this.props.signUpUser(userData);
    this.props.history.push('/user_profiles/new/profile');
  }

  handleFormErrors() {
    let errorMessages = [];
    this.setState({
      emailError: false,
      passwordError: false,
      password_confirmationError: false
    });

    if (this.state.email === '') {
      this.setState({ emailError: true });
      errorMessages.push(EMAIL_MISSING);
    }
    if (!this.validateEmail(this.state.email)) {
      this.setState({ emailError: true })
      errorMessages.push(INVALID_EMAIL_FORMAT);
    }
    if (this.state.password === '') {
      this.setState({ passwordError: true });
      errorMessages.push(PASSWORD_MISSING);
    }
    if (this.state.password.length < 6 || this.state.password.length > 128) {
      this.setState({ passwordError: true });
      errorMessages.push(INVALID_PASSWORD_LENGTH);
    }
    if (this.state.password_confirmation === '') {
      this.setState({ password_confirmationError: true });
      errorMessages.push(PASSWORD_CONFIRMATION_MISSING);
    }
    if (this.state.password != this.state.password_confirmation ) {
      this.setState({ passwordError: true, password_confirmationError: true });
      errorMessages.push(PASSWORD_MISMATCH);
    }

    return errorMessages;
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  render() {
    const { email, password, password_confirmation, emailError, passwordError, password_confirmationError, errorMessages, formError } = this.state;

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
      <div className="sign-up-form-container">
        <h1 className="sign-up-form-title">Sign Up Form</h1>
        <Form className="sign-up-form" onSubmit={ this.handleSubmit } error={ formError }>
          <Form.Field>
            <label>Email</label>
            <Form.Input placeholder='bob.smith@gmail.com' name='email' value={ email } onChange={ this.handleChange }  width={10} error={ emailError } />
          </Form.Field>
          <Form.Field>
            <label>Password (6 characters minimum)</label>
            <Form.Input type='password' name='password' value={ password } onChange={ this.handleChange }  width={10} error={ passwordError } />
          </Form.Field>
          <Form.Field>
            <label>Password Confirmation</label>
            <Form.Input type='password'  name='password_confirmation' value={ password_confirmation } onChange={ this.handleChange }  width={10} error={ password_confirmationError } />
          </Form.Field>
          <Form.Field>
            <Checkbox />
            I agree to the 
            <a className="sign-up-form-terms-of-service">Terms and Conditions</a>
          </Form.Field>
          { errorMessages.length > 0 ? errorMessage : null }
          <Form.Button content='Submit' />
        </Form>
      </div>
    )
  }
}

export default connect(() => { return {} }, { signUpUser })(UserSignUpFormContainer);
