import React, { Component } from 'react';

import ProjectLogo from './ProjectLogo';
import ItemCategoriesMenu from '../containers/ItemCategoriesMenu';
import SearchBarContainer from '../containers/SearchBarContainer';
import HeaderProfileContainer from '../containers/HeaderProfileContainer';
import FlashMessageContainer from '../containers/FlashMessageContainer';

import '../stylesheets/header.scss';


class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="flash-message-container">
          <FlashMessageContainer />
        </div>
        <div className="header-top">
          <ProjectLogo />
          <SearchBarContainer />
          <HeaderProfileContainer />
        </div>
        <div className="header-bottom">
          <ItemCategoriesMenu />
        </div>
        
      </div>
    )
  }
}

export default Header;
