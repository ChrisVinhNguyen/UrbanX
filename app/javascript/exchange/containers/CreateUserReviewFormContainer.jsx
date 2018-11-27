import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { Button, Form, Header, Rating, TextArea } from 'semantic-ui-react';
import axios from 'axios';
import { newUserReview } from '../actions/userActions';
import { connect } from 'react-redux';

import SignUpButton from '../components/SignUpButton';
import SignInButton from '../components/SignInButton';

class createUserReviewFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: '',
      comment: ''
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

    let userReviewData = this.state;
    let current_viewed_item_id = this.props.item_id;
    let reviewee_id = this.props.reviewee_id;

    console.log(this.state)
    console.log(userReviewData)
    console.log(reviewee_id)
    this.props.newUserReview(userReviewData, reviewee_id)
  }

  render() {
    const {rating, comment} = this.state;

    const isSignedIn = this.props.is_signed_in;
    let addUserReviewContent; 

    console.log(this.props)
    if (isSignedIn) {
      addUserReviewContent = 
        <div>
          <Header as='h3' dividing>
            Add a Review
          </Header>
            <Form className="add-user-review-form" onSubmit={ this.handleSubmit }>
              <Form.Field>
                <label>Rating</label>
                  <Form.Input name='rating' value={ rating }>
                    <Rating icon='star' Rating={0} maxRating={5} onRate={ this.handleRate }/>
                  </Form.Input>
              </Form.Field>
              <Form.Field>
                <label>Comment</label>
                <Form.Input type = 'comment' placeholder='What did you think about this user?' name='comment' value={ comment } onChange={this.handleChange} />
              </Form.Field>
              <Form.Button content='Submit' labelPosition='left' icon='edit'/>
            </Form>
        </div>
    } else {
      addUserReviewContent = 
        <div>
          <Header as='h3' dividing>
            Please sign in/sign up to add a user review
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
        { addUserReviewContent }
      </div>
    )
  }
}

createUserReviewFormContainer.propTypes = {
  newUserReview: PropTypes.func.isRequired,
  is_signed_in: PropTypes.bool.isRequired,
  user_info: PropTypes.object.isRequired,
  reviewee_id: PropTypes.number.isRequired

}

const mapStateToProps = state => ({
  is_signed_in: state.user.is_signed_in,
  user_info: state.user.user_info,
});

 
export default connect(mapStateToProps, { newUserReview })(createUserReviewFormContainer);
