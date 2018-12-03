import React, { Component } from 'react';
import axios from 'axios';
import { Grid } from 'semantic-ui-react'

import UserProfileInfo from '../components/UserProfileInfo';
import ProfileContentContainer from '../containers/ProfileContentContainer';

import { getMyItems , getMyTransactions, filterItems} from '../actions/itemsActions' 
import {getUserReviews} from '../actions/userActions'
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

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
    if (prevProps.userProfileId !== this.props.userProfileId) {
      axios.get('/user_profiles/' + prevProps.userProfileId)
      .then((response) => {
        this.setState({
          userProfile: response.data
        })
      })
      .catch(function(error){
        console.log(error);
      })
    }
  }

  render() {
    return (
      <div>
        <Grid>
          <Grid.Column width={4}>
            <UserProfileInfo viewingMyProfile={ this.props.viewingMyProfile } userProfile={ this.state.userProfile } />
          </Grid.Column>
          <Grid.Column width={11}>
            <ProfileContentContainer viewingMyProfile={ this.props.viewingMyProfile } userProfileId={ this.props.userProfileId } />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

UserProfileContainer.propTypes = {
  filterItems: PropTypes.func.isRequired,
  getMyItems: PropTypes.func.isRequired,
  getUserReviews: PropTypes.func.isRequired,
  getMyTransactions: PropTypes.func.isRequired,
}

export default connect(() => { return{} }, { filterItems, getMyItems, getUserReviews, getMyTransactions })(UserProfileContainer);
