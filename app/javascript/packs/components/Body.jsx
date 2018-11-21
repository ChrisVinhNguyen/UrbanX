import React, { Component } from 'react';
import ItemsListContainer from '../containers/ItemsListContainer'

class Body extends Component {
  render() {
    return (
      <div style={{marginLeft: '20px', marginTop: '100px'}} className="body">
        <ItemsListContainer />
      </div>
    );
  }
}

export default Body;
