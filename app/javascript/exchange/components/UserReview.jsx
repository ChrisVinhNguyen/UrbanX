import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import { Button, Comment, Form, Header, Rating, Popup } from 'semantic-ui-react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CreateUserReviewFormContainer from '../containers/CreateUserReviewFormContainer'
import EditUserReviewFormContainer from '../containers/EditUserReviewFormContainer'
import DeleteUserReviewFormContainer from '../containers/DeleteUserReviewFormContainer'

class UserReview extends Component {

  render() {
    console.log(this.props.user_reviews)

    const current_user_id = this.props.user_info.user_profile_id;

    let hasReviewed = false; 
    let current_users_review = false; 
    let matchedReview = false; 
    let isOwner = false; 

    let reviews = this.props.user_reviews.map(review => {
      if (review.reviewer_id == current_user_id){ hasReviewed = true }
      if (review.reviewee_id == current_user_id){ isOwner = true }
      return (
        <div>
            <Comment>
              <Comment.Avatar/>
              <Comment.Content>
                <Comment.Author>
                  <Link to={'/user_profiles/'+ review.reviewer_id}>
                    {review.reviewer}
                  </Link>
                </Comment.Author>
                <Comment.Metadata>
                  <div>
                    <Rating icon='star' rating={review.rating} maxRating={5} disabled />
                  </div>
                  <div>{review.updated_at}</div>
                </Comment.Metadata>
                <Comment.Text>{review.comment}</Comment.Text>
                {current_user_id}
                {current_user_id == review.reviewer_id?
                <Comment.Actions>
                  <Comment.Action>
                    <EditUserReviewFormContainer review_id = {review.id} reviewee_id = {review.reviewee_id}/>
                    <DeleteUserReviewFormContainer review_id = {review.id} reviewee_id = {review.reviewee_id}/>
                  </Comment.Action> 
                </Comment.Actions>
                : null
                }
              </Comment.Content>
            </Comment>
        </div>
      );
    });
    return (
      <div>
        { reviews }
        {!(hasReviewed || isOwner)? <CreateUserReviewFormContainer reviewee_id = {this.props.reviewee_id}/>
        :null
        }
      </div>
    );
  }
}

UserReview.propTypes = {
  user_info: PropTypes.object.isRequired,
  user_reviews: PropTypes.array.isRequired,
  reviewee_id: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
  user_info: state.user.user_info,
  user_reviews: state.user.user_reviews
});

export default connect(mapStateToProps, {})(UserReview);