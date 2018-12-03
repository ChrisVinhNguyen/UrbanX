import React from 'react';
import { Grid, Message } from 'semantic-ui-react';

const NoTransactionResults = () => (
  <Grid centered columns={4}>
    <Grid.Column>
      <Message negative compact>
        <Message.Header>We're sorry, you don't have any transactions</Message.Header>
        <p>Try to borrow an item!</p>
      </Message>
    </Grid.Column>
  </Grid>
)

export default NoTransactionResults;
