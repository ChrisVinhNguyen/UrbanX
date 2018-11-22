import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Menu, Button, Comment, Form, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { filterItems } from '../actions/itemsActions';
import PropTypes from 'prop-types';

class ItemsReviewsContainer extends Component {
  componentDidMount(){
  	this.props.getItemReviews(this.props.current_viewed_item_id)
  }

  render() {

    const { current_viewed_item_reviews } = this.props.current_viewed_item_reviews;

    return (
    	<Comment.Group>
    		<Header as='h3' dividing>
      			Reviews
    		</Header>

    		<ItemReview current_viewed_item_reviews={this.props.current_viewed_item_reviews} /> 
    	</Comment.Group>
    	);
      
  }
}


ItemsReviewsContainer.propTypes = {
  getItemReviews: PropTypes.func.isRequired,
  current_viewed_item_reviews: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  current_viewed_item_reviews: state.items.current_viewed_item_reviews
});

export default connect(mapStateToProps, { getItemReviews })(ItemsReviewsContainer);
