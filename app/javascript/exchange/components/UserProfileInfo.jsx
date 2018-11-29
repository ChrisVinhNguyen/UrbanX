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
      <div className="ui card user-profile-container">
        <div className="image">
          <img src={Logo}/>
        </div>
        <div className="content">
          <a className="header">{this.props.userProfile.first_name + " " + this.props.userProfile.last_name}</a>
          <div className="meta">
            <span className="date">{this.props.userProfile.location}</span>
          </div>
          <div className="meta">
            <span className="date">Birthday: {this.props.userProfile.date_of_birth}</span>
          </div>
          <div className="meta">
            <span className="date">Email: {this.props.userProfile.email}</span>
          </div>
        </div>
        {this.props.viewingMyProfile ?
            <Link to={`/user_profiles_change/${this.props.userProfile.id}/edit`}>
              <button className="ui button">Edit</button>
            </Link>: null}
      </div>
    );
  }
}

export default UserProfileInfo;