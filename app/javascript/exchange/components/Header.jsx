import React, { Component } from 'react';

import ProjectLogo from './ProjectLogo';
import ItemCategoriesMenu from '../containers/ItemCategoriesMenu'
import SearchBarContainer from '../containers/SearchBarContainer';
import HeaderProfileContainer from '../containers/HeaderProfileContainer';

import '../stylesheets/header.scss';


class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="header-top">
          <ProjectLogo />
          <SearchBarContainer />
          <HeaderProfileContainer />
        </div>
        <div>
          <ItemCategoriesMenu />
        </div>
      </div>
    )
  }
}

export default Header;
