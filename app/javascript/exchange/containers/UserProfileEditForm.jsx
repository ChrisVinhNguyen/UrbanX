import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';


class UserProfileEditForm extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	first_name: this.props.user_info.first_name,
	    	last_name: this.props.user_info.last_name,
	    	date_of_birth: this.props.user_info.date_of_birth,
	    	location: this.props.user_info.location
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

    axios.put(`/user_profiles/${this.props.match.params.id}`, {
    	params:userData
      }).then(response => {
        response.json().then(data =>{
          console.log("Successful" + data);
      }).catch(function(error){
      console.log(error);
    })
    }) 
    
    e.preventDefault()
	this.props.history.push(`/user_profiles_show/${this.props.match.params.id}`);
  }

  render() {
	return (

		 <form onSubmit={this.handleSubmit} class="ui form">
		  <div class="field">
		    <label>First Name</label>
		    <input 
		    	type="text" 
		    	name="post[first_name]" 
		    	value={this.state.first_name} 
		    	onChange = {this.handleFirstNameChange}
		    	placeholder="First Name"/>
		  </div>
		  <div class="field">
		    <label>Last Name</label>
		    <input 
		    	type="text" 
		    	name="past[last_name]" 
		    	value = {this.state.last_name}
		    	onChange = {this.handleLastNameChange}
		    	placeholder="Last Name"/>
		  </div>
		  <div class="field">
		  <label>Date of Birth</label>
		    <input 
		    	type="Date" 
		    	name="post[date_of_birth]" 
		    	value={this.state.date_of_birth}
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

const mapStateToProps = state => ({
  user_info: state.user.user_info
});

export default connect(mapStateToProps, {})(UserProfileEditForm);
