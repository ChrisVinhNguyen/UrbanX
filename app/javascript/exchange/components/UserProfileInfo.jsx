import React, { Component } from 'react';
import UserProfileContainer from '../containers/UserProfileContainer'
import { Link } from "react-router-dom";

import Logo from '../images/macbook.jpg';

class UserProfileInfo extends Component {
  handleEditOnClick(e){
    console.log('inside handleEditOnClick!!!');
  }

  handleAddContactOnClick(e){
    console.log('inside handleAddContactOnClick!!!');
  }

  render() {
  	console.log(this.props)
    return (
      <div class="ui card user-profile-container">
        <div class="image">
          <img src={Logo}/>
        </div>
        <div class="content">
          <a class="header">{this.props.userProfile.first_name + " " + this.props.userProfile.last_name}</a>
          <div class="meta">
            <span class="date">{this.props.userProfile.location}</span>
          </div>
          <div class="meta">
            <span class="date">Birthday: {this.props.userProfile.date_of_birth}</span>
          </div>
          <div class="meta">
            <span class="date">Email: {this.props.userProfile.email}</span>
          </div>
        </div>
        {this.props.viewingMyProfile ?
            <Link to={`/user_profiles_change/${this.props.userProfile.id}/edit`}>
              <button class="ui button">Edit</button>
            </Link>: null}
      </div>
    );
  }
}

export default UserProfileInfo;