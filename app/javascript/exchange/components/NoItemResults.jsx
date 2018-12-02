import React from 'react';
import { Grid, Message } from 'semantic-ui-react';

const NoItemResults = () => (
  <Grid centered columns={4}>
    <Grid.Column>
      <Message negative compact>
        <Message.Header>We're sorry, there are no items to show</Message.Header>
        <p>Try to look for another item!</p>
      </Message>
    </Grid.Column>
  </Grid>
)

export default NoItemResults;
