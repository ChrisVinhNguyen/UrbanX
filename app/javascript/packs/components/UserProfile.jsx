import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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

UserProfile.propTypes = {
  match: PropTypes.object.isRequired,
  currentUserId: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
  currentUserId: state.user.user_info.user_profile_id
});

export default connect(mapStateToProps, {})(UserProfile);