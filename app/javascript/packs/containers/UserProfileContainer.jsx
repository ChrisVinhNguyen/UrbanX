import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/userActions';

import Logo from '../images/doge-logo-transparent-background.png';

import SignupButton from '../components/SignupButton';
import LoginButton from '../components/LoginButton';


class UserProfileContainer extends Component {
  componentWillMount() {
    this.props.fetchUser();
  }

  handleOnClick(e) {
    console.log('inside onClick!!!');
  }

  render() {
    console.log(this.props)

    const isSignedIn = this.props.is_signed_in;
    let userAuthenticationContent;

    if(isSignedIn) {
      userAuthenticationContent =
        <div>
          <span>{this.props.user_info.full_name}</span>
          <img class="ui avatar image" src={ Logo } />
        </div>;
    } else {
      userAuthenticationContent =
        <div>
          <span>
            <SignupButton onClick={this.handleOnClick}/>
            or
            <LoginButton onClick={this.handleOnClick}/>
          </span>
        </div>;
    }

    return (
      <div className="profile-container">
        { userAuthenticationContent }
      </div>
    )
  }
}

UserProfileContainer.propTypes = {
  fetchUser: PropTypes.func.isRequired,
  is_signed_in: PropTypes.bool.isRequired,
  user_info: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  is_signed_in: state.user.is_signed_in,
  user_info: state.user.user_info
});

export default connect(mapStateToProps, { fetchUser })(UserProfileContainer);
