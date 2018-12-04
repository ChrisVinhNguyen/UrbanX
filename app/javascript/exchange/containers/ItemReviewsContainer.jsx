import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Menu, Button, Comment, Form, Header, Rating, TextArea, Segment, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getItemReviews } from '../actions/itemsActions';
import { fetchUser } from '../actions/userActions';

import PropTypes from 'prop-types';
import ItemReview from '../components/ItemReview'
import NoItemReviewsResults from '../components/NoItemReviewsResults';
import CreateItemReviewFormContainer from '../containers/CreateItemReviewFormContainer';

import '../stylesheets/item-reviews-container.scss';


class ItemsReviewsContainer extends Component {
  componentDidMount(){
    this.props.getItemReviews(this.props.current_viewed_item_id)
  }
  componentWillMount(){
    this.props.getItemReviews(this.props.current_viewed_item_id)
  }
  render() {
    return (
      <div className="item-reviews-container">
        <Divider />
        <Comment.Group>
          <div>
            <Header as='h3' className="item-reviews-title">
              Reviews
            </Header>
            <ItemReview item_owner_profile_id = {this.props.item_owner_profile_id} item_owner_user_id={this.props.item_owner_user_id}/> 
          </div>
        </Comment.Group>
        { this.props.current_viewed_item_reviews.length == 0 ? <NoItemReviewsResults /> : null }
      </div>
    );
  }
}

ItemsReviewsContainer.propTypes = {
  getItemReviews: PropTypes.func.isRequired,
  current_viewed_item_reviews: PropTypes.array.isRequired,
  current_viewed_item_id: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
  item_id: state.items.item_id,
  current_viewed_item_reviews: state.items.current_viewed_item_reviews
});

export default connect(mapStateToProps, { getItemReviews })(ItemsReviewsContainer);
