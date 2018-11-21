import React, { Component } from 'react';

import ProjectLogo from './ProjectLogo';

import SearchBarContainer from '../containers/SearchBarContainer';
import UserProfileContainer from '../containers/UserProfileContainer';


class Header extends Component {
  render() {
    return (
      <div>
        <ProjectLogo />
        <SearchBarContainer />
        <UserProfileContainer />
      </div>
    )
  }
}

export default Header;
