import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUser, signOutUser } from '../actions/userActions';
import { displayFlash } from '../actions/flashActions';
import { Dropdown, Image } from 'semantic-ui-react';
import { Link } from "react-router-dom";


import SignUpButton from '../components/SignUpButton';
import SignInButton from '../components/SignInButton';


class HeaderProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.onHandleLogoutClick = this.onHandleLogoutClick.bind(this);
  }

  componentWillMount() {
    this.props.fetchUser();
  }

  onHandleLogoutClick() {
    this.props.signOutUser();
    this.displayMessage('Signed out successfully', 'positive');
  }

  displayMessage(flash_message, pos_or_neg) {
    this.props.displayFlash(flash_message, true, pos_or_neg);
  }

  render() {
    const isSignedIn = this.props.is_signed_in;
    let userAuthenticationContent;


    if(isSignedIn) {
      const trigger = <span>{this.props.user_info.full_name} <Image src={this.props.user_info.image ? this.props.user_info.image : "https://react.semantic-ui.com/images/wireframe/image.png" } avatar /></span>;
      userAuthenticationContent =
        <div>
          <Dropdown icon={null} trigger={trigger} direction='left' floating labeled button pointing>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to='/items/add/new' icon="add" text="Add New Item" />
              <Dropdown.Item as={Link} to={`/user_profiles_show/${this.props.user_info.user_profile_id}`} icon="user" text="View Profile" />
              <Dropdown.Item as={Link} to='/' icon="log out" text="Logout" onClick={ this.onHandleLogoutClick } />
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

export default connect(mapStateToProps, { fetchUser, signOutUser, displayFlash })(HeaderProfileContainer);
