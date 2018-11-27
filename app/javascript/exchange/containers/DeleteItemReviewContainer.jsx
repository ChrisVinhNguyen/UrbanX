import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { Button, Form, Header, Rating, Popup } from 'semantic-ui-react';
import axios from 'axios';
import { deleteItemReview } from '../actions/itemsActions';
import { connect } from 'react-redux';
import { Comment, Icon } from 'semantic-ui-react'


import SignUpButton from '../components/SignUpButton';
import SignInButton from '../components/SignInButton';

class DeleteItemReviewContainer extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const current_viewed_item_id = this.props.item_id;
    const current_review_id = this.props.review_id;
    this.props.deleteItemReview(current_viewed_item_id, current_review_id);
  }

  render() {
    return (
      <Comment.Action onClick={this.handleClick}>
        Delete
      </Comment.Action>
    )
  }
}

DeleteItemReviewContainer.propTypes = {
  deleteItemReview: PropTypes.func.isRequired,
  is_signed_in: PropTypes.bool.isRequired,
  user_info: PropTypes.object.isRequired,
  review_id: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  is_signed_in: state.user.is_signed_in,
  user_info: state.user.user_info,
  item_id: state.items.item_id
});

 
export default connect(mapStateToProps, { deleteItemReview })(DeleteItemReviewContainer);
