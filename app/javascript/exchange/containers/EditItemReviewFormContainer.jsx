import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { Button, Form, Header, Rating, TextArea } from 'semantic-ui-react';
import axios from 'axios';
import { editItemReview } from '../actions/itemsActions';
import { connect } from 'react-redux';

import SignUpButton from '../components/SignUpButton';
import SignInButton from '../components/SignInButton';

class editItemReviewFormContainer extends Component {
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
    let itemReviewData = this.state;
    let current_viewed_item_id = this.props.item_id;


    console.log(this.state)
    console.log(itemReviewData)
    this.props.editItemReview(itemReviewData, current_viewed_item_id)
  }

  render() {
    const {rating, comment} = this.state;
    const current_user_id = this.props.user_info.user_profile_id;
    this.state.review_id = this.props.review_id;

    const isSignedIn = this.props.is_signed_in;
    let addItemReviewContent; 

    console.log(this.props)
    if (isSignedIn) {
      addItemReviewContent = 
        <div>
          <Header as='h5' dividing>
            Edit Review
          </Header>
            <Form className="add-item-review-form" onSubmit={ this.handleSubmit }>
              <Form.Field>
                <label>Rating</label>
                    <Rating icon='star' defaultRating={0} maxRating={5} onRate={ this.handleRate }/>
              </Form.Field>
              <Form.Field>
                <label>Comment</label>
                <Form.Input type = 'comment' placeholder='Edit your review..' name='comment' value={ comment } onChange={this.handleChange} />
              </Form.Field>
              <Form.Button content='Edit' labelPosition='left' icon='edit'/>
            </Form>
        </div>
    } else {
      addItemReviewContent = 
        <div>
          <Header as='h3' dividing>
            Please sign in/sign up to add an item review
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
        { addItemReviewContent }
      </div>
    )
  }
}

editItemReviewFormContainer.propTypes = {
  editItemReview: PropTypes.func.isRequired,
  is_signed_in: PropTypes.bool.isRequired,
  user_info: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  is_signed_in: state.user.is_signed_in,
  user_info: state.user.user_info,
  item_id: state.items.item_id
});

 
export default connect(mapStateToProps, { editItemReview })(editItemReviewFormContainer);
