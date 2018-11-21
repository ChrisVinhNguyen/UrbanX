import React, { Component } from 'react';

import ProjectLogo from './ProjectLogo';

import SearchBarContainer from '../containers/SearchBarContainer';


class Header extends Component {
  render() {
    return (
      <div>
        <ProjectLogo />
        <SearchBarContainer />
      </div>
    )
  }
}

export default Header;
