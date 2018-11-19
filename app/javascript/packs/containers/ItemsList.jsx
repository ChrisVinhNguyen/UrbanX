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
    //calls /items which which routes to items#index from routes.rb
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
    let items = this.state.items.map(item => {
      return (
        <Grid.Column>
          <Item key={item.id} item={item}/>
        </Grid.Column>
      );
    });
    return (
      <div className="body">
        <Grid columns={3} divided>
    <Grid.Row>
        {items[0]}
        {items[1]}
        {items[2]}
    </Grid.Row>

    <Grid.Row>
        {items[3]}
        {items[4]}
        {items[5]}
    </Grid.Row>

    <Grid.Row>
        {items[6]}

    </Grid.Row>
  </Grid>

      </div>
    );
  }
}

export default ItemsList;
