import React, { Component } from 'react';
import { v4 as uuid } from 'uuid';
import { Grid, Button, Checkbox, Form, Message } from 'semantic-ui-react';
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
  INVALID_PASSWORD_LENGTH,
  DID_NOT_AGREE_TO_TERMS_AND_CONDITIONS
} from '../constants/formErrors';

import TermsAndConditionsModalContent from '../components/TermsAndConditionsModalContent';

import '../stylesheets/user-sign-up-form-container.scss';


class UserSignUpFormContainer extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      password_confirmation: '',
      agreeToTermsAndConditions: false,
      emailError: false,
      passwordError: false,
      password_confirmationError: false,
      agreeToTermsAndConditionsError: false,
      errorMessages: [],
      formError: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleModalAgreement = this.handleModalAgreement.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFormErrors = this.handleFormErrors.bind(this);
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  handleToggle() {
    this.setState({ agreeToTermsAndConditions: !this.state.agreeToTermsAndConditions });
  }

  handleModalAgreement(agreeToTermsAndConditions) {
    this.setState({ agreeToTermsAndConditions: agreeToTermsAndConditions });
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
      password_confirmationError: false,
      agreeToTermsAndConditionsError: false
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
    if (this.state.agreeToTermsAndConditions != true ) {
      this.setState({ agreeToTermsAndConditionsError: true });
      errorMessages.push(DID_NOT_AGREE_TO_TERMS_AND_CONDITIONS);
    }

    return errorMessages;
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  render() {
    const {
      email,
      password,
      password_confirmation,
      agreeToTermsAndConditions,
      emailError,
      passwordError,
      password_confirmationError,
      agreeToTermsAndConditionsError,
      errorMessages,
      formError
    } = this.state;

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
        <Grid>
          <Grid.Row centered>
            <Grid.Column width={6}>
              <Form className="sign-up-form" onSubmit={ this.handleSubmit } error={ formError }>
                <Form.Field>
                  <label>Email</label>
                  <Form.Input placeholder='bob.smith@gmail.com' name='email' value={ email } onChange={ this.handleChange } error={ emailError } />
                </Form.Field>
                <Form.Field>
                  <label>Password (6 characters minimum)</label>
                  <Form.Input type='password' name='password' value={ password } onChange={ this.handleChange } error={ passwordError } />
                </Form.Field>
                <Form.Field>
                  <label>Password Confirmation</label>
                  <Form.Input type='password'  name='password_confirmation' value={ password_confirmation } onChange={ this.handleChange } error={ password_confirmationError } />
                </Form.Field>
                <Form.Field error={ agreeToTermsAndConditionsError }>
                  <Checkbox
                    name='agreeToTermsAndConditions'
                    checked={ agreeToTermsAndConditions }
                    onChange={ this.handleToggle }
                    label={
                      <label>I agree to the </label>
                    }
                  />
                  <TermsAndConditionsModalContent handleModalAgreement={ this.handleModalAgreement } />
                </Form.Field>
                { errorMessages.length > 0 ? errorMessage : null }
                <Form.Button content='Submit' />
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user_form_backend_error: state.items.user_form_backend_error,
});

export default connect(mapStateToProps, { signUpUser })(UserSignUpFormContainer);
