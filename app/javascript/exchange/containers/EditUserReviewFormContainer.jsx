import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { Button, Form, Header, Rating, TextArea } from 'semantic-ui-react';
import axios from 'axios';
import { editUserReview } from '../actions/userActions';
import { connect } from 'react-redux';

import SignUpButton from '../components/SignUpButton';
import SignInButton from '../components/SignInButton';

class EditUserReviewFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: '',
      comment: '',
      review_id: ''
    };

    this.handleRate = this.handleRate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleRate(e, { rating }) {
    this.setState({ rating: rating })
    console.log(this.state.rating)
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value })
    console.log(this.state.comment)
  }

  handleSubmit(e) {
    console.log(this.state.rating)
    console.log(this.state.comment)
    console.log(this.state.review_id)
    let userReviewData = this.state;
    let reviewee_id = this.props.reviewee_id;


    console.log(this.state)
    console.log(userReviewData)
    this.props.editUserReview(userReviewData, reviewee_id)
  }

  render() {
    const {rating, comment} = this.state;
    this.state.review_id = this.props.review_id;

    const isSignedIn = this.props.is_signed_in;
    let editUserReviewContent; 

    console.log(this.props)
    if (isSignedIn) {
      editUserReviewContent = 
        <div>
          <Form className="edit-user-review-form" onSubmit={ this.handleSubmit }>
            <Form.Field>
              <label>Rating</label>
                  <Rating icon='star' Rating={rating} maxRating={5} onRate={ this.handleRate }/>
            </Form.Field>
            <Form.Field>
              <label>Comment</label>
              <Form.TextArea type = 'comment' placeholder='Edit your review..' name='comment' value={ comment } onChange={this.handleChange} />
            </Form.Field>
            <Form.Button content='Edit' labelPosition='left' icon='edit'/>
          </Form>
        </div>
    } else {
      editUserReviewContent = 
        <div>
          <Header as='h3' dividing>
            Please sign in/sign up
          </Header>
          <div>
            <span>
              <SignUpButton />
              or
              <SignInButton />
            </span>
          </div>
        </div>
    }

    return (
      <div>
        { editUserReviewContent }
      </div>
    )
  }
}

EditUserReviewFormContainer.propTypes = {
  editUserReview: PropTypes.func.isRequired,
  is_signed_in: PropTypes.bool.isRequired,
  user_info: PropTypes.object.isRequired,
  review_id: PropTypes.object.isRequired,
  reviewee_id: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  is_signed_in: state.user.is_signed_in,
  user_info: state.user.user_info,
});

export default connect(mapStateToProps, { editUserReview })(EditUserReviewFormContainer);
