import React, { Component } from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import axios from 'axios';
import { signUpUser } from '../actions/userActions';
import { connect } from 'react-redux';

class UserSignUpFormContainer extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      password_confirmation: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value })
    console.log(this.state.email)
  }

  handleSubmit(e) {
    let userData = this.state;
    console.log(this.state)
    this.props.signUpUser(userData);
  }

  render() {
    const { email, password, password_confirmation } = this.state

    return (
      <div className="sign-up-form-container">
        <h1 className="sign-up-form-title">Sign Up Form</h1>
        <Form className="sign-up-form" onSubmit={ this.handleSubmit }>
          <Form.Field>
            <label>Email</label>
            <Form.Input placeholder='bob.smith@gmail.com' name='email' value={ email } onChange={ this.handleChange }  width={10} />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <Form.Input type='password' name='password' value={ password } onChange={ this.handleChange }  width={10} />
          </Form.Field>
          <Form.Field>
            <label>Confirm Password</label>
            <Form.Input type='password'  name='password_confirmation' value={ password_confirmation } onChange={ this.handleChange }  width={10} />
          </Form.Field>
          <Form.Field>
            <Checkbox />
            I agree to the 
            <a className="sign-up-form-terms-of-service">Terms and Conditions</a>
          </Form.Field>
          <Form.Button content='Submit' />
        </Form>
      </div>
    )
  }
}

export default connect(() => { return {} }, { signUpUser })(UserSignUpFormContainer);
