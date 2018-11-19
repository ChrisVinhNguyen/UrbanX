import React, { Component } from 'react';
import axios from 'axios';
import { Grid } from 'semantic-ui-react'

import Item from '../components/Item'

class ItemsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
  }

  componentDidMount() {
    axios.get('/items')
    .then((response) => {
      this.setState({
        items: response.data
      })
    })
    .catch(function(error){
      console.log(error);
    })
  }

  render() {
    let items = this.state.items.map(item => {return <Item key={item.id} item={item}/>;});
    return (
      <div className="body">
        <Grid columns={3} divided>
    <Grid.Row>
      <Grid.Column>
        {items[0]}
      </Grid.Column>
      <Grid.Column>
        {items[1]}
      </Grid.Column>
      <Grid.Column>
        {items[2]}
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column>
        {items[3]}
      </Grid.Column>
      <Grid.Column>
        {items[4]}
      </Grid.Column>
      <Grid.Column>
        {items[5]}
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column>
        {items[6]}
      </Grid.Column>

    </Grid.Row>
  </Grid>

      </div>
    );
  }
}

export default ItemsList;
