import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import { Button, Comment, Form, Header, Rating, Popup, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CreateUserReviewFormContainer from '../containers/CreateUserReviewFormContainer'
import EditUserReviewFormContainer from '../containers/EditUserReviewFormContainer'
import DeleteUserReviewFormContainer from '../containers/DeleteUserReviewFormContainer'


class UserReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEdit: false
    };

    this.handClick = this.handClick.bind(this);
  }

  handClick() { 
    (this.state.showEdit? this.setState({showEdit: false}) : this.setState({showEdit: true}))
  }
  render() {
    const current_user_profile_id = this.props.user_info.user_profile_id;
    const current_user_id = this.props.user_info.user_id;
    
    let hasReviewed = false; 
    let current_users_review = false; 
    let matchedReview = false; 
    let isOwner = false; 
    let showEdit = this.state.showEdit;

    let reviews = this.props.user_reviews.map(review => {
      if (review.reviewer_id == current_user_profile_id){ hasReviewed = true }
      return (
        <div>
            <Comment>
              <Comment.Avatar/>
              <Comment.Content>
                <Comment.Author>
                  <Link to={'/user_profiles_show/'+ review.reviewer_id}>
                    {review.reviewer}
                  </Link>
                </Comment.Author>
                <Comment.Metadata>
                  <div>
                    <Rating icon='star' rating={review.rating} maxRating={5} disabled />
                  </div>
                  <div>{String(review.updated_at).split('T')[0]}</div>
                </Comment.Metadata>
                <Comment.Text>{review.comment}</Comment.Text>
                {current_user_profile_id == review.reviewer_id?
                <Comment.Actions>
                  <DeleteUserReviewFormContainer review_id = {review.id} reviewee_id = {review.reviewee_id}/>
                  <Comment.Action onClick={this.handClick}>
                    Edit
                  </Comment.Action>
                  {showEdit?  
                      <EditUserReviewFormContainer review_id = {review.id} reviewee_id = {review.reviewee_id}/>
                  :null
                  }
                </Comment.Actions>
                : null
                }
              </Comment.Content>
            </Comment>
        </div>
      );
    });

    if(this.props.reviewee_id == current_user_profile_id){isOwner = true}
    return (
      <div>
        { reviews }
        { (hasReviewed || isOwner)? null
        :<CreateUserReviewFormContainer reviewee_id = {this.props.reviewee_id}/>
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
