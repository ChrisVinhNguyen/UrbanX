import React from 'react';
import { Grid, Message } from 'semantic-ui-react';

const NoItemReviewsResults = () => (
  <Grid centered columns={4}>
    <Grid.Column>
      <Message negative compact>
        <Message.Header>Currently does not have any item reviews</Message.Header>
      </Message>
    </Grid.Column>
  </Grid>
)

export default NoItemReviewsResults;
