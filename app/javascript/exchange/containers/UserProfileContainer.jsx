import React, { Component } from 'react';
import axios from 'axios';
import { Grid } from 'semantic-ui-react'

import UserProfileInfo from '../components/UserProfileInfo';
import ProfileContentContainer from '../containers/ProfileContentContainer';


class UserProfileContainer extends Component {
  constructor() {
    super();
    this.state = {
      userProfile: {}
    };
  }

  componentDidMount() {
    axios.get('/user_profiles/' + this.props.userProfileId) 
    .then((response) => {
      this.setState({
        userProfile: response.data
      });
    })
    .catch(function(error){
      console.log(error);
    })
  }

  componentWillUpdate(prevProps){
    console.log('inside componentWillUpdate-------')
    console.log(prevProps)
    console.log(this.props)
    if (prevProps.userProfileId !== this.props.userProfileId) {
      axios.get('/user_profiles/' + prevProps.userProfileId)
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
    console.log('inside componentWillUpdate-------')
  }

  render() {
    return (
      <div>
        <Grid columns={2} divided>
          <UserProfileInfo viewingMyProfile = {this.props.viewingMyProfile} userProfile={this.state.userProfile} />
          <ProfileContentContainer viewingMyProfile = {this.props.viewingMyProfile} userProfileId={this.props.userProfileId} />
        </Grid>
      </div>
    );
  }
}

export default UserProfileContainer;
