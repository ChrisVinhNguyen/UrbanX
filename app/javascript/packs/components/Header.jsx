import React, { Component } from 'react';

import ProjectLogo from './ProjectLogo';

import SearchBar from '../containers/SearchBar';


class Header extends Component {
  render() {
    return (
      <div>
        <ProjectLogo />
        <SearchBar />
      </div>
    )
  }
}

export default Header;
