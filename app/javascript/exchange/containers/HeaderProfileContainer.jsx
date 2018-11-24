import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUser, signOutUser } from '../actions/userActions';

import Logo from '../images/doge-logo-transparent-background.png';

import SignUpButton from '../components/SignUpButton';
import SignInButton from '../components/SignInButton';

import { Dropdown, Image } from 'semantic-ui-react';
import { Link } from "react-router-dom";


class HeaderProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.onHandleLogoutClick = this.onHandleLogoutClick.bind(this);
  }

  componentWillMount() {
    this.props.fetchUser();
  }

  onHandleLogoutClick(e) {
    this.props.signOutUser();
  }

  render() {
    console.log(this.props)

    const isSignedIn = this.props.is_signed_in;
    let userAuthenticationContent;

    if(isSignedIn) {
      const trigger = <span>{this.props.user_info.full_name} <Image src={ Logo } avatar /></span>;
      userAuthenticationContent =
        <div>
          <Dropdown icon={null} trigger={trigger} direction='left' floating labeled button pointing>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Link to={`/items/new`}>
                  Add New Item
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to={`/user_profiles/${this.props.user_info.user_profile_id}`}>
                  View Profile
                </Link>
              </Dropdown.Item>
              <Dropdown.Item onClick={ this.onHandleLogoutClick }>
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>;
    } else {
      userAuthenticationContent =
        <div>
          <span>
            <SignUpButton />
            or
            <SignInButton />
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

HeaderProfileContainer.propTypes = {
  fetchUser: PropTypes.func.isRequired,
  signOutUser: PropTypes.func.isRequired,
  is_signed_in: PropTypes.bool.isRequired,
  user_info: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  is_signed_in: state.user.is_signed_in,
  user_info: state.user.user_info
});

export default connect(mapStateToProps, { fetchUser, signOutUser })(HeaderProfileContainer);
