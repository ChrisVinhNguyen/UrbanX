import React, { Component } from 'react';

class Item extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div className="body">
        <p><strong>Item name:</strong>{this.props.item.name}</p>
        <h2>Description: {this.props.item.description}</h2>
        <h2>Category: {this.props.item.category}</h2> 
        <h2>Status: {this.props.item.status}</h2>
      </div>
    );
  }
}

export default Item;
