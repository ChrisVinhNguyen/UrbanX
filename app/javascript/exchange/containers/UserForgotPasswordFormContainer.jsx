import React, { Component } from 'react';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Button, Checkbox, Form, Message, Grid } from 'semantic-ui-react';

import { sendForgotPasswordEmail } from '../actions/userActions';
import { connect } from 'react-redux';

import { EMAIL_MISSING, INVALID_EMAIL_FORMAT } from '../constants/formErrors';

import '../stylesheets/user-forgot-password-form-container.scss';


class UserForgotPasswordFormContainer extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      emailError: false,
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
    }

    this.props.sendForgotPasswordEmail(userData);
  }

  handleFormErrors() {
    let errorMessages = [];
    this.setState({
      emailError: false,
    });

    if (this.state.email === '') {
      this.setState({ emailError: true })
      errorMessages.push(EMAIL_MISSING);
    }
    if (!this.validateEmail(this.state.email)) {
      this.setState({ emailError: true })
      errorMessages.push(INVALID_EMAIL_FORMAT);
    }

    return errorMessages;
  };

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  render() {
    const { email, emailError, errorMessages, formError } = this.state

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
      <div className="forgot-password-form-container">
        <h1 className="forgot-password-form-title">Forgot Password?</h1>
        <Grid>
          <Grid.Row centered>
            <Grid.Column width={6}>
              <Form className="forgot-password-form" onSubmit={ this.handleSubmit } error={ formError }>
                <Form.Field>
                  <label>Email</label>
                  <Form.Input placeholder='bob.smith@gmail.com' name='email' value={ email } onChange={ this.handleChange } error={ emailError } />
                </Form.Field>
                { errorMessages.length > 0 ? errorMessage : null }
                <Form.Button content='Send Instructions' />
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default connect(() => { return {} }, { sendForgotPasswordEmail })(UserForgotPasswordFormContainer);
