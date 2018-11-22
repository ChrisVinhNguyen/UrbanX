import React, { Component } from 'react';
import axios from 'axios';
import { Button, Comment, Form, Header, Rating } from 'semantic-ui-react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ItemReview extends Component {

  render() {
    let reviews = this.props.current_viewed_item_reviews.map(review => {
      return (
        <Comment>
          <Comment.Avatar/>
          <Comment.Content>
            <Comment.Author>
              <Link to={'/user_profiles/:'+ {review.owner_id}}>
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
          </Comment.Content>
        </Comment>
      );
    });
    return (
      <div className="body">
        <Grid columns={3} divided>
          <Grid.Row>
            {items}
          </Grid.Row>

  </Grid>

      </div>
    );
  }
}

ItemsReviewsContainer.propTypes = {
  current_viewed_item_reviews: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  current_viewed_item_reviews: state.items.current_viewed_item_reviews
});

export default connect(mapStateToProps, {})(ItemReview);