import React, { Component } from 'react';
import ItemsList from '../containers/ItemsList'

class Body extends Component {
  render() {
    return (
      <div className="body">
        <ItemsList />
      </div>
    );
  }
}

export default Body;
