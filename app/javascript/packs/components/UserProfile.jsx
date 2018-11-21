import React, { Component } from 'react';
import UserProfileContainer from '../containers/UserProfileContainer'

class UserProfile extends Component {
  render() {
  	console.log(this)
  	var viewingMyProfile  = false
  	if ( this.props.match.params.id == this.props.currentUserId )
  	{
  		viewingMyProfile = true;
  	}
    return (
      <div style={{marginBottom: '40px', marginTop: '40px'}} className="body">
        <UserProfileContainer viewingMyProfile={viewingMyProfile} userProfileId = {this.props.match.params.id} />
      </div>
    );
  }
}

export default UserProfile;