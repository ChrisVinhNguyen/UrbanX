import React, { Component } from 'react';

class UserProfileEditForm extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	firstName: "",
	    	lastName: "",
	    	dateOfBirth: "",
	    	location: ""
	    };
	    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
	    this.handleLastNameChange = this.handleLastNameChange.bind(this);
	    this.handleDateOfBirthChange = this.handleDateOfBirthChange.bind(this);
	    this.handleLocationChange = this.handleLocationChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
	  }

	componentWillMount() {
    console.log(this.props)
  }

  handleFirstNameChange(e) {
    this.setState({ firstName: e.target.value })
    //console.log(this.props.match.params.id);
  }

  handleLastNameChange(e) {
    this.setState({ lastName: e.target.value });
  }

  handleDateOfBirthChange(e) {
    this.setState({ dateOfBirth: e.target.value });
  }

  handleLocationChange(e) {
    this.setState({ location: e.target.value });
  }

  handleSubmit(e) {
    let userData = this.state;

    fetch(`/user_profiles/$this.props.match.params.id/edit`,{
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(response => {
        response.json().then(data =>{
          console.log("Successful" + data);
        })
    }) 
  }

  render() {
	return (
		 <form onSubmit={this.handleSubmit} class="ui form">
		  <div class="field">
		    <label>First Name</label>
		    <input 
		    	type="text" 
		    	name="post[first_name]" 
		    	value={this.state.title} 
		    	onChange = {this.handleFirstNameChange}
		    	placeholder="First Name"/>
		  </div>
		  <div class="field">
		    <label>Last Name</label>
		    <input 
		    	type="text" 
		    	name="past[last_name]" 
		    	value = {this.state.lastName}
		    	onChange = {this.handleLastNameChange}
		    	placeholder="Last Name"/>
		  </div>
		  <div class="field">
		  <label>Date of Birth</label>
		    <input 
		    	type="Date" 
		    	name="post[date_of_birth]" 
		    	value={this.state.dateOfBirth}
		    	onChange = {this.handleDateOfBirthChange}
		    	placeholder="Date of Birth"/>
		  </div>
		  <div class="field">
		    <label>Location</label>
		    <input 
		    	type="text" 
		    	name="post[location]" 
		    	value={this.state.location}
		    	onChange = {this.handleLocationChange}
		    	placeholder="Location"/>
		  </div>
		  <button class="ui button" type="submit">Update Profile</button>
		</form>
    );
  }
}

export default UserProfileEditForm;
