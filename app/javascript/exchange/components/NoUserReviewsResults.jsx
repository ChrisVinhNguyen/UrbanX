import React from 'react';
import { Grid, Message } from 'semantic-ui-react';

const NoUserReviewsResults = () => (
  <Grid centered columns={4}>
    <Grid.Column>
      <Message negative compact>
        <Message.Header>We're sorry, you don't have any reviews</Message.Header>
        <p>Try to lend out or borrow items so a user can give you a review!</p>
      </Message>
    </Grid.Column>
  </Grid>
)

export default NoUserReviewsResults;
