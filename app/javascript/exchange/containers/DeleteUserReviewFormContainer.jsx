import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { Button, Form, Header, Rating, Popup } from 'semantic-ui-react';
import axios from 'axios';
import { deleteUserReview } from '../actions/userActions';
import { connect } from 'react-redux';

import { Comment, Icon } from 'semantic-ui-react'

import SignUpButton from '../components/SignUpButton';
import SignInButton from '../components/SignInButton';

class DeleteUserReviewContainer extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const reviewee_id = this.props.reviewee_id;
    const review_id = this.props.review_id;

    this.props.deleteUserReview(reviewee_id, review_id);
  }

  render() {
    return (
      <Comment.Action onClick={this.handleClick}>
        Delete
      </Comment.Action>
    )
  }
}

DeleteUserReviewContainer.propTypes = {
  deleteUserReview: PropTypes.func.isRequired,
  is_signed_in: PropTypes.bool.isRequired,
  user_info: PropTypes.object.isRequired,
  review_id: PropTypes.object.isRequired,
  reviewee_id: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  is_signed_in: state.user.is_signed_in,
  user_info: state.user.user_info,
});

 
export default connect(mapStateToProps, { deleteUserReview })(DeleteUserReviewContainer);
