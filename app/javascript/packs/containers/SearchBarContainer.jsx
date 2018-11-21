import React, { Component } from 'react';


class SearchBarContainer extends Component {
  render() {
    return (
      <div className="ui category search">
        <div className="ui icon input">
          <input className="prompt" type="text" placeholder="Search items..." />
          <i className="search icon"></i>
        </div>
        <div className="results"></div>
      </div>
    )
  }
}

export default SearchBarContainer;
