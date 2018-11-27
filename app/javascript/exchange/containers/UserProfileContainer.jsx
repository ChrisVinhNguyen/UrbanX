import React, { Component } from 'react';
import axios from 'axios';
import { Grid } from 'semantic-ui-react'

import UserProfileInfo from '../components/UserProfileInfo'
import ProfileContentContainer from '../containers/ProfileContentContainer'

class UserProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfile: {}
    }
  }

  componentDidMount() {
    console.log(this.props.userProfileId)
    console.log("$$$$$$$$$$$$")
    axios.get('/user_profiles/' + this.props.userProfileId) 
    .then((response) => {
      console.log(response)
      this.setState({
        userProfile: response.data
      })
    })
    .catch(function(error){
      console.log(error);
    })
  }

  render() {
    console.log(this.props.viewingMyProfile)
    console.log(this.state.userProfile)
    console.log(this.props.userProfileId)
      return (
        <div>
          <Grid columns={2} divided>
              <UserProfileInfo viewingMyProfile = {this.props.viewingMyProfile} userProfile={this.state.userProfile} />
              <ProfileContentContainer viewingMyProfile = {this.props.viewingMyProfile} userProfileId={this.props.userProfileId}/>     
          </Grid>
        </div>
  );
}
}

export default UserProfileContainer;
