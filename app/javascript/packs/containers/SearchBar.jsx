import React, { Component } from 'react';


class SearchBar extends Component {
  render() {
    return (
      <div className="ui category search">
        <div className="ui icon input">
          <input className="prompt" type="text" placeholder="Search animals..." />
          <i className="search icon"></i>
        </div>
        <div className="results"></div>
      </div>
    )
  }
}

export default SearchBar;
