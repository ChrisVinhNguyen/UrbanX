import React, { Component } from 'react';
import axios from 'axios';
import { Grid } from 'semantic-ui-react'

import UserProfileInfo from '../components/UserProfileInfo'

class UserProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfile: {}
    }
  }

  componentDidMount() {
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
      return (
        <div className="body">
        <Grid columns={2} divided>
            <UserProfileInfo userProfile={this.state.userProfile} />
            {this.props.viewingMyProfile ? <p qwtqwtqwtq /> : null}
        </Grid>
      </div>
  );
}
}

export default UserProfileContainer;
