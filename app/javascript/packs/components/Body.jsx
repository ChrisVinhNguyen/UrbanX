import React, { Component } from 'react';
import ItemsList from '../containers/ItemsList'

class Body extends Component {
  render() {
    return (
      <div style={{marginLeft: '20px', marginTop: '100px'}} className="body">
        <ItemsList />
      </div>
    );
  }
}

export default Body;
