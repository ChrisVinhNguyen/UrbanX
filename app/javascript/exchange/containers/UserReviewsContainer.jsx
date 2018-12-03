import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Menu, Button, Comment, Form, Header, Rating, TextArea } from 'semantic-ui-react';

import { getUserReviews } from '../actions/userActions';

import UserReview from '../components/UserReview'
import NoUserReviewsResults from '../components/NoUserReviewsResults';


class UserReviewsContainer extends Component {
    constructor(props){
      super(props);
      this.props.getUserReviews(this.props.reviewee_id)
    }

    render() {
      console.log('mmmmm', this.props)
      console.log(this.props.user_reviews)

      const reviewee_id = this.props.reviewee_id;

      return (
        <Comment.Group>
          <div>
            <Header as='h3'>
              Reviews
            </Header>
            <UserReview reviewee_id={this.props.reviewee_id}/>
            { this.props.user_reviews.length == 0 ? <NoUserReviewsResults /> : null }
          </div>
        </Comment.Group>
    );
  }
}

UserReviewsContainer.propTypes = {
  getUserReviews: PropTypes.func.isRequired,
  user_reviews: PropTypes.array.isRequired,
  reviewee_id: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
  user_reviews: state.user.user_reviews
});

export default connect(mapStateToProps, { getUserReviews })(UserReviewsContainer);
