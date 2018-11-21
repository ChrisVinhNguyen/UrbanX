import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/userActions';


class UserProfileContainer extends Component {
  componentWillMount() {
    this.props.fetchUser();
  }

  render() {
    console.log(this.props)
    return (
      <div className="profile-container">
        Test
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
