import React, { Component } from 'react';
import axios from 'axios';
import { newProfile, fetchUser } from '../actions/userActions';
import { connect } from 'react-redux';
import { Button, Checkbox, Form, Grid, Message } from 'semantic-ui-react'
import { UploadSingleButton }  from '../components/UploadSingleButton.js';
import { v4 as uuid } from 'uuid';

import { FIRSTNAME_MISSING, LASTNAME_MISSING, DOB_MISSING, LOCATION_MISSING } from '../constants/formErrors';


import '../stylesheets/profile-create-form-container.scss';


class ProfileCreateFormContainer extends Component {
  constructor(props) {
      super(props);
      this.state = {
        first_name: '',
        last_name: '',
        date_of_birth: '',
        location: '',
        image: null,

        firstnameError: false,
        lastnameError: false,
        locationError: false,
        dobError: false,
        errorMessages: [],
        formError: false
      };

      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.updateImageState = this.updateImageState.bind(this);
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
    // let profile = this.state;
    // this.props.newProfile(profile);
    const formData = new FormData();
    // formData.append('csrfmiddlewaretoken', '{{ csrf_token }}');
    formData.append('user_profile[first_name]', this.state.first_name);
    formData.append('user_profile[last_name]', this.state.last_name);
    formData.append('user_profile[date_of_birth]', this.state.date_of_birth);
    formData.append('user_profile[location]', this.state.location);
    if(this.state.image){
      formData.append('user_profile[image]', this.state.image, this.state.image.name);
    }
    
    console.log("doing POST")
    console.log(this.state)
      $.ajax({
        url: '/user_profiles',
        method: 'POST',
        data: formData,
        contentType: false,
        processData: false,
      }).then(
      (response) => {
        this.props.fetchUser()
      },
      (response) => console.log(response.responseJSON)
      );

    this.props.history.push('/');
  }

  handleFormErrors() {
    let errorMessages = [];
    this.setState({
      firstnameError: false,
      lastnameError: false,
      locationError: false,
      dobError: false
    });

    if (this.state.first_name === '') {
      this.setState({ firstnameError: true })
      errorMessages.push(FIRSTNAME_MISSING);
    }
    if (this.state.last_name === '') {
      this.setState({ lastnameError: true })
      errorMessages.push(LASTNAME_MISSING);
    }
    if (this.state.date_of_birth === '') {
      this.setState({ dobError: true })
      errorMessages.push(DOB_MISSING);
    }
    if (this.state.location === '') {
      this.setState({ locationError: true })
      errorMessages.push(LOCATION_MISSING);
    }

    return errorMessages;
  }


  handleChange(e, { name, value }) {
    this.setState({ [name]: value })
  }
  updateImageState(file){
    this.state.image = file
    console.log(this.state.image)
  }

  render() {
    const { first_name, last_name, date_of_birth, location,firstnameError, lastnameError, dobError, locationError, errorMessages, formError } = this.state;

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
     <div className="profile-create-form-container">
        <h1 className="profile-create-form-title">Create User Profile Form</h1>
        <Grid>
          <Grid.Row centered>
            <Grid.Column width={6}>
              <Form className="profile-create-form" onSubmit={ this.handleSubmit } error={formError}>
                <Form.Field>
                  <label>First Name</label>
                  <Form.Input placeholder='First Name' name='first_name' value={ first_name } onChange={ this.handleChange } error={firstnameError}/>
                </Form.Field>
                <Form.Field>
                  <label>Last Name</label>
                  <Form.Input placeholder='Last Name' name='last_name' value={ last_name } onChange={ this.handleChange } error={lastnameError}/>
                </Form.Field>
                <Form.Field>
                  <label>Date of Birth</label>
                  <Form.Input type = 'Date' placeholder='Date of Birth' name='date_of_birth' value={ date_of_birth } onChange={ this.handleChange } error={dobError}/>
                </Form.Field>
                <Form.Field>
                  <label>Location</label>
                  <Form.Input placeholder='Location' name='location' value={ location } onChange={ this.handleChange } error={locationError}/>
                </Form.Field>
                <UploadSingleButton updateImageState={this.updateImageState}/>
                { errorMessages.length > 0 ? errorMessage : null }
                <Form.Button content='Submit' />
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default connect(() => { return {} }, { newProfile, fetchUser })(ProfileCreateFormContainer)


