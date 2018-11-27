import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Menu, Button, Comment, Form, Header, Rating, TextArea } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getUserReviews, fetchUser } from '../actions/userActions';

import PropTypes from 'prop-types';
import UserReview from '../components/UserReview'


class UserReviewsContainer extends Component {
  	constructor(props){
      super(props);
  		console.log("---------")
  		console.log(this.props)
  		this.props.getUserReviews(this.props.reviewee_id)
  	}
  	/**componentWillMount(){
  		console.log("$$$$")
  		console.log(this.props)
  		this.props.getUserReviews()
  	}**/
  	render() {
    	console.log('mmmmm', this.props)
    	console.log(this.props.user_reviews)

      const reviewee_id = this.props.reviewee_id;

    	return (
    		<Comment.Group>
          <div>
            <Header as='h3' dividing>
      				Reviews
            </Header>
            <UserReview reviewee_id={this.props.reviewee_id}/> 
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
	getUserReviews: state.user.getUserReviews
});

export default connect(mapStateToProps, { getUserReviews })(UserReviewsContainer);
