import React, { Component } from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'

class UserSignUpFormContainer extends Component {
  render() {
    return (
      <div className="sign-up-form-container">
        <h1 className="sign-up-form-title">Sign Up Form</h1>
        <Form className="sign-up-form">
          <Form.Field>
            <label>Email</label>
            <input placeholder='bob.smith@gmail.com' />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input />
          </Form.Field>
          <Form.Field>
            <label>Confirm Password</label>
            <input />
          </Form.Field>
          <Form.Field>
            <Checkbox />
            I agree to the 
            <a className="sign-up-form-terms-of-service">Terms and Conditions</a>
          </Form.Field>
          <Button type='submit'>Submit</Button>
        </Form>
      </div>
    )
  }
}

export default UserSignUpFormContainer
