import React, { Component } from 'react';
import axios from 'axios';

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
      console.log(response.data)
      this.setState({
        items: response.data
      })
    })
    .catch(function(error){
      console.log(error);
    })
  }

  render() {
    let items = this.state.items.map(item => {return <Item item={item}/>;});
    return (
      <div className="body">
        {items}
      </div>
    );
  }
}

export default ItemsList;
