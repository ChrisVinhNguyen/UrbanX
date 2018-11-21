import React, { Component } from 'react';

import ProjectLogo from './ProjectLogo';

import SearchBarContainer from '../containers/SearchBarContainer';
import UserProfileContainer from '../containers/UserProfileContainer';

import '../stylesheets/header.scss';


class Header extends Component {
  render() {
    return (
      <div className="header">
        <ProjectLogo />
        <SearchBarContainer />
        <UserProfileContainer />
      </div>
    )
  }
}

export default Header;
