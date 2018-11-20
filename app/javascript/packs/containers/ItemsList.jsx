import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Divider } from 'semantic-ui-react'

import ItemSummary from '../components/ItemSummary'

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
          <ItemSummary key={item.id} item={item}/>
        </Grid.Column>
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

export default ItemsList;
