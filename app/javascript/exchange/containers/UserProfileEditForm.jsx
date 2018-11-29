import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Button, Form } from 'semantic-ui-react'


class UserProfileEditForm extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	first_name: this.props.user_info.first_name,
	    	last_name: this.props.user_info.last_name,
	    	date_of_birth: this.props.user_info.date_of_birth,
	    	location: this.props.user_info.location,
	    	form_valid: true
	    };
	    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
	    this.handleLastNameChange = this.handleLastNameChange.bind(this);
	    this.handleDateOfBirthChange = this.handleDateOfBirthChange.bind(this);
	    this.handleLocationChange = this.handleLocationChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);

	    if(!this.state.first_name || !this.state.last_name || !this.state.date_of_birth || !this.state.location )
	    {
	    	this.setState({ form_valid: e.target.value })
	    }
	  }

	componentWillMount() {
    console.log(this.props)
  }

  handleFirstNameChange(e) {
    this.setState({ first_name: e.target.value })
    if(!e.target.value  || !this.state.last_name || !this.state.date_of_birth || !this.state.location )
    {
    	this.setState({ form_valid: false })
    }
    else{
    	this.setState({ form_valid: true })
    }
    
    console.log(this.state);
  }

  handleLastNameChange(e) {
    this.setState({ last_name: e.target.value });
    if(!e.target.value || !this.state.first_name || !this.state.date_of_birth || !this.state.location )
    {
    	this.setState({ form_valid: false })
    }
    else{
    	this.setState({ form_valid: true })
    }
    console.log(this.state);
  }

  handleDateOfBirthChange(e) {
    this.setState({ date_of_birth: e.target.value });
    if(!e.target.value || !this.state.last_name || !this.state.first_name || !this.state.location )
    {
    	this.setState({ form_valid: false })
    }
    else{
    	this.setState({ form_valid: true })
    }
    console.log(this.state);
  }

  handleLocationChange(e) {
    this.setState({ location: e.target.value });
    if(!e.target.value || !this.state.last_name || !this.state.date_of_birth || !this.state.first_name )
    {
    	this.setState({ form_valid: false })
    }
    else{
    	this.setState({ form_valid: true })
    }
    console.log(this.state);
  }

  handleSubmit(e) {
    let userData = this.state;
    if(!this.state.form_valid)
    {
    	window.alert("Missing Fields")
    }
    else{
	    axios.put(`/user_profiles/${this.props.match.params.id}`, {
	    	params:userData
	      })
	    .then(function(response) {
	      
	      })
	     	.catch(function(error){
	      console.log(error);
	    })
	    
	    e.preventDefault()
		this.props.history.push(`/user_profiles_show/${this.props.match.params.id}`);

    }

  }

  render() {
	return (
		<div> 
		{ !this.state.form_valid ?
		<div class="ui warning message">
		  <div class="header">
		    All fields are required.
		  </div>
		</div>
		:null}
		 <Form onSubmit={this.handleSubmit} class="ui form">
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
		  <Form.Button content = 'Submit'/>
		</Form>
		</div>
    );
  }
}

const mapStateToProps = state => ({
  user_info: state.user.user_info
});

export default connect(mapStateToProps, {})(UserProfileEditForm);
