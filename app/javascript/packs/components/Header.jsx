import React, { Component } from 'react';

import ProjectLogo from './ProjectLogo';

import SearchBarContainer from '../containers/SearchBarContainer';
import HeaderProfileContainer from '../containers/HeaderProfileContainer';

import '../stylesheets/header.scss';


class Header extends Component {
  render() {
    return (
      <div className="header">
        <ProjectLogo />
        <SearchBarContainer />
        <HeaderProfileContainer />
      </div>
    )
  }
}

export default Header;
