import React, { Component } from 'react';
import axios from 'axios';
import { newProfile } from '../actions/userActions';
import { connect } from 'react-redux';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { UploadSingleButton }  from '../components/UploadSingleButton.js';

class ProfileCreateFormContainer extends Component {
  constructor(props) {
      super(props);
      this.state = {
        first_name: '',
        last_name: '',
        date_of_birth: '',
        location: '',
        image: null
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.updateImageState = this.updateImageState.bind(this);
    }

  handleSubmit(e) {
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
      (response) => console.log(response.message),
      (response) => console.log(response.responseJSON)
      );





    this.props.history.push('/');
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value })
  }
  updateImageState(file){
    this.state.image = file
    console.log(this.state.image)
    

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
            <Form.Input type = 'Date' placeholder='Date of Birth' name='date_of_birth' value={ date_of_birth } onChange={ this.handleChange }  width={10} />
          </Form.Field>
          <Form.Field>
            <label>Location</label>
            <Form.Input placeholder='Location' name='location' value={ location } onChange={ this.handleChange }  width={10} />
          </Form.Field>
          hi
          <UploadSingleButton updateImageState={this.updateImageState}/>
          <Form.Button content='Submit' />
        </Form>
      </div>
    );
  }
}

export default connect(() => { return {} }, { newProfile })(ProfileCreateFormContainer)
