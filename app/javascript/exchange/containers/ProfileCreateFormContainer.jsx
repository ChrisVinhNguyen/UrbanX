import React, { Component } from 'react';
import axios from 'axios';
import { newProfile } from '../actions/userActions';
import { connect } from 'react-redux';
import { Button, Checkbox, Form } from 'semantic-ui-react'


class ProfileCreateFormContainer extends Component {
  constructor(props) {
      super(props);
      this.state = {
        first_name: '',
        last_name: '',
        date_of_birth: '',
        location: ''
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

  handleSubmit(e) {
    let profile = this.state;
    this.props.newProfile(profile);
    this.props.history.push('/');
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value })
  }

  render() {
    const { first_name, last_name, date_of_birth, location } = this.state;

    return (
     <div className="new-item-form-container">
        <h1 className="new-item-form-title">Create User Profile Form</h1>
        <Form className="new-item-form" onSubmit={ this.handleSubmit }>
          <Form.Field>
            <label>First Name</label>
            <Form.Input placeholder='First Name' name='first_name' value={ first_name } onChange={ this.handleChange }  width={10} />
          </Form.Field>
          <Form.Field>
            <label>Last Name</label>
            <Form.Input placeholder='Last Name' name='last_name' value={ last_name } onChange={ this.handleChange }  width={10} />
          </Form.Field>
          <Form.Field>
            <label>Date of Birth</label>
            <Form.Input placeholder='Date of Birth' name='date_of_birth' value={ date_of_birth } onChange={ this.handleChange }  width={10} />
          </Form.Field>
          <Form.Field>
            <label>Location</label>
            <Form.Input placeholder='Location' name='location' value={ location } onChange={ this.handleChange }  width={10} />
          </Form.Field>
          <Form.Button content='Submit' />
        </Form>
      </div>
    );
  }
}

export default connect(() => { return {} }, { newProfile })(ProfileCreateFormContainer)
