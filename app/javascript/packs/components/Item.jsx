import React, { Component } from 'react';

class Item extends Component {
  render() {
    return (
      <div className="item">
        <h1>
          <a href={'items/'+this.props.item.id}>
            <strong>{this.props.item.name}</strong>
          </a>
        </h1>
        <a href={'user_profiles/'+ this.props.item.user_id}>
          {this.props.item.owner}
        </a>
        <p>Quantity: {this.props.item.quantity}</p>
        <p>Rating: {this.props.item.average_rating}</p>
      </div>
    );
  }
}

export default Item;
