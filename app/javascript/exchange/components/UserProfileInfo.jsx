import React, { Component } from 'react';
import UserProfileContainer from '../containers/UserProfileContainer'
import { Link } from "react-router-dom";

import Logo from '../images/macbook.jpg';
import Bronze from '../images/bronze.png';
import Silver from '../images/silver.png';
import Gold from '../images/gold.png';

class UserProfileInfo extends Component {
  handleEditOnClick(e){
    console.log('inside handleEditOnClick!!!');
  }

  handleAddContactOnClick(e){
    console.log('inside handleAddContactOnClick!!!');
  }

  render() {
  	console.log(this.props)
    let url=""
    if (this.props.userProfile.image){
      url = this.props.userProfile.image;
    }
    else{
      url = Logo
    }

    return (
      <div className="ui card user-profile-container">
        <div className="image">
          <img src={url? url : Logo}/>
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
          <div className="meta">
          {10 < this.props.userProfile.points && this.props.userProfile.points <= 50 ?
            <img src={Bronze}/>: null}
          </div>
          <div className="meta">
          {50 < this.props.userProfile.points && this.props.userProfile.points <= 100 ?
            <img src={Silver}/>: null}
          </div>
          <div className="meta">
          {100 < this.props.userProfile.points ?
            <img src={Gold}/>: null}
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