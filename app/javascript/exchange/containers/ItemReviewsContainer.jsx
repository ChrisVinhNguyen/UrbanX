import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Menu, Button, Comment, Form, Header, Rating, TextArea } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getItemReviews } from '../actions/itemsActions';
import { fetchUser } from '../actions/userActions';

import PropTypes from 'prop-types';
import ItemReview from '../components/ItemReview'
import CreateItemReviewFormContainer from '../containers/CreateItemReviewFormContainer'


class ItemsReviewsContainer extends Component {
  	componentDidMount(){
  		console.log("---------")
  		console.log(this.props)
  		this.props.getItemReviews(this.props.current_viewed_item_id)
  	}
  	componentWillMount(){
  		console.log("$$$$")
  		console.log(this.props)
  		this.props.getItemReviews(this.props.current_viewed_item_id)
  	}
  	render() {
    	console.log('mmmmm', this.props)
    	console.log(this.props.current_viewed_item_reviews)

    	const { current_viewed_item_reviews } = this.props.current_viewed_item_reviews;

    	return (
    		<Comment.Group>
          <div>
            <Header as='h3' dividing>
      				Reviews
            </Header>
            <ItemReview/> 
          </div>
    		</Comment.Group>
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
