import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import { Button, Comment, Form, Header, Rating, Popup } from 'semantic-ui-react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CreateItemReviewFormContainer from '../containers/CreateItemReviewFormContainer'
import EditItemReviewFormContainer from '../containers/EditItemReviewFormContainer'
import DeleteItemReviewContainer from '../containers/DeleteItemReviewContainer'

class ItemReview extends Component {

  render() {
    console.log(this.props.current_viewed_item_reviews)

    const current_user_id = this.props.user_info.user_profile_id;
    let hasReviewed = false; 
    let reviews = this.props.current_viewed_item_reviews.map(review => {
      if (review.owner_id == current_user_id){ hasReviewed = true }
      return (
        <Comment>
          <Comment.Avatar/>
          <Comment.Content>
            <Comment.Author>
              <Link to={'/user_profiles/'+ review.owner_id}>
                {review.owner}
              </Link>
            </Comment.Author>
            <Comment.Metadata>
              <div>
                <Rating icon='star' defaultRating={review.rating} maxRating={5} disabled />
              </div>
              <div>{review.updated_at}</div>
            </Comment.Metadata>
            <Comment.Text>{review.comment}</Comment.Text>
            {current_user_id == review.owner_id?
            <Comment.Actions>
              <Comment.Action>
                  <EditItemReviewFormContainer review_id = {review.id}/>
                  <DeleteItemReviewContainer review_id = {review.id}/>
              </Comment.Action> 
            </Comment.Actions>
            : null
            }
          </Comment.Content>
        </Comment>
      );
    });
    return (
      <div>
        { reviews }
        {!hasReviewed? <CreateItemReviewFormContainer/>
        :null
        }
      </div>
    );
  }
}

ItemReview.propTypes = {
  user_info: PropTypes.object.isRequired,
  current_viewed_item_reviews: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  user_info: state.user.user_info,
  current_viewed_item_reviews: state.items.current_viewed_item_reviews
});

export default connect(mapStateToProps, {})(ItemReview);