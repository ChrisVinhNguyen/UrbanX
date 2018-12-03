import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Button, Form, Message } from 'semantic-ui-react'
import { UploadSingleButton }  from '../components/UploadSingleButton.js';
import { v4 as uuid } from 'uuid';

import { fetchUser } from '../actions/userActions';
import { FIRSTNAME_MISSING, LASTNAME_MISSING, DOB_MISSING, LOCATION_MISSING } from '../constants/formErrors';


class UserProfileEditContainer extends Component {
  constructor(props) {
      super(props);
      this.state = {
        first_name: this.props.user_info.first_name.replace(this.props.user_info.last_name, ''),
        last_name: this.props.user_info.last_name,
        date_of_birth: this.props.user_info.date_of_birth,
        location: this.props.user_info.location,
        image: this.props.user_info.image,
        firstnameError: false,
        lastnameError: false,
        locationError: false,
        dobError: false,
        errorMessages: [],
        formError: false
      };
      this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
      this.handleLastNameChange = this.handleLastNameChange.bind(this);
      this.handleDateOfBirthChange = this.handleDateOfBirthChange.bind(this);
      this.handleLocationChange = this.handleLocationChange.bind(this);
      this.deleteImage = this.deleteImage.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.updateImageState = this.updateImageState.bind(this);
    }

  componentWillMount() {
    console.log(this.props)
  }
  updateImageState(file){
    this.state.image = file;
  }

  handleFirstNameChange(e) {
    this.setState({ first_name: e.target.value })
    console.log(this.state);
  }

  handleLastNameChange(e) {
    this.setState({ last_name: e.target.value });
    console.log(this.state);
  }

  handleDateOfBirthChange(e) {
    this.setState({ date_of_birth: e.target.value });
    console.log(this.state);
  }

  handleLocationChange(e) {
    this.setState({ location: e.target.value });
    console.log(this.state);
  }

  handleSubmit(e) {
    let userData = this.state;
    const errorMessages = this.handleFormErrors();

    if (errorMessages.length > 0) {
      this.setState({
        formError: true,
        errorMessages: errorMessages
      })
      return
    } 
    else{
      this.setState({ formError: false })
      const formData = new FormData();
      formData.append('user_profile[first_name]', this.state.first_name);
      formData.append('user_profile[last_name]', this.state.last_name);
      formData.append('user_profile[date_of_birth]', this.state.date_of_birth);
      formData.append('user_profile[location]', this.state.location);
      if(this.state.image) {
        formData.append('user_profile[image]', this.state.image, this.state.image.name);
      }

      console.log("doing PUT")
      $.ajax({
        url: `/user_profiles/${this.props.match.params.id}`,
        method: 'PUT',
        data: formData,
        contentType: false,
        processData: false,
        headers: {
              'X-CSRFToken': $('meta[name="token"]').attr('content')
          }
      }).then(
      (response) => console.log(response.message),
      (response) => console.log(response.responseJSON)
      );
      
      e.preventDefault()
    this.props.fetchUser();
    this.props.history.push(`/user_profiles_show/${this.props.match.params.id}`);

    }

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

  deleteImage(image_attachment){
    var data = image_attachment
      $.ajax({
      url:`/user_profiles/${image_attachment}/delete_image`,
      method: 'DELETE',
      data: data
    }).then(
    (response) => console.log(response.message),
    (response) => console.log(response.responseJSON)
    );
  }

  render() {

  let imageHtml;
  console.log(this.props.user_info)
  if (this.props.user_info.image_attachment_id){
    console.log("iNDISSDEIF ")
    imageHtml = 
      
          <div >
            <img src={this.props.user_info.image} width="400"/>
            <Button onClick={() => {this.deleteImage(this.props.user_info.image_attachment_id)}}>
              Delete
            </Button>
          </div>
        
    
    
  }

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

  console.log(imageHtml)
  return (
    <div> 
     <Form class="ui form">
      <Form.Field>
        <label>First Name</label>
        <Form.Input 
          type="text" 
          name="post[first_name]" 
          value={this.state.first_name} 
          onChange = {this.handleFirstNameChange}
          placeholder="First Name"/>
      </Form.Field>
      <Form.Field>
        <label>Last Name</label>
        <Form.Input 
          type="text" 
          name="past[last_name]" 
          value = {this.state.last_name}
          onChange = {this.handleLastNameChange}
          placeholder="Last Name"/>
      </Form.Field>
      <Form.Field>
      <label>Date of Birth</label>
        <Form.Input 
          type="Date" 
          name="post[date_of_birth]" 
          value={this.state.date_of_birth}
          onChange = {this.handleDateOfBirthChange}
          placeholder="Date of Birth"/>
      </Form.Field>
      <Form.Field>
        <label>Location</label>
        <Form.Input 
          type="text" 
          name="post[location]" 
          value={this.state.location}
          onChange = {this.handleLocationChange}
          placeholder="Location"/>
      </Form.Field>
      <UploadSingleButton updateImageState={this.updateImageState}/>
      {imageHtml ? imageHtml : <div></div>}
      { this.state.formError ?
        <div class="ui negative message">
          <div class="header">
            All fields are required.
          </div>
        </div>
      :null}
      <Form.Button content = 'Submit' onClick={this.handleSubmit}/>
    </Form>
    </div>
    );
  }
}

const mapStateToProps = state => ({
  user_info: state.user.user_info
});

export default connect(mapStateToProps, { fetchUser })(UserProfileEditContainer);
